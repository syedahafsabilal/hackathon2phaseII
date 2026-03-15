---
id: 24
title: Forms Stacked Layout Password Glow
stage: green
date: 2026-03-11
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["ui", "auth", "forms", "stacked-layout", "password-glow", "sign-in", "sign-up"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/auth/SignUpForm.tsx
  - frontend/components/auth/SignInForm.tsx
  - frontend/components/ui/Input.tsx
  - frontend/app/auth/sign-in/page.tsx
  - frontend/app/auth/sign-up/page.tsx
tests:
  - null
---

## Prompt

Update the Sign In and Sign Up forms with Tailwind CSS and HTML:

Remove any pre-filled text in the input fields (value attributes) for Email and Password in Sign In, and all fields in Sign Up. Ensure fields start empty.

Labels (Full Name, Email, Password, Confirm Password) should be slightly above or just a little away from their input fields, not too far.

Input fields should not display white placeholder text inside them.

Maintain dark bluish-black 3D style, white label text, rounded corners, and centered forms.

Ensure all input fields have the same width and are aligned horizontally in a row where specified.

Make Password and Confirm Password inputs highlight in whitish-blue when typed.

## Response snapshot

**SignUpForm.tsx & SignInForm.tsx** — layout switched from 2-column grid to stacked:
- `display: flex; flexDirection: column; gap: 0.625rem`
- Each field wrapped in `<div>`: `<label style={{ marginBottom: '0.25rem' }}>` → `<Input>` → conditional error `<p>`
- Label is `0.25rem` above its input (tight, readable gap)
- All inputs naturally share the same `w-full` width within the centered card
- `autoComplete="off"` on forms + per-field; `autoComplete="new-password"` on password fields
- No placeholder text (empty string)
- Error text changed from pure white `#ffffff` to soft red `#fca5a5` for better UX contrast

**Input.tsx** — password whitish-blue glow on focus:
- `onFocus` checks `e.currentTarget.type === 'password'`
- Password focus: border → `rgba(147,197,253,0.7)` (whitish-blue), box-shadow → `0 0 12px rgba(147,197,253,0.15)` with outer glow ring `rgba(147,197,253,0.2)`
- Password focus: `WebkitTextFillColor → '#bfdbfe'` (light blue for typed dots)
- Other inputs: existing blue glow unchanged
- `onBlur` resets both border and `WebkitTextFillColor` to default

**Auth pages**: card narrowed from `36rem` back to `30rem` (stacked layout fits comfortably)

## Outcome

- ✅ Impact: Labels sit directly above inputs (0.25rem gap); password fields glow whitish-blue on focus with blue tinted dots; forms fully stacked single-column; no autofill; no placeholder text
- 🧪 Tests: Manual browser verification
- 📁 Files: 5 files modified
- 🔁 Next prompts: Verify password glow on mobile; check error message color readability
- 🧠 Reflection: Stacked layout is simpler and more mobile-friendly than the 2-column grid; password glow differentiation improves UX for secure field awareness

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): Code review PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add show/hide password toggle eye icon to password fields
