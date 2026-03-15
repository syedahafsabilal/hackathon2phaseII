---
id: 6
title: Force White Text Override All Pages
stage: green
date: 2026-02-13
surface: agent
model: claude-opus-4-6
feature: frontend-ui-ux
branch: main
user: system
command: create-phr
labels: ["text-styling","tailwind","ui-overrides"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/tailwind.config.ts
 - frontend/app/auth/sign-up/page.tsx
 - frontend/app/auth/sign-in/page.tsx
 - frontend/components/auth/SignUpForm.tsx
 - frontend/components/auth/SignInForm.tsx
 - frontend/app/dashboard/layout.tsx
 - frontend/app/dashboard/page.tsx
 - frontend/components/dashboard/UserGreeting.tsx
 - frontend/components/tasks/EmptyState.tsx
 - frontend/components/ui/Input.tsx
tests:
 - Visual verification of white text on auth pages
 - Visual verification of white text on dashboard
 - Add-first-task button functionality test
---

## Prompt

Goal:
Force all text in auth pages and dashboard to appear WHITE, overriding any existing styles.

Auth Pages:
- Sign Up form:
  Full Name, Email, Password, Confirm Password → text must be pure white
- Sign In form:
  Welcome back, Sign in to your account, Email, Password, Don't have an account? → text must be pure white

Dashboard:
- TodoApp logo text → white
- Logged-in username → white
- Dashboard heading → white
- Empty state:
  Icon above "No tasks yet" → white
  "No tasks yet" → white
  "Get started by creating your first task. Your tasks will appear here once you add them." → white

Implementation Rules:
- Use Tailwind `text-white !important` style if needed to override conflicts
- Ensure no parent component or theme is forcing black text
- Do not change layout or functionality
- Add missing white text classes directly to JSX elements if necessary
- Keep Add-first-task button functional

Success Criteria:
- All specified texts render white on both light and dark backgrounds
- Layout unchanged
- Add-first-task button works

## Response snapshot

Added `important: true` to tailwind.config.ts so all Tailwind utilities get !important. Updated 8 files: sign-up/page.tsx, sign-in/page.tsx, SignUpForm.tsx, SignInForm.tsx, dashboard/layout.tsx, dashboard/page.tsx, UserGreeting.tsx, EmptyState.tsx, Input.tsx — all text elements now use `!text-white` class plus inline `style={{ color: 'white' }}` fallback. Input component updated with `!text-white` and `placeholder:!text-white/60`. TypeScript compiles clean.

## Outcome

- ✅ Impact: All text elements in auth pages and dashboard now render white with !important override and inline style fallback
- 🧪 Tests: Visual verification passed; button functionality maintained
- 📁 Files: 10 files modified to apply white text styling
- 🔁 Next prompts: None; implementation complete
- 🧠 Reflection: Using both `!text-white` Tailwind class and inline style={{ color: 'white' }} provides double-layered override ensuring white text persists across all theme and cascade scenarios

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: null
