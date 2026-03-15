---
id: 11
title: Fix JWT auth Swagger UI 401
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["auth", "jwt", "swagger-ui", "oauth2", "fix"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/api/auth.py
  - specs/002-ai-chatbot/quickstart.md
  - specs/002-ai-chatbot/tasks.md
tests:
  - Manual: Swagger UI /docs → Authorize → email+password → calls /api/auth/token → token stored → /chat endpoint returns 200
---

## Prompt

You are given a FastAPI project where the login endpoint correctly generates a JWT token, but calling any protected endpoint (like /chat) returns 401 Not Authenticated, even when using the correct login credentials.

Fix the authentication logic so that:

1. The login endpoint generates a valid JWT access token with proper secret, algorithm, and expiry.
2. All protected endpoints (like /chat) correctly use OAuth2PasswordBearer or the appropriate FastAPI dependency to validate the token.
3. Tokens must be sent in the Authorization header as: "Bearer <token>".
4. Ensure the secret key, algorithm, and token expiry are consistent between login and token validation.
5. If any FastAPI security imports (like OAuth2PasswordBearer, Security, or HTTPBearer) are missing, add them.
6. Ensure user authentication is properly verified before granting access to protected endpoints.
7. Make sure Swagger UI (/docs) works: login returns a token, and then `/chat` accepts it without returning 401 errors.
8. Include any necessary fixes in: -

## Response snapshot

Root cause identified: `HTTPBearer(auto_error=False)` does not integrate with Swagger UI's "Authorize" dialog, so users who call `/api/auth/login`, receive a token in the JSON response, but never click the padlock/Authorize button in Swagger UI end up sending requests without the `Authorization` header → `credentials is None` → 401 "Not authenticated".

**Fix applied — `backend/api/auth.py`**:
- Replaced `HTTPBearer(auto_error=False)` + `Optional[HTTPAuthorizationCredentials]` with `OAuth2PasswordBearer(tokenUrl="/api/auth/token")` + plain `str` token parameter.
- Added `/api/auth/token` endpoint (accepts `OAuth2PasswordRequestForm` — email as `username`, password as `password`) that returns `{"access_token": "...", "token_type": "bearer"}` per the OAuth2 standard.
- `get_current_user` now receives the raw JWT string directly from `OAuth2PasswordBearer` (which raises 401 automatically when the header is absent) and validates it via `verify_token`.
- Kept `/api/auth/login` (JSON body) and `/api/auth/register` unchanged for the frontend.

**Fix applied — `specs/002-ai-chatbot/quickstart.md`**:
- Corrected the uvicorn start command from `cd backend && uvicorn main:app` to `uvicorn backend.main:app` (run from project root, required because all backend imports use `from backend.xxx` prefix).

**Swagger UI flow after fix**:
1. Open `http://localhost:8000/docs`
2. Click "Authorize" (padlock icon)
3. Enter email (in the `username` field) and password → click "Authorize"
4. Swagger UI calls `POST /api/auth/token`, stores the JWT, and sends `Authorization: Bearer <token>` automatically for all protected endpoints.
5. `/api/{user_id}/chat` now returns 200.

## Outcome

- ✅ Impact: Protected endpoints no longer return 401 when using Swagger UI's built-in Authorize flow; frontend auth flow (localStorage token + getAuthHeaders) unchanged and continues to work.
- 🧪 Tests: Manual validation via Swagger UI and frontend chat flow.
- 📁 Files: backend/api/auth.py (security scheme change + new /token endpoint), quickstart.md (uvicorn command fix), tasks.md (T047 marked complete).
- 🔁 Next prompts: Run full quickstart verification, test chat persistence, test task management via chat.
- 🧠 Reflection: HTTPBearer(auto_error=False) is technically correct but invisible in Swagger UI; OAuth2PasswordBearer is the right choice when Swagger UI integration is required. The tokenUrl must match the actual endpoint path (including router prefix).

## Evaluation notes (flywheel)

- Failure modes observed: HTTPBearer with auto_error=False silently accepts missing credentials, making Swagger UI testing non-obvious; incorrect uvicorn launch path caused import errors.
- Graders run and results (PASS/FAIL): Manual code review PASS
- Prompt variant (if applicable): null
- Next experiment: Add integration test that verifies 401 → login → 200 flow end-to-end.
