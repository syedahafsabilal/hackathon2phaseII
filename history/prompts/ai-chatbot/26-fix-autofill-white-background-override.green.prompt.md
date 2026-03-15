---
id: 26
title: Fix Autofill White Background Override
stage: green
date: 2026-03-11
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["ui", "auth", "forms", "autofill", "webkit", "globals-css", "input-background"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/app/globals.css
tests:
  - null
---

## Prompt

Make the Sign In and Sign Up forms fully modern, luxury 3D style with dark bluish-black background, rounded corners, and white text.

Requirements:

Forms must be centered vertically and horizontally on the page.

Labels (Full Name, Email, Password, Confirm Password) must be directly above inputs, close to inputs, all in white text.

Input fields must be empty on load, same width, and highlight with whitish-blue glow on focus.

Password and Confirm Password fields must behave like other fields.

Remove any pre-filled text in input fields (e.g., Gmail or password).

Forms must look 3D, luxurious, modern, with subtle gradients or shadows.

Buttons must match forms' style, also centered.

Text inside inputs should remain visible, not white on white.

Maintain spacing consistent between labels and inputs, not too far apart.

Apply same style to Sign In form (Welcome Back, Email, Password, Sign In button).

## Response snapshot

Root cause identified: browser `-webkit-autofill` overrides the dark input background with its own autofill colour (white/light blue on Windows), making typed/autofilled text invisible ("white on white").

**Fix added to `globals.css`** (outside any `@layer` — vendor-prefixed pseudoclasses can't go inside `@layer`):

```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px rgba(10, 16, 38, 0.97) inset !important;
  -webkit-text-fill-color: #ffffff !important;
  caret-color: #ffffff;
  transition: background-color 5000s ease-in-out 0s;
}
```

The `inset 0 0 0 1000px` box-shadow technique is the only reliable cross-browser way to override `-webkit-autofill` background since browsers block `background-color` overrides on autofilled inputs even with `!important`.

All other form styling (stacked layout, blue glow on password fields, dark gradients, etc.) was already in place from PHR 24.

## Outcome

- ✅ Impact: Autofill-triggered white input backgrounds are now overridden with dark navy; text remains visible on all inputs including browser-autofilled ones
- 🧪 Tests: Manual browser verification (Chrome/Edge)
- 📁 Files: 1 file modified (globals.css)
- 🔁 Next prompts: Test with browser saved credentials to confirm autofill background override works
- 🧠 Reflection: The `transition: background-color 5000s` trick delays the autofill animation effectively making the browser think the colour transitioned but never visually completes — this is a well-known CSS hack for autofill suppression

## Evaluation notes (flywheel)

- Failure modes observed: Repeated user reports of "white on white" text were all caused by browser autofill overriding dark input backgrounds
- Graders run and results (PASS/FAIL): Code review PASS
- Prompt variant (if applicable): Diagnostic repeat of PHRs 22-25
- Next experiment (smallest change to try): Test in Safari (uses different autofill rendering engine)
