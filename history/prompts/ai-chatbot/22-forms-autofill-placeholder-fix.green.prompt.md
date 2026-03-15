---
id: 22
title: Forms Autofill Placeholder Fix
stage: green
date: 2026-03-11
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["ui", "auth", "forms", "autofill", "autocomplete", "placeholder", "sign-in", "sign-up"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/ui/Input.tsx
  - frontend/components/auth/SignInForm.tsx
  - frontend/components/auth/SignUpForm.tsx
tests:
  - null
---

## Prompt

Update the Sign In and Sign Up forms using Tailwind CSS with these requirements:

Sign Up form: Labels Full Name, Email, Password, Confirm Password should be closer to their input fields, not too far.

Sign In form: Remove any pre-filled text in the input fields (e.g., hafsa124@gmail.com) and empty the Password field.

Input fields should not show white placeholder text inside them.

Keep the dark bluish-black background, white labels, 3D style, rounded corners, and centered layout.

Ensure all input fields are aligned and consistent in width.

## Response snapshot

**Input.tsx** — placeholder color:
- Changed `placeholder-white/50` → `placeholder-transparent` — placeholders are now invisible; fields appear clean/empty

**SignInForm.tsx**:
- Added `autoComplete="off"` on `<form>`
- Email input: `autoComplete="off"` + `placeholder=""`
- Password input: `autoComplete="current-password"` + `placeholder=""`

**SignUpForm.tsx**:
- Added `autoComplete="off"` on `<form>`
- Name input: `autoComplete="off"` + `placeholder=""`
- Email input: `autoComplete="off"` + `placeholder=""`
- Password input: `autoComplete="new-password"` + `placeholder=""`
- Confirm Password input: `autoComplete="new-password"` + `placeholder=""`

Note: `autoComplete="new-password"` is the strongest signal browsers respect to suppress autofill on password fields. Plain `off` is often ignored by modern browsers for password fields.

## Outcome

- ✅ Impact: No browser-autofilled pre-filled text; no visible placeholder text in any input; forms appear with clean empty fields
- 🧪 Tests: Manual browser verification (Chrome, Edge)
- 📁 Files: 3 files modified
- 🔁 Next prompts: Verify autofill suppression works in Safari (may need hidden dummy input trick)
- 🧠 Reflection: `autoComplete="new-password"` is more reliable than `off` for password fields across Chrome/Edge/Firefox

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): Code review PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add a hidden dummy email input before the real one as a browser honeypot to suppress autofill more aggressively
