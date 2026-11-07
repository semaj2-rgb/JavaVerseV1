require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === "production";
const SESSION_COOKIE = "javaverse_session";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
const DB_PATH = process.env.DB_PATH || "./data/javaverse.sqlite";
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const NO_EXPIRY = 4102444800000; // admin accounts: year 2100

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  console.error("ERROR: Set SESSION_SECRET in .env to a random secret of at least 32 characters.");
  process.exit(1);
}
if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12 ||
    process.env.ADMIN_PASSWORD === "change-this-admin-password-now") {
  console.error("ERROR: Set ADMIN_PASSWORD in .env to a unique password of at least 12 characters.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(path.resolve(DB_PATH)), { recursive: true });
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user','admin')),
  access_expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS access_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER,
  redeemed_by INTEGER REFERENCES users(id),
  redeemed_at INTEGER,
  created_by INTEGER NOT NULL REFERENCES users(id),
  note TEXT
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS admin_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL,
  user_id INTEGER,
  action TEXT NOT NULL,
  detail TEXT,
  created_at INTEGER NOT NULL
);
`);
// Lightweight migration: columns added in the combined version (safe on databases from JavaVerse Online).
const userCols = db.prepare("PRAGMA table_info(users)").all().map(c => c.name);
if (!userCols.includes("banned")) db.exec("ALTER TABLE users ADD COLUMN banned INTEGER NOT NULL DEFAULT 0");
if (!userCols.includes("ban_reason")) db.exec("ALTER TABLE users ADD COLUMN ban_reason TEXT");
if (!userCols.includes("banned_at")) db.exec("ALTER TABLE users ADD COLUMN banned_at INTEGER");
if (!userCols.includes("last_login_at")) db.exec("ALTER TABLE users ADD COLUMN last_login_at INTEGER");

const now = () => Date.now();
const sha256 = s => crypto.createHash("sha256").update(s).digest("hex");
const makeToken = () => crypto.randomBytes(32).toString("hex");
const normalizeEmail = s => String(s || "").trim().toLowerCase();
const normalizeUsername = s => String(s || "").trim();

// Profile information returned to the signed-in user (never includes the password hash).
function safeUser(u) {
  const key = db.prepare("SELECT duration_days FROM access_keys WHERE redeemed_by=?").get(u.id);
  return {
    id: u.id, username: u.username, email: u.email, role: u.role,
    accessExpiresAt: u.access_expires_at, createdAt: u.created_at,
    lastLoginAt: u.last_login_at || null, banned: !!u.banned,
    plan: key ? key.duration_days : null
  };
}

const adminUsername = String(process.env.ADMIN_USERNAME || "admin").trim();
const adminHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12);
const existingAdmin = db.prepare("SELECT id FROM users WHERE role='admin' LIMIT 1").get();
if (existingAdmin) {
  db.prepare("UPDATE users SET username=?, email=?, password_hash=?, banned=0, ban_reason=NULL WHERE id=?")
    .run(adminUsername, "admin@javaverse.local", adminHash, existingAdmin.id);
} else {
  db.prepare("INSERT INTO users (username,email,password_hash,role,access_expires_at,created_at) VALUES (?,?,?,?,?,?)")
    .run(adminUsername, "admin@javaverse.local", adminHash, "admin", NO_EXPIRY, now());
}

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-7", legacyHeaders: false, message: { error: "Too many attempts. Please wait and try again." } });

function createSession(userId, res) {
  const raw = makeToken();
  db.prepare("INSERT INTO sessions (token_hash,user_id,expires_at,created_at) VALUES (?,?,?,?)")
    .run(sha256(raw), userId, now() + SESSION_MS, now());
  res.cookie(SESSION_COOKIE, raw, { httpOnly: true, secure: IS_PROD, sameSite: "lax", maxAge: SESSION_MS, path: "/" });
}
function clearSession(req, res) {
  const raw = req.cookies[SESSION_COOKIE];
  if (raw) db.prepare("DELETE FROM sessions WHERE token_hash=?").run(sha256(raw));
  res.clearCookie(SESSION_COOKIE, { httpOnly: true, secure: IS_PROD, sameSite: "lax", path: "/" });
}
function bannedMessage(u) {
  return "This account has been banned." + (u.ban_reason ? " Reason: " + u.ban_reason : "") + " Contact the administrator if you think this is a mistake.";
}
function requireAuth(req, res, next) {
  const raw = req.cookies[SESSION_COOKIE];
  if (!raw) return res.status(401).json({ error: "Please sign in." });
  const session = db.prepare("SELECT s.expires_at AS session_expires_at, u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=?").get(sha256(raw));
  if (!session || session.session_expires_at < now()) {
    clearSession(req, res);
    return res.status(401).json({ error: "Session expired. Please sign in again." });
  }
  if (session.role !== "admin" && session.banned) {
    clearSession(req, res);
    return res.status(403).json({ error: bannedMessage(session), code: "BANNED" });
  }
  if (session.role !== "admin" && session.access_expires_at <= now()) {
    clearSession(req, res);
    return res.status(403).json({ error: "Your access has expired. Contact the administrator for a new key.", code: "EXPIRED" });
  }
  req.user = session;
  next();
}
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") return res.status(403).json({ error: "Administrator access required." });
  next();
}
const validPassword = p => typeof p === "string" && p.length >= 10 && p.length <= 128;
const keyDisplay = raw => raw.match(/.{1,4}/g).join("-");
const logAdmin = (adminId, userId, action, detail) =>
  db.prepare("INSERT INTO admin_log (admin_id,user_id,action,detail,created_at) VALUES (?,?,?,?,?)").run(adminId, userId ?? null, action, detail ?? null, now());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/me", requireAuth, (req, res) => res.json({ user: safeUser(req.user) }));

// Learning content is only served to signed-in users with active, non-banned access.
// Expired or banned accounts cannot read it, even if they know the file names.
const CONTENT_FILES = { "learn-data.js": "learn-data.js", "java-reference.js": "java-reference.js" };
app.get("/api/content/:file", requireAuth, (req, res) => {
  const name = CONTENT_FILES[req.params.file];
  if (!name) return res.status(404).json({ error: "Not found." });
  res.set("Cache-Control", "no-store");
  res.type("application/javascript").sendFile(path.join(__dirname, "protected", name));
});

app.post("/api/signup", authLimiter, (req, res) => {
  const username = normalizeUsername(req.body.username);
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;
  const accessKey = String(req.body.accessKey || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (username.length < 3 || username.length > 24 || !/^[a-zA-Z0-9_.-]+$/.test(username))
    return res.status(400).json({ error: "Username must be 3–24 characters and use letters, numbers, dots, dashes, or underscores." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return res.status(400).json({ error: "Enter a valid email address." });
  if (!validPassword(password)) return res.status(400).json({ error: "Password must be 10–128 characters." });
  if (!accessKey) return res.status(400).json({ error: "An access key is required to create an account." });

  const key = db.prepare("SELECT * FROM access_keys WHERE key_hash=?").get(sha256(accessKey));
  if (!key) return res.status(400).json({ error: "That access key is invalid or has already been used." });
  if (key.redeemed_at) return res.status(400).json({ error: "That access key has already been used." });
  if (key.expires_at && key.expires_at <= now()) return res.status(400).json({ error: "That access key has expired." });
  if (db.prepare("SELECT id FROM users WHERE lower(username)=lower(?) OR email=?").get(username, email))
    return res.status(409).json({ error: "That username or email is already registered." });

  const createdAt = now();
  const expiresAt = createdAt + key.duration_days * DAY;
  const insertUser = db.prepare("INSERT INTO users (username,email,password_hash,role,access_expires_at,created_at,last_login_at) VALUES (?,?,?,?,?,?,?)");
  const redeemKey = db.prepare("UPDATE access_keys SET redeemed_by=?, redeemed_at=? WHERE id=? AND redeemed_at IS NULL");
  const transaction = db.transaction(() => {
    const result = insertUser.run(username, email, bcrypt.hashSync(password, 12), "user", expiresAt, createdAt, createdAt);
    const changed = redeemKey.run(Number(result.lastInsertRowid), createdAt, key.id);
    if (changed.changes !== 1) throw new Error("KEY_ALREADY_REDEEMED");
    return Number(result.lastInsertRowid);
  });
  try {
    const userId = transaction();
    createSession(userId, res);
    return res.status(201).json({ user: safeUser(db.prepare("SELECT * FROM users WHERE id=?").get(userId)) });
  } catch (e) {
    if (e.message === "KEY_ALREADY_REDEEMED") return res.status(409).json({ error: "That access key has already been used." });
    if (String(e.message).includes("UNIQUE")) return res.status(409).json({ error: "That username or email is already registered." });
    console.error(e);
    return res.status(500).json({ error: "Could not create account." });
  }
});

app.post("/api/signin", authLimiter, (req, res) => {
  const identifier = String(req.body.identifier || "").trim();
  const password = req.body.password;
  const user = db.prepare("SELECT * FROM users WHERE lower(username)=lower(?) OR lower(email)=lower(?)").get(identifier, identifier);
  if (!user || typeof password !== "string" || !bcrypt.compareSync(password, user.password_hash))
    return res.status(401).json({ error: "Invalid username/email or password." });
  if (user.role !== "admin" && user.banned) return res.status(403).json({ error: bannedMessage(user), code: "BANNED" });
  if (user.role !== "admin" && user.access_expires_at <= now())
    return res.status(403).json({ error: "Your access has expired. Ask the administrator for a new access key.", code: "EXPIRED" });
  db.prepare("UPDATE users SET last_login_at=? WHERE id=?").run(now(), user.id);
  createSession(user.id, res);
  res.json({ user: safeUser(db.prepare("SELECT * FROM users WHERE id=?").get(user.id)) });
});
app.post("/api/signout", (req, res) => { clearSession(req, res); res.json({ ok: true }); });

// Profile: change own password (other sessions are signed out).
app.post("/api/profile/password", requireAuth, authLimiter, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (typeof currentPassword !== "string" || !bcrypt.compareSync(currentPassword, req.user.password_hash))
    return res.status(400).json({ error: "Your current password is incorrect." });
  if (!validPassword(newPassword)) return res.status(400).json({ error: "New password must be 10–128 characters." });
  if (req.user.role === "admin") return res.status(400).json({ error: "The admin password is set in the server .env file (ADMIN_PASSWORD)." });
  const raw = req.cookies[SESSION_COOKIE];
  db.prepare("UPDATE users SET password_hash=? WHERE id=?").run(bcrypt.hashSync(newPassword, 12), req.user.id);
  db.prepare("DELETE FROM sessions WHERE user_id=? AND token_hash<>?").run(req.user.id, sha256(raw));
  res.json({ ok: true });
});

/* ------------------------------ ADMIN ------------------------------ */
app.get("/api/admin/stats", requireAuth, requireAdmin, (req, res) => {
  const t = now();
  const one = (sql, ...a) => db.prepare(sql).get(...a).n;
  res.json({
    totalUsers: one("SELECT COUNT(*) n FROM users WHERE role='user'"),
    activeUsers: one("SELECT COUNT(*) n FROM users WHERE role='user' AND banned=0 AND access_expires_at>?", t),
    expiredUsers: one("SELECT COUNT(*) n FROM users WHERE role='user' AND banned=0 AND access_expires_at<=?", t),
    bannedUsers: one("SELECT COUNT(*) n FROM users WHERE role='user' AND banned=1"),
    unusedKeys: one("SELECT COUNT(*) n FROM access_keys WHERE redeemed_at IS NULL"),
    usedKeys: one("SELECT COUNT(*) n FROM access_keys WHERE redeemed_at IS NOT NULL"),
    expiringSoon: one("SELECT COUNT(*) n FROM users WHERE role='user' AND banned=0 AND access_expires_at>? AND access_expires_at<=?", t, t + 3 * DAY)
  });
});

app.get("/api/admin/keys", requireAuth, requireAdmin, (req, res) => {
  const rows = db.prepare(`
    SELECT k.id,k.key_prefix,k.duration_days,k.created_at,k.expires_at,k.redeemed_at,k.note,
           u.username AS redeemed_username
    FROM access_keys k LEFT JOIN users u ON u.id=k.redeemed_by
    ORDER BY k.id DESC LIMIT 200
  `).all();
  res.json({ keys: rows });
});
app.post("/api/admin/keys", requireAuth, requireAdmin, (req, res) => {
  const duration = Number(req.body.durationDays);
  const note = String(req.body.note || "").trim().slice(0, 100);
  const quantity = Math.min(Math.max(Number(req.body.quantity) || 1, 1), 10);
  if (![1, 30, 365].includes(duration)) return res.status(400).json({ error: "Choose 1, 30, or 365 days." });
  const insert = db.prepare("INSERT INTO access_keys (key_hash,key_prefix,duration_days,created_at,created_by,note) VALUES (?,?,?,?,?,?)");
  const keys = [];
  db.transaction(() => {
    for (let i = 0; i < quantity; i++) {
      const raw = crypto.randomBytes(12).toString("hex").toUpperCase();
      const formatted = keyDisplay(raw);
      insert.run(sha256(raw), formatted.slice(0, 9) + "…", duration, now(), req.user.id, note || null);
      keys.push(formatted);
    }
  })();
  logAdmin(req.user.id, null, "keys.generate", `${quantity} × ${duration} day key(s)`);
  // Full keys are returned only once. Only their hashes are stored in the database.
  res.status(201).json({ keys, key: keys[0], durationDays: duration, note });
});
app.delete("/api/admin/keys/:id", requireAuth, requireAdmin, (req, res) => {
  const key = db.prepare("SELECT id,redeemed_at FROM access_keys WHERE id=?").get(Number(req.params.id));
  if (!key) return res.status(404).json({ error: "Key not found." });
  if (key.redeemed_at) return res.status(400).json({ error: "Redeemed keys cannot be deleted from this panel." });
  db.prepare("DELETE FROM access_keys WHERE id=?").run(key.id);
  logAdmin(req.user.id, null, "keys.revoke", `key #${key.id}`);
  res.json({ ok: true });
});

app.get("/api/admin/users", requireAuth, requireAdmin, (req, res) => {
  const users = db.prepare(`
    SELECT u.id,u.username,u.email,u.role,u.access_expires_at,u.created_at,u.last_login_at,u.banned,u.ban_reason,u.banned_at,
           (SELECT duration_days FROM access_keys k WHERE k.redeemed_by=u.id) AS plan
    FROM users u WHERE u.role='user' ORDER BY u.id DESC LIMIT 500
  `).all();
  res.json({ users });
});

// Extend or deduct access time. action: "extend" | "deduct"; unit: "hours" | "days".
app.post("/api/admin/users/:id/time", requireAuth, requireAdmin, (req, res) => {
  const action = req.body.action;
  const unit = req.body.unit === "hours" ? "hours" : "days";
  const amount = Number(req.body.amount);
  if (!["extend", "deduct"].includes(action)) return res.status(400).json({ error: "Action must be extend or deduct." });
  if (!Number.isInteger(amount) || amount < 1 || amount > (unit === "days" ? 3650 : 24 * 365))
    return res.status(400).json({ error: "Enter a whole number of " + unit + " (at least 1)." });
  const user = db.prepare("SELECT * FROM users WHERE id=? AND role='user'").get(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found." });
  const delta = amount * (unit === "days" ? DAY : HOUR);
  let newExpiry;
  if (action === "extend") {
    newExpiry = Math.max(now(), user.access_expires_at) + delta; // expired accounts restart from now
  } else {
    newExpiry = user.access_expires_at - delta;
    if (newExpiry < now()) newExpiry = now(); // deducting more than remains simply expires the account
  }
  db.prepare("UPDATE users SET access_expires_at=? WHERE id=?").run(newExpiry, user.id);
  if (newExpiry <= now()) db.prepare("DELETE FROM sessions WHERE user_id=?").run(user.id);
  logAdmin(req.user.id, user.id, "time." + action, `${amount} ${unit}`);
  res.json({ ok: true, accessExpiresAt: newExpiry });
});
app.post("/api/admin/users/:id/ban", requireAuth, requireAdmin, (req, res) => {
  const banned = !!req.body.banned;
  const reason = String(req.body.reason || "").trim().slice(0, 200);
  const user = db.prepare("SELECT * FROM users WHERE id=? AND role='user'").get(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found." });
  if (banned) {
    db.prepare("UPDATE users SET banned=1, ban_reason=?, banned_at=? WHERE id=?").run(reason || null, now(), user.id);
    db.prepare("DELETE FROM sessions WHERE user_id=?").run(user.id); // sign them out immediately
  } else {
    db.prepare("UPDATE users SET banned=0, ban_reason=NULL, banned_at=NULL WHERE id=?").run(user.id);
  }
  logAdmin(req.user.id, user.id, banned ? "user.ban" : "user.unban", reason);
  res.json({ ok: true, banned });
});

app.get("/api/admin/log", requireAuth, requireAdmin, (req, res) => {
  const rows = db.prepare(`
    SELECT l.id,l.action,l.detail,l.created_at,u.username AS target
    FROM admin_log l LEFT JOIN users u ON u.id=l.user_id ORDER BY l.id DESC LIMIT 30
  `).all();
  res.json({ log: rows });
});

app.use("/api", (req, res) => res.status(404).json({ error: "Not found." }));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`JavaVerse running at http://localhost:${PORT}`));
