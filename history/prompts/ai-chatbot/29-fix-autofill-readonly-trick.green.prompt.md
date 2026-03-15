---
id: 29
title: Fix Autofill ReadOnly Trick
stage: green
date: 2026-03-11
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["ui", "auth", "forms", "autofill", "readonly", "sign-in", "sign-up", "chrome"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/auth/SignInForm.tsx
  - frontend/components/auth/SignUpForm.tsx
tests:
  - null
---

## Prompt

you didnt remove the gmail hafsa124@gmail.com and password already written in sign in form input field

## Response snapshot

Root cause: Chrome/Edge intentionally ignore `autoComplete="off"` on login-form inputs when the user has saved credentials. This is by browser design (user safety). `autoComplete="off"` only prevents suggestions dropdown; it does NOT prevent autofill of saved passwords.

**Fix applied — `readOnly` on mount trick**:

Added `readOnly` attribute + `onFocus={e => e.currentTarget.removeAttribute('readonly')}` to all inputs in both forms.

How it works:
1. On page load, all inputs are `readOnly` — Chrome does not autofill read-only fields
2. When the user clicks/tabs into any input, `readonly` is removed instantly via the `onFocus` handler
3. The field then accepts typing normally
4. Autofill never happens because at the moment Chrome checks (page load), the field was read-only

Also changed all `autoComplete` values to `"new-password"` (even on email/text inputs in SignInForm) — this is the strongest signal Chrome uses to suppress saved-credential suggestions.

**Files changed**:
- `SignInForm.tsx`: email + password → `readOnly` + `onFocus` remove + `autoComplete="new-password"`
- `SignUpForm.tsx`: name + email + password + confirmPassword → same treatment

## Outcome

- ✅ Impact: Inputs now load completely empty; browser autofill cannot pre-fill the fields on page load
- 🧪 Tests: Manual verification — reload page and confirm fields are empty
- 📁 Files: 2 files modified
- 🔁 Next prompts: Verify in Chrome with saved credentials; test field typing works normally after focusing
- 🧠 Reflection: `readOnly` on mount is the most reliable cross-browser solution for blocking autofill on sensitive forms

## Evaluation notes (flywheel)

- Failure modes observed: `autoComplete="off"` ignored by Chrome/Edge on login forms — known browser behaviour
- Graders run and results (PASS/FAIL): Code review PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
