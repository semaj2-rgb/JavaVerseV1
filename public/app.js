/* JavaVerse (combined): learning site + accounts + profile + admin panel */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const DAY = 86400000, HOUR = 3600000;
let currentUser = null, contentLoaded = false, learnInitialized = false;
let state = { completed: [], solved: [], bestScore: null };
let currentQuiz = 0, quizAnswers = [], challengeOpen = null;
let adminUsers = [], modalUserId = null, lastGeneratedKeys = [];

/* ----------------------------- helpers ----------------------------- */
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
const escapeHtml = esc;
function fmtDate(ms) { return ms ? new Date(ms).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"; }
function fmtDay(ms) { return ms ? new Date(ms).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—"; }
function planLabel(d) { return d == null ? "—" : d === 365 ? "12 months" : d + " day" + (d === 1 ? "" : "s"); }
function timeLeft(ms) {
  const diff = ms - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / DAY);
  if (days >= 2) return `${days} days left`;
  const hours = Math.max(1, Math.floor(diff / HOUR));
  return `${hours} hour${hours === 1 ? "" : "s"} left`;
}
function accessStatus(u) {
  if (u.role === "admin") return { key: "admin", label: "Administrator" };
  if (u.banned) return { key: "banned", label: "Banned" };
  if (u.accessExpiresAt <= Date.now()) return { key: "expired", label: "Expired" };
  if (u.accessExpiresAt - Date.now() <= 3 * DAY) return { key: "warn", label: "Expiring soon" };
  return { key: "", label: "Active" };
}
function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2600); }
function showBox(sel, text, good = false) { const el = $(sel); el.textContent = text; el.classList.remove("hidden", "good"); if (good) el.classList.add("good"); }
function hideBox(sel) { $(sel).classList.add("hidden"); }

async function api(url, options = {}) {
  const res = await fetch(url, { credentials: "same-origin", headers: { "Content-Type": "application/json", ...(options.headers || {}) }, ...options });
  const data = await res.json().catch(() => ({ error: "Unexpected server response." }));
  if (!res.ok) {
    // Session ended, access expired, or account banned while using the site.
    if ((res.status === 401 || res.status === 403) && currentUser && !url.startsWith("/api/sign")) forceSignOut(data.error);
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

/* ----------------------------- auth ----------------------------- */
function authTab(name) {
  $$("[data-auth-tab]").forEach(b => b.classList.toggle("active", b.dataset.authTab === name));
  $("#signinForm").classList.toggle("hidden", name !== "signin");
  $("#signupForm").classList.toggle("hidden", name !== "signup");
  hideBox("#authMessage");
}
$$("[data-auth-tab]").forEach(b => b.addEventListener("click", () => authTab(b.dataset.authTab)));

async function submitAuth(e, url, body) {
  e.preventDefault();
  const form = e.currentTarget, btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  try {
    const data = await api(url, { method: "POST", body: JSON.stringify(body(new FormData(form))) });
    form.reset();
    await enterApp(data.user);
  } catch (err) { showBox("#authMessage", err.message); }
  finally { btn.disabled = false; }
}
$("#signinForm").addEventListener("submit", e => submitAuth(e, "/api/signin", f => ({ identifier: f.get("identifier"), password: f.get("password") })));
$("#signupForm").addEventListener("submit", e => submitAuth(e, "/api/signup", f => ({ username: f.get("username"), email: f.get("email"), password: f.get("password"), accessKey: f.get("accessKey") })));
$("#signoutBtn").onclick = async () => { try { await api("/api/signout", { method: "POST", body: "{}" }); } catch {} showAuth(); authTab("signin"); };

function showAuth(message) {
  currentUser = null; contentLoaded = false;
  $("#authView").classList.remove("hidden");
  $("#appShell").classList.add("hidden");
  $("#userModal").classList.add("hidden");
  history.replaceState(null, "", location.pathname);
  if (message) showBox("#authMessage", message);
}
function forceSignOut(message) { showAuth(message || "Please sign in again."); }

// Learning content is fetched from the server only after sign-in (blocked for expired/banned accounts).
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.onload = () => { s.remove(); resolve(); }; s.onerror = () => { s.remove(); reject(new Error("Could not load learning content. Your access may have ended.")); };
    document.head.appendChild(s);
  });
}
async function loadContent() {
  if (contentLoaded) return;
  await loadScript("/api/content/learn-data.js");
  await loadScript("/api/content/java-reference.js");
  contentLoaded = true;
}

async function enterApp(user) {
  try { await loadContent(); }
  catch (err) { showAuth(err.message); return; }
  currentUser = user;
  state = loadState();
  $("#authView").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  $("#adminNav").classList.toggle("hidden", user.role !== "admin");
  if (!learnInitialized) { initLearning(); learnInitialized = true; }
  renderSidebarUser(); renderProfile(); updateDashboard();
  renderFeatured(); renderConcepts();
  quizAnswers = []; currentQuiz = 0; renderQuiz();
  route();
}

function renderSidebarUser() {
  const u = currentUser, st = accessStatus(u);
  const initials = u.username.slice(0, 2).toUpperCase();
  $("#sideAvatar").textContent = initials;
  $("#sideName").textContent = u.username;
  $("#sideRole").textContent = u.role === "admin" ? "Administrator" : planLabel(u.plan) + " plan";
  $("#topbarLabel").textContent = u.role === "admin" ? "Administrator" : "Your learning space";
  const card = $("#accessCard");
  card.classList.remove("warn", "bad");
  if (u.role === "admin") { $("#accessCardTitle").textContent = "Admin access"; $("#accessCardText").textContent = "No expiry. Manage users and keys from the Admin panel."; }
  else {
    $("#accessCardTitle").textContent = timeLeft(u.accessExpiresAt);
    $("#accessCardText").textContent = "Access until " + fmtDay(u.accessExpiresAt);
    if (st.key === "warn") card.classList.add("warn");
  }
}

function renderProfile() {
  const u = currentUser, st = accessStatus(u);
  $("#profAvatar").textContent = u.username.slice(0, 2).toUpperCase();
  $("#profName").textContent = u.username;
  $("#profEmail").textContent = u.role === "admin" ? "Administrator account" : u.email;
  $("#profUsername").textContent = u.username;
  $("#profEmail2").textContent = u.role === "admin" ? "—" : u.email;
  $("#profRole").textContent = u.role === "admin" ? "Administrator" : "Student";
  $("#profPlan").textContent = u.role === "admin" ? "Unlimited" : planLabel(u.plan);
  $("#profCreated").textContent = fmtDay(u.createdAt);
  $("#profLast").textContent = fmtDate(u.lastLoginAt);
  const badge = $("#profStatus");
  badge.textContent = st.label; badge.className = "status-badge " + st.key;
  if (u.role === "admin") {
    $("#profExpiry").textContent = "Never"; $("#profLeft").textContent = "Unlimited admin access";
    $("#profBar").style.width = "100%"; $("#profNote").textContent = "The admin password is changed in the server .env file.";
    $("#passwordForm").classList.add("hidden");
  } else {
    $("#passwordForm").classList.remove("hidden");
    $("#profExpiry").textContent = fmtDate(u.accessExpiresAt);
    $("#profLeft").textContent = timeLeft(u.accessExpiresAt);
    const total = (u.plan || 30) * DAY, pct = Math.max(0, Math.min(100, (u.accessExpiresAt - Date.now()) / total * 100));
    $("#profBar").style.width = pct + "%";
  }
}

$("#passwordForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.currentTarget, f = new FormData(form);
  try {
    await api("/api/profile/password", { method: "POST", body: JSON.stringify({ currentPassword: f.get("currentPassword"), newPassword: f.get("newPassword") }) });
    form.reset(); showBox("#pwMessage", "Password updated. Other devices were signed out.", true);
  } catch (err) { showBox("#pwMessage", err.message); }
});

/* ----------------------------- navigation ----------------------------- */
const ADMIN_PAGES = ["admin", "admin-keys", "admin-users"];
function goPage(name) {
  if (!currentUser) return;
  let page = document.getElementById("page-" + name) ? name : "home";
  if (ADMIN_PAGES.includes(page) && currentUser.role !== "admin") page = "home";
  $$(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + page));
  $$(".nav-link").forEach(a => a.classList.toggle("active", a.dataset.page === page));
  const link = $(`.nav-link[data-page="${page}"]`);
  $("#currentSection").textContent = link ? link.lastChild.textContent.trim() : "Overview";
  $("#sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (page === "learn") renderLessons();
  if (page === "practice") renderChallenges();
  if (page === "profile") { renderProfile(); refreshMe(); }
  if (ADMIN_PAGES.includes(page)) loadAdminData();
}
function route() { goPage(location.hash.replace("#", "") || "home"); }
async function refreshMe() { try { const d = await api("/api/me"); currentUser = d.user; renderSidebarUser(); renderProfile(); } catch {} }
window.addEventListener("hashchange", route);
$("#menuToggle").onclick = () => $("#sidebar").classList.toggle("open");

/* ----------------------------- learning ----------------------------- */
function stateKey() { return "javaverse-state-" + (currentUser ? currentUser.id : "guest"); }
function loadState() { try { return JSON.parse(localStorage.getItem(stateKey())) || { completed: [], solved: [], bestScore: null }; } catch { return { completed: [], solved: [], bestScore: null }; } }
function saveState() { try { localStorage.setItem(stateKey(), JSON.stringify(state)); } catch {} updateDashboard(); }
function updateDashboard() {
  const n = state.completed.length, total = lessons.length;
  $("#lessonCount").innerHTML = `${n} <small>/ ${total}</small>`;
  $("#lessonProgress").style.width = (n / total * 100) + "%";
  $("#bestScore").innerHTML = `${state.bestScore ?? "—"} <small>/ 5</small>`;
  $("#challengeCount").textContent = state.solved.length;
}
function lessonCard(l) { return `<article class="lesson-card" data-lesson="${l.id}" tabindex="0" role="button"><div class="lesson-card-top"><span class="lesson-icon">${l.icon}</span><span class="pill ${l.level.toLowerCase()}">${l.level}</span></div><h3>${l.title}</h3><p>${l.desc}</p><div class="lesson-card-bottom"><span>${l.time}</span><span>${state.completed.includes(l.id) ? "✓ Completed" : "Open lesson →"}</span></div></article>`; }
function renderFeatured() { $("#featuredLessons").innerHTML = lessons.slice(0, 3).map(lessonCard).join(""); $$("#featuredLessons [data-lesson]").forEach(el => el.addEventListener("click", () => { location.hash = "#learn"; setTimeout(() => showLesson(Number(el.dataset.lesson)), 60); })); }
function renderLessons() {
  const q = ($("#lessonSearch")?.value || "").toLowerCase(), level = $("#levelFilter")?.value || "All";
  const filtered = lessons.filter(l => (level === "All" || l.level === level) && `${l.title} ${l.desc} ${l.level}`.toLowerCase().includes(q));
  $("#allLessons").innerHTML = filtered.map(l => `<article class="lesson-row ${state.completed.includes(l.id) ? "done" : ""}" data-lesson="${l.id}" tabindex="0" role="button"><span class="lesson-number">${state.completed.includes(l.id) ? "✓" : String(l.id).padStart(2, "0")}</span><div class="lesson-row-copy"><h3>${l.title}</h3><p>${l.desc}</p></div><div class="lesson-row-meta"><span class="pill ${l.level.toLowerCase()}">${l.level}</span><span class="lesson-time">${l.time}</span><span class="row-arrow">›</span></div></article>`).join("") || '<p class="muted">No lessons match your search.</p>';
  $$("#allLessons [data-lesson]").forEach(el => { const fn = () => showLesson(Number(el.dataset.lesson)); el.addEventListener("click", fn); el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } }); });
}
function showLesson(id) {
  const l = lessons.find(x => x.id === id); if (!l) return;
  const d = $("#lessonDetail"); d.classList.remove("hidden");
  d.innerHTML = `<div class="detail-head"><div><span class="pill ${l.level.toLowerCase()}">${l.level} • ${l.time}</span><h2>${l.title}</h2></div><button class="btn btn-quiet" id="closeLesson">Close ×</button></div><p class="detail-copy">${l.body}</p><h3>Example</h3><pre class="code-block">${esc(l.code)}</pre><h3>Expected output / behavior</h3><pre class="code-block">${esc(l.output)}</pre><div class="detail-actions"><button class="btn btn-primary" id="completeLesson">${state.completed.includes(id) ? "✓ Completed" : "Mark as completed"}</button><button class="btn btn-secondary" id="tryLesson">Open code playground ↗</button></div>`;
  d.scrollIntoView({ behavior: "smooth", block: "start" });
  $("#closeLesson").onclick = () => d.classList.add("hidden");
  $("#completeLesson").onclick = () => { if (!state.completed.includes(id)) { state.completed.push(id); saveState(); renderLessons(); renderFeatured(); showLesson(id); toast("Lesson marked as completed."); } else toast("This lesson is already completed."); };
  $("#tryLesson").onclick = () => { location.hash = "#playground"; $("#codeEditor").value = l.code; $("#sampleSelect").value = "hello"; $("#consoleOutput").textContent = "Lesson code loaded. Demo mode supports only the built-in samples."; };
}
function initPlayground() {
  $("#codeEditor").value = samples.hello.code;
  $("#sampleSelect").addEventListener("change", () => { $("#codeEditor").value = samples[$("#sampleSelect").value].code; $("#consoleOutput").innerHTML = '<span class="output-muted">Sample loaded. Select “Run demo” to view its example output.</span>'; });
  $("#resetCode").onclick = () => { $("#codeEditor").value = samples[$("#sampleSelect").value].code; toast("Sample reset."); };
  $("#clearOutput").onclick = () => { $("#consoleOutput").innerHTML = '<span class="output-muted">Console cleared.</span>'; };
  $("#runCode").onclick = () => { const sample = samples[$("#sampleSelect").value]; if ($("#codeEditor").value.trim() !== sample.code.trim()) { $("#consoleOutput").textContent = "This starter editor does not compile custom code. The displayed output is only a demo for the selected built-in sample. Connect a Java compiler/runtime to execute edits."; return; } $("#consoleOutput").textContent = sample.output; toast("Displayed built-in demo output."); };
}
function renderChallenges() {
  $("#challengeGrid").innerHTML = challenges.map(c => `<article class="challenge-card ${state.solved.includes(c.id) ? "completed" : ""}"><div class="challenge-top"><span class="challenge-symbol">${state.solved.includes(c.id) ? "✓" : "⚡"}</span><span class="pill ${c.level === "Easy" ? "beginner" : "intermediate"}">${c.level}</span></div><h3>${c.title}</h3><p>${c.desc}</p><div class="lesson-card-bottom"><span>${c.topic}</span><span>${state.solved.includes(c.id) ? "Solved ✓" : "Challenge " + String(c.id).padStart(2, "0")}</span></div><button class="btn btn-secondary" data-challenge="${c.id}">${state.solved.includes(c.id) ? "Review challenge" : "Try challenge"} →</button></article>`).join("");
  $$("[data-challenge]").forEach(b => b.onclick = () => showChallenge(Number(b.dataset.challenge)));
}
function normalize(s) { return s.toLowerCase().replace(/\s+/g, " ").replace(/\s*([{}();,+=])\s*/g, "$1").replace(/;?$/, "").trim(); }
function showChallenge(id) {
  const c = challenges.find(x => x.id === id); challengeOpen = id;
  const d = $("#challengeDetail"); d.classList.remove("hidden");
  d.innerHTML = `<div class="detail-head"><div><span class="pill">${c.topic} • ${c.level}</span><h2>${c.title}</h2></div><button class="btn btn-quiet" id="closeChallenge">Close ×</button></div><p class="detail-copy">${c.desc}</p><button class="btn btn-quiet" id="showHint">Show hint</button><p class="detail-copy hidden" id="challengeHint">${c.hint}</p><label for="challengeAnswer">Your Java answer</label><input class="answer-input" id="challengeAnswer" placeholder="Type your Java code here..."><div class="detail-actions"><button class="btn btn-primary" id="checkAnswer">Check answer</button><button class="btn btn-secondary" id="showSolution">Show sample solution</button></div><div id="challengeFeedback"></div>`;
  d.scrollIntoView({ behavior: "smooth", block: "start" });
  $("#closeChallenge").onclick = () => d.classList.add("hidden");
  $("#showHint").onclick = () => $("#challengeHint").classList.toggle("hidden");
  $("#showSolution").onclick = () => { $("#challengeAnswer").value = c.answer; $("#challengeFeedback").innerHTML = `<div class="feedback good">Sample solution loaded. ${c.explain}</div>`; };
  $("#checkAnswer").onclick = () => {
    const val = normalize($("#challengeAnswer").value);
    const accepted = val === normalize(c.answer) || val.replace(/;$/, "") === normalize(c.answer).replace(/;$/, "");
    if (accepted) { if (!state.solved.includes(id)) state.solved.push(id); saveState(); renderChallenges(); $("#challengeFeedback").innerHTML = `<div class="feedback good">Looks good! ${c.explain}</div>`; toast("Challenge completed."); }
    else $("#challengeFeedback").innerHTML = `<div class="feedback bad">Not an exact match yet. Check your syntax or use the hint. This simple checker compares with one sample answer, so other valid solutions may not be recognized.</div>`;
  };
}
function renderQuiz() {
  const content = $("#quizContent");
  if (currentQuiz >= quizQuestions.length) {
    const score = quizAnswers.reduce((n, a, i) => n + (a === quizQuestions[i].correct ? 1 : 0), 0);
    state.bestScore = Math.max(state.bestScore ?? 0, score); saveState();
    $("#quizProgressText").textContent = "QUIZ COMPLETE"; $("#quizProgressBar").style.width = "100%";
    content.innerHTML = `<div class="quiz-result"><div class="result-score">${score}/5</div><h2>${score === 5 ? "Perfect score!" : score >= 3 ? "Nice work!" : "Keep learning!"}</h2><p>You answered ${score} of 5 questions correctly. Review lessons and try again to improve your score.</p><button class="btn btn-primary" id="retryQuiz">Try again ↻</button></div>`;
    $("#retryQuiz").onclick = () => { currentQuiz = 0; quizAnswers = []; renderQuiz(); }; return;
  }
  const q = quizQuestions[currentQuiz], chosen = quizAnswers[currentQuiz];
  $("#quizProgressText").textContent = `QUESTION ${currentQuiz + 1} OF ${quizQuestions.length}`;
  $("#quizProgressBar").style.width = `${(currentQuiz + 1) / quizQuestions.length * 100}%`;
  content.innerHTML = `<h2 class="quiz-question">${q.q}</h2><div class="quiz-options">${q.opts.map((o, i) => `<button class="quiz-option ${chosen !== undefined && i === q.correct ? "correct" : chosen === i && i !== q.correct ? "wrong" : ""}" data-option="${i}" ${chosen !== undefined ? "disabled" : ""}><span class="option-letter">${String.fromCharCode(65 + i)}</span>${o}</button>`).join("")}</div>${chosen !== undefined ? `<div class="quiz-explanation">${chosen === q.correct ? "Correct! " : "Not quite. "}${q.why}</div>` : ""}<div class="quiz-controls"><span class="muted small">${chosen === undefined ? "Choose the best answer." : "Answer recorded."}</span>${chosen !== undefined ? `<button class="btn btn-primary" id="nextQuestion">${currentQuiz === quizQuestions.length - 1 ? "See results" : "Next question →"}</button>` : ""}</div>`;
  $$("[data-option]").forEach(b => b.onclick = () => { quizAnswers[currentQuiz] = Number(b.dataset.option); renderQuiz(); });
  if (chosen !== undefined) $("#nextQuestion").onclick = () => { currentQuiz++; renderQuiz(); };
}
function renderProjects() {
  $("#projectGrid").innerHTML = projects.map((p, i) => `<article class="project-card"><div class="project-icon">${p.icon}</div><span class="pill ${p.level.toLowerCase()}">${p.level}</span><h3 style="margin-top:12px">${p.title}</h3><p>${p.desc}</p><div class="project-meta">${p.time} • Guided project</div><button class="btn btn-secondary" data-project="${i}">View project plan →</button></article>`).join("");
  $$("[data-project]").forEach(b => b.onclick = () => {
    $$(".project-detail").forEach(x => x.remove());
    const p = projects[Number(b.dataset.project)], content = p.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
    const overlay = document.createElement("div"); overlay.className = "lesson-detail project-detail";
    overlay.innerHTML = `<div class="detail-head"><div><span class="pill">${p.level} • ${p.time}</span><h2>${p.title}</h2></div><button class="btn btn-quiet" aria-label="Close project">Close ×</button></div><p class="detail-copy">${p.desc}</p><h3>Project plan</h3><pre class="code-block">${esc(content)}</pre><p class="detail-copy">Build this project in your Java IDE. Test normal inputs and edge cases, and add comments where they clarify your logic.</p>`;
    $("#projectGrid").after(overlay); overlay.querySelector("button").onclick = () => overlay.remove(); overlay.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
function renderConcepts() {
  const sel = $("#conceptCategory");
  if (sel.options.length === 1) [...new Set(javaConcepts.map(c => c.category))].sort().forEach(c => { const o = document.createElement("option"); o.value = c; o.textContent = c; sel.appendChild(o); });
  const search = ($("#conceptSearch").value || "").trim().toLowerCase(), category = sel.value || "all";
  const matches = javaConcepts.filter(c => (category === "all" || c.category === category) && [c.title, c.category, c.tag, c.definition, c.syntax, c.example, c.note].join(" ").toLowerCase().includes(search));
  $("#conceptCount").textContent = `${matches.length} concept${matches.length === 1 ? "" : "s"}`;
  $("#conceptsGrid").innerHTML = matches.map(c => `<article class="concept-card"><div class="concept-card-top"><span class="concept-category">${esc(c.category)}</span><span class="concept-tag">${esc(c.tag)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.definition)}</p><div class="concept-label">SYNTAX</div><pre><code>${esc(c.syntax)}</code></pre><div class="concept-label">EXAMPLE</div><pre><code>${esc(c.example)}</code></pre><div class="concept-output"><span>OUTPUT / RESULT</span><code>${esc(c.output)}</code></div><p class="concept-note">${esc(c.note)}</p></article>`).join("") || '<div class="concept-empty">No concepts match that search. Try another keyword or choose All categories.</div>';
}
function initLearning() {
  initPlayground(); renderProjects();
  $("#lessonSearch").addEventListener("input", renderLessons);
  $("#levelFilter").addEventListener("change", renderLessons);
  $("#conceptSearch").addEventListener("input", renderConcepts);
  $("#conceptCategory").addEventListener("change", renderConcepts);
  $("#focusSearch").onclick = () => { location.hash = "#learn"; setTimeout(() => $("#lessonSearch").focus(), 80); };
  $("#resetProgress").onclick = () => { if (confirm("Reset all JavaVerse progress saved on this device for your account?")) { state = { completed: [], solved: [], bestScore: null }; saveState(); renderFeatured(); renderLessons(); renderChallenges(); toast("Progress reset."); } };
}
document.addEventListener("keydown", e => {
  if (!currentUser) return;
  if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) { e.preventDefault(); location.hash = "#learn"; setTimeout(() => $("#lessonSearch").focus(), 80); }
  if (e.key === "Escape") { $("#sidebar").classList.remove("open"); closeModal(); }
});

/* ----------------------------- admin ----------------------------- */
async function loadAdminData() {
  if (!currentUser || currentUser.role !== "admin") return;
  try {
    const [stats, keys, users, log] = await Promise.all([api("/api/admin/stats"), api("/api/admin/keys"), api("/api/admin/users"), api("/api/admin/log")]);
    renderStats(stats); renderKeys(keys.keys); adminUsers = users.users; renderUsers(); renderLog(log.log);
    if (modalUserId) fillModal();
  } catch (e) { toast(e.message); }
}
function renderStats(s) {
  const card = (label, n, icon, cls, note) => `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon ${cls}">${icon}</span></div><div class="stat-number">${n}</div><div class="stat-note">${note}</div></article>`;
  $("#adminStats").innerHTML = card("TOTAL USERS", s.totalUsers, "☰", "purple", `${s.activeUsers} active`) + card("EXPIRING IN 3 DAYS", s.expiringSoon, "⏱", "orange", `${s.expiredUsers} already expired`) + card("BANNED", s.bannedUsers, "⛔", "orange", "Blocked from signing in") + card("UNUSED KEYS", s.unusedKeys, "✦", "green", `${s.usedKeys} redeemed so far`);
}
function renderKeys(keys) {
  $("#keysTable").innerHTML = keys.map(k => {
    const status = k.redeemed_at ? `<span class="key-status used">Used${k.redeemed_username ? " by " + esc(k.redeemed_username) : ""}</span>` : k.expires_at && k.expires_at < Date.now() ? '<span class="key-status expired">Expired</span>' : '<span class="key-status">Unused</span>';
    return `<tr><td><code>${esc(k.key_prefix)}</code></td><td>${planLabel(k.duration_days)}</td><td>${status}</td><td>${fmtDate(k.created_at)}</td><td>${esc(k.note || "")}</td><td>${k.redeemed_at ? "" : `<button class="btn btn-quiet" data-revoke="${k.id}">Revoke</button>`}</td></tr>`;
  }).join("") || '<tr><td colspan="6">No keys generated yet.</td></tr>';
  $$("[data-revoke]").forEach(b => b.onclick = async () => { if (!confirm("Revoke this unused key? It can no longer be used to register.")) return; try { await api("/api/admin/keys/" + b.dataset.revoke, { method: "DELETE" }); toast("Key revoked."); loadAdminData(); } catch (e) { toast(e.message); } });
}
function userStatus(u) {
  if (u.banned) return { cls: "banned", label: "Banned" };
  if (u.access_expires_at <= Date.now()) return { cls: "expired", label: "Expired" };
  return { cls: "", label: "Active" };
}
function renderUsers() {
  const q = ($("#userSearch").value || "").trim().toLowerCase(), f = $("#userFilter").value;
  const list = adminUsers.filter(u => {
    const st = userStatus(u).label.toLowerCase();
    return (f === "all" || st === f) && (u.username + " " + u.email).toLowerCase().includes(q);
  });
  $("#usersTable").innerHTML = list.map(u => { const st = userStatus(u); return `<tr><td><b>${esc(u.username)}</b></td><td>${esc(u.email)}</td><td>${planLabel(u.plan)}</td><td>${fmtDate(u.access_expires_at)}<br><span class="muted">${u.banned ? "" : timeLeft(u.access_expires_at)}</span></td><td><span class="key-status ${st.cls}">${st.label}</span></td><td><button class="btn btn-secondary" data-manage="${u.id}">Manage</button></td></tr>`; }).join("") || '<tr><td colspan="6">No users match.</td></tr>';
  $$("[data-manage]").forEach(b => b.onclick = () => openModal(Number(b.dataset.manage)));
}
function renderLog(log) {
  const names = { "keys.generate": "Generated keys", "keys.revoke": "Revoked key", "time.extend": "Extended time", "time.deduct": "Deducted time", "user.ban": "Banned user", "user.unban": "Unbanned user" };
  $("#logTable").innerHTML = log.map(l => `<tr><td>${fmtDate(l.created_at)}</td><td>${esc(names[l.action] || l.action)}</td><td>${esc(l.target || "—")}</td><td>${esc(l.detail || "")}</td></tr>`).join("") || '<tr><td colspan="4">No admin activity yet.</td></tr>';
}
$("#refreshAdmin").onclick = loadAdminData;
$("#refreshKeys").onclick = loadAdminData;
$("#userSearch").addEventListener("input", renderUsers);
$("#userFilter").addEventListener("change", renderUsers);

$("#keyForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  try {
    const data = await api("/api/admin/keys", { method: "POST", body: JSON.stringify({ durationDays: Number(f.get("durationDays")), quantity: Number(f.get("quantity")), note: f.get("note") }) });
    lastGeneratedKeys = data.keys;
    $("#newKeyList").innerHTML = data.keys.map(k => `<code>${esc(k)}</code>`).join("");
    $("#newKeyPlural").textContent = data.keys.length > 1 ? "S" : "";
    $("#copyKey").textContent = data.keys.length > 1 ? "Copy all keys" : "Copy key";
    $("#newKeyBox").classList.remove("hidden");
    loadAdminData();
  } catch (err) { toast(err.message); }
});
$("#copyKey").onclick = async () => { try { await navigator.clipboard.writeText(lastGeneratedKeys.join("\n")); $("#copyKey").textContent = "Copied ✓"; } catch { toast("Clipboard unavailable. Select and copy the key manually."); } };

/* manage-user modal */
function openModal(id) { modalUserId = id; hideBox("#modalMessage"); fillModal(); $("#userModal").classList.remove("hidden"); }
function closeModal() { modalUserId = null; $("#userModal").classList.add("hidden"); }
$("#modalClose").onclick = closeModal;
$("#userModal").addEventListener("click", e => { if (e.target.id === "userModal") closeModal(); });
function fillModal() {
  const u = adminUsers.find(x => x.id === modalUserId); if (!u) { closeModal(); return; }
  const st = userStatus(u);
  $("#modalTitle").textContent = u.username; $("#modalSub").textContent = u.email;
  $("#modalInfo").innerHTML = [["Status", st.label], ["Plan", planLabel(u.plan)], ["Access expires", fmtDate(u.access_expires_at)], ["Time left", u.banned ? "—" : timeLeft(u.access_expires_at)], ["Joined", fmtDay(u.created_at)], ["Last sign-in", fmtDate(u.last_login_at)]].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("") + (u.banned && u.ban_reason ? `<div style="grid-column:1/-1"><dt>Ban reason</dt><dd>${esc(u.ban_reason)}</dd></div>` : "");
  if (u.banned) {
    $("#banHeading").textContent = "Account is banned"; $("#banReasonWrap").classList.add("hidden");
    $("#banBtn").textContent = "Unban this account"; $("#banBtn").className = "btn btn-ok";
    $("#banNote").textContent = "Unbanning lets the user sign in again. Their remaining access time is unchanged.";
  } else {
    $("#banHeading").textContent = "Ban account"; $("#banReasonWrap").classList.remove("hidden");
    $("#banBtn").textContent = "Ban this account"; $("#banBtn").className = "btn btn-danger";
    $("#banNote").textContent = "Banning signs the user out immediately and blocks sign-in until you unban them.";
  }
}
async function adjustTime(action, amount, unit) {
  try {
    await api(`/api/admin/users/${modalUserId}/time`, { method: "POST", body: JSON.stringify({ action, amount, unit }) });
    showBox("#modalMessage", `${action === "extend" ? "Extended" : "Deducted"} ${amount} ${unit}.`, true);
    await loadAdminData();
  } catch (err) { showBox("#modalMessage", err.message); }
}
$("#adjApply").onclick = () => adjustTime($("#adjAction").value, Number($("#adjAmount").value), $("#adjUnit").value);
$$("[data-q]").forEach(c => c.onclick = () => { const [a, n, u] = c.dataset.q.split(":"); adjustTime(a, Number(n), u); });
$("#banBtn").onclick = async () => {
  const u = adminUsers.find(x => x.id === modalUserId); if (!u) return;
  const ban = !u.banned;
  if (ban && !confirm(`Ban ${u.username}? They will be signed out immediately.`)) return;
  try {
    await api(`/api/admin/users/${u.id}/ban`, { method: "POST", body: JSON.stringify({ banned: ban, reason: $("#banReason").value }) });
    $("#banReason").value = "";
    showBox("#modalMessage", ban ? "Account banned." : "Account unbanned.", true);
    await loadAdminData();
  } catch (err) { showBox("#modalMessage", err.message); }
};

/* ----------------------------- start ----------------------------- */
(async () => { try { const data = await api("/api/me"); await enterApp(data.user); } catch (e) { showAuth(/expired|banned/i.test(e.message) ? e.message : undefined); } })();
