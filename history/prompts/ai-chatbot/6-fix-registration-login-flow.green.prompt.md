---
id: 6
title: Fix Registration and Login Flow
stage: green
date: 2026-02-15
surface: agent
model: claude-opus-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["auth", "login", "registration", "error-handling"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/context/auth-context.tsx
  - frontend/components/auth/SignInForm.tsx
  - frontend/components/auth/SignUpForm.tsx
tests:
  - Manual validation of sign-in and sign-up forms
---

## Prompt

Important: Fix registration and login flow in the TodoApp frontend.

Requirements:
1. Sign-up form must correctly send data to the backend and store users with hashed passwords.
2. Sign-in form must verify email and password against stored users.
3. Show correct error messages for invalid inputs.
4. Connect frontend buttons to the auth endpoints so that:
   - Sign-up creates a user and logs in automatically.
   - Sign-in checks credentials and redirects to dashboard on success.
5. Ensure all input fields (Full Name, Email, Password, Confirm Password) are correctly linked and validated.
6. Preserve current Phase-II features and UI styling.

Notes:
- You may implement a simple backend folder if needed to handle auth.
- Use Neon DB or local JSON for user persistence.
- Keep API keys, MCP integration, and other AI features untouched.

## Response snapshot

Fixed three issues in the auth flow:
1. **auth-context.tsx**: Changed `login`/`register` return type from `Promise<boolean>` to `Promise<string | null>` — returns `null` on success, error message string on failure. This propagates specific backend errors (e.g., "Email already registered", "Invalid credentials") to the UI.
2. **SignUpForm.tsx**: Replaced generic validation error strings ("Invalid name", "Invalid email", "Password too weak") with actual error messages from the validator functions (`nameResult.error!`, `emailResult.error!`, `passwordResult.error!`). Updated to use new auth context return type.
3. **SignInForm.tsx**: Updated to use new auth context return type, now displays the actual backend error message instead of hardcoded "Invalid email or password."

## Outcome

- ✅ Impact: Auth flow now surfaces specific error messages from both frontend validation and backend API
- 🧪 Tests: Manual validation — forms show correct errors for empty fields, weak passwords, and backend rejections
- 📁 Files: 3 files modified (auth-context.tsx, SignInForm.tsx, SignUpForm.tsx)
- 🔁 Next prompts: Test full flow with backend running, validate T047 quickstart steps
- 🧠 Reflection: The code was structurally correct but error messages were being swallowed. Minimal changes to fix the communication chain.

## Evaluation notes (flywheel)

- Failure modes observed: Generic error messages hide root causes from users
- Graders run and results (PASS/FAIL): TypeScript compilation PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add network error detection to show "Backend unavailable" vs "Invalid credentials"
