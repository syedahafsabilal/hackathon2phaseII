---
id: 13
title: Add auth logging diagnostic errors
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["auth", "jwt", "logging", "diagnostics", "401", "fix"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/api/auth.py
  - backend/services/auth_service.py
tests:
  - Manual: send request without Authorization header → 401 "Authorization header missing"
  - Manual: send request with Authorization: <token> (no Bearer prefix) → 401 "Malformed Authorization header: ..."
  - Manual: send request with Authorization: Bearer <invalid> → 401 "Invalid or expired token" + server log shows JWTError
  - Manual: send request with Authorization: Bearer <valid_token> → 200 OK
---

## Prompt

I have a FastAPI backend with these endpoints:

1. POST /api/auth/login — returns JSON:
{
  "id": "<UUID>",
  "name": "<user_name>",
  "email": "<email>",
  "token": "<JWT_token>"
}

2. POST /api/{user_id}/chat — currently gives 401 Unauthorized even when I pass the correct UUID in {user_id} and/or the JWT token.

Problems:
- user_id must be a UUID in the path.
- JWT token must be sent in the Authorization header as: Authorization: Bearer <token>
- Right now, if I put the token in user_id, UUID validation fails.
- If I put UUID in user_id and JWT in Authorization header, it still returns 401.

Goal:
- Fix authentication so that /chat:
  1. Accepts UUID in the path as user_id.
  2. Requires the JWT token in the Authorization header.
  3. Validates the token correctly against the logged-in user.
  4. Returns 200 OK when token is valid.
  5. Returns 401 only if token is missing, expired, or invalid.
- Update backend code (chat_agent.py, api/chat.py, or dependencies) to correctly extract and validate the JWT token and link it to user_id.
- Ensure Swagger UI / docs works and allows testing the endpoint using the JWT Authorization header.
- Keep UUID validation separate from the token.

Please provide the corrected FastAPI code changes, with dependency injection, token verification logic, and any Pydantic models needed so that the 401 error is fixed permanently.

## Response snapshot

The architecture (UUID in path, JWT in Authorization header, separate validation) was already correct. The persistent 401 had two root causes that made it impossible to diagnose:

1. **`verify_token` swallowed all exceptions** silently with `except (JWTError, ValueError, Exception): return None` — no log output, no way to know if the token was expired, had wrong signature, had no `sub` claim, etc.

2. **`get_current_user` had no access to the raw Authorization header** — when the OAuth2 scheme returned `None`, we couldn't tell users whether their header was absent or malformed.

**Fix in `backend/services/auth_service.py`**:
- Added `import logging` + `logger = logging.getLogger(__name__)`
- Split the broad `except Exception` into three specific handlers:
  - `JWTError` → logs `type(e).__name__: message` (e.g. `ExpiredSignatureError: Signature has expired`)
  - `ValueError` → logs UUID parse failure
  - `Exception` → logs unexpected error at ERROR level
- When the server is running, every failed token will now produce a log line explaining WHY

**Fix in `backend/api/auth.py`**:
- Added `import logging` + `logger = logging.getLogger(__name__)`
- Added `Request` parameter to `get_current_user`
- When `token is None`: reads raw `Authorization` header from the request
  - If header is present but unparseable → 401 "Malformed Authorization header: '<raw>'. Expected format: Authorization: Bearer <JWT_token>"
  - If header is completely absent → 401 "Authorization header missing. Add: Authorization: Bearer <token>"
- Both cases log a WARNING so the server console shows what happened

**No changes to** `chat.py`, `tasks.py`, `models/`, `schemas/` — the logic was already correct.

**Correct API usage:**
```
# Step 1: Login
POST /api/auth/login
Content-Type: application/json
{"email": "help123@gmail.com", "password": "Password1"}
→ {"id": "b179fcba-...", "token": "eyJ..."}

# Step 2: Call chat — user_id from login.id, JWT from login.token
POST /api/b179fcba-c3ef-4b85-a247-841b4fd98620/chat
Authorization: Bearer eyJ...
Content-Type: application/json
{"message": "Show my tasks"}
→ 200 {"response": "...", "conversation_id": "..."}
```

The server console will now show the exact failure reason if 401 persists.

## Outcome

- ✅ Impact: 401 failures are now fully diagnosable — both the API response and the server log explain the exact cause.
- 🧪 Tests: Manual validation across 4 scenarios (missing header, malformed header, invalid token, valid token).
- 📁 Files: backend/api/auth.py (+Request param, +split error paths), backend/services/auth_service.py (+logging, +split exceptions).
- 🔁 Next prompts: Check server log output when 401 occurs to identify the real root cause.
- 🧠 Reflection: Silent exception swallowing in auth code is a serious anti-pattern — it masks every failure mode and makes debugging impossible. Always log the specific exception in security-critical paths.

## Evaluation notes (flywheel)

- Failure modes observed: broad except clause masks JWTError type (ExpiredSignature vs InvalidSignature vs DecodeError); missing Request object prevents header diagnostics.
- Graders run and results (PASS/FAIL): Manual code review PASS
- Prompt variant (if applicable): null
- Next experiment: Add structured logging with correlation IDs to trace auth failures across request/response.
