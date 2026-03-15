---
id: 7
title: Fix Failed to Fetch Auth Connectivity
stage: green
date: 2026-02-15
surface: agent
model: claude-opus-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["auth", "backend", "connectivity", "database", "bcrypt"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/config/settings.py
  - backend/config/database.py
  - backend/utils/security.py
tests:
  - "curl POST /api/auth/register -> 201 Created"
  - "curl POST /api/auth/login -> 200 OK"
  - "curl OPTIONS /api/auth/login (CORS preflight) -> 200 OK with correct headers"
  - "curl GET /health -> 200 OK"
---

## Prompt

Sign-in and sign-up fail with "Failed to fetch".

I ALREADY have both frontend and backend folders.

Do the following:
1. Inspect the existing frontend and backend code (do not create a new backend).
2. Identify why auth requests fail when clicking Sign In / Sign Up.
3. Verify backend server is reachable and running.
4. Ensure frontend auth fetch URLs, ports, and paths exactly match backend routes.
5. Fix any CORS issues between frontend (localhost:3000) and backend.
6. Confirm request/response formats match (JSON body, headers).
7. Fix registration and login so valid credentials succeed.

Do NOT change UI, AI logic, Gemini, MCP, or database schema.
Only fix frontend-backend connectivity and auth flow.

## Response snapshot

Diagnosed and fixed 4 root causes for "Failed to fetch":

1. **Backend not running** - server was never started. Dependencies installed via pip and uvicorn started.
2. **settings.py: .env not found** - `load_dotenv()` and pydantic `env_file` used relative path `.env` which fails when running from project root. Fixed to resolve path relative to `backend/` directory using `Path(__file__).resolve().parent.parent`.
3. **database.py: asyncpg incompatible URL** - Neon DB URL used `postgresql://` with `sslmode=require` and `channel_binding=require` params that asyncpg doesn't understand. Fixed with `_fix_async_url()` that converts scheme to `postgresql+asyncpg://`, converts `sslmode` to `ssl` connect_arg, and strips `channel_binding`.
4. **security.py: passlib/bcrypt version conflict** - `passlib 1.7.4` is incompatible with `bcrypt 5.0.0` (missing `bcrypt.__about__` attribute). Replaced passlib with direct bcrypt usage.

All endpoints verified: register (201), login (200), CORS preflight (200 with correct origin).

## Outcome

- ✅ Impact: Auth flow fully functional — frontend can now reach backend, register users with hashed passwords, and login with JWT tokens
- 🧪 Tests: 4 curl tests pass (health, register, login, CORS)
- 📁 Files: 3 files modified (settings.py, database.py, security.py)
- 🔁 Next prompts: End-to-end browser test of sign-up/sign-in forms
- 🧠 Reflection: The "Failed to fetch" was a network-level failure (backend not running), not an API error. Multiple cascading issues (env path, URL format, library incompatibility) prevented the backend from starting.

## Evaluation notes (flywheel)

- Failure modes observed: Cascading startup failures — each fix revealed the next issue
- Graders run and results (PASS/FAIL): All 4 endpoint tests PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add startup check script to validate env, deps, and DB connectivity before launch
