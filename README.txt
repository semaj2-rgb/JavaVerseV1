JAVAVERSE (COMBINED) — LEARNING SITE + ACCOUNTS + PROFILE + ADMIN PANEL
=========================================================================

WHAT'S INSIDE
- Everything from JavaVerse: Overview dashboard, 12 lessons, code playground (demo),
  6 practice challenges, 5-question quiz, 6 mini projects.
- Everything from JavaVerse Online: sign in / create account, key generator, access
  periods (1 day, 30 days, 12 months), 180-entry searchable Java concepts library
  (Math.pow, Math.sqrt, etc.).
- NEW: My profile page (account details, plan, access expiry, days left, change password).
- NEW: Admin panel (sidebar section visible to the admin only):
    Dashboard      - user/key statistics + recent admin activity log
    Key generator  - create 1-10 single-use keys at a time; revoke unused keys
    Users          - search/filter users, then "Manage" a user to:
                       * EXTEND or DEDUCT access time (hours or days, or quick buttons)
                       * BAN / UNBAN the account (optional reason shown to the user)

NOTES ON BEHAVIOUR
- The "Java reference" cheat-sheet page of the original JavaVerse was merged into the
  "Java concepts" page (the concept library covers the same topics in more depth).
- Lessons, quiz, challenges and concepts are served by the backend only to signed-in
  users with active access (protected/ folder). Expired or banned users cannot read
  them, even by guessing the file URLs.
- Banning signs the user out immediately and blocks sign-in. Unbanning keeps their
  remaining time unchanged.
- Deducting more time than remains expires the account right away (and signs the user
  out). Extending an expired account restarts the clock from now.
- Learning progress (lessons, challenges, quiz score) is saved in the browser, per account.
- The code playground is still a demo: it shows output for built-in samples only.
- Existing databases from JavaVerse Online are upgraded automatically on start
  (new columns: banned, ban_reason, banned_at, last_login_at; new table: admin_log).

LOCAL SETUP (Windows / VS Code)
1. Install Node.js 20 or newer from https://nodejs.org/
2. Open this folder in VS Code and open a terminal here.
3. Copy .env.example to .env   (PowerShell: Copy-Item .env.example .env)
4. Edit .env:
   - SESSION_SECRET: random secret, 32+ characters
   - ADMIN_PASSWORD: unique password, 12+ characters (the server refuses the example one)
   - optionally change ADMIN_USERNAME
5. npm install
6. npm start
7. Open http://localhost:3000 and sign in with ADMIN_USERNAME / ADMIN_PASSWORD.
8. Admin panel -> Key generator -> generate a key -> give it to a user.
9. The user opens "Create account" and pastes the key. Each key works once.

FILES
  server.js                 backend (accounts, keys, admin API, protected content)
  protected/learn-data.js   lessons, samples, challenges, quiz, projects (auth required)
  protected/java-reference.js  concept library (auth required)
  public/index.html, shell.css, combined.css, app.js   the website

DEPLOYING ONLINE (example: Render)
1. Upload the project to a private GitHub repo EXCEPT .env, node_modules and data.
2. Render -> New Web Service. Build: npm install. Start: npm start.
3. Environment variables: NODE_ENV=production, SESSION_SECRET, ADMIN_USERNAME,
   ADMIN_PASSWORD, DB_PATH=/var/data/javaverse.sqlite
4. Add a persistent disk mounted at /var/data so accounts survive redeploys.
5. Use HTTPS (cookies are marked secure in production). Test: sign up, ban, unban,
   extend, deduct, and a second attempt to use the same key.

LIMITATIONS
- No email verification, password-reset emails, payments, or multi-factor authentication.
- The admin password is changed in .env (restart the server to apply).
- This is a starter, not a formal security audit.
