---
id: 1003
title: Fix Expired Token Auto Logout
stage: general
date: 2026-03-14
surface: agent
model: claude-sonnet-4-6
feature: none
branch: 002-ai-chatbot
user: Ali
command: fix invalid or expired token error
labels: ["auth", "token", "logout", "task-context"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/context/task-context.tsx
tests:
  - none
---

## Prompt

this it says error invalid or expired token. Login again at POST /api/auth/login.
lib\api.ts (103:11) @ getTasks

  101 |   if (!res.ok) {
  102 |     const err = await res.json();
> 103 |     throw new Error(err.detail || 'Failed to load tasks');
      |           ^
  104 |   }
  105 |   return res.json();
  106 | }
Call Stack
getTasks lib\api.ts (103:11)
async fetchTasks context\task-context.tsx (37:20)

## Response snapshot

Root cause: The task context was catching the "Invalid or expired token" error but only logging it to the console. It never cleared the stale session or redirected the user.

Fix applied to `task-context.tsx`:
- Added `useRouter` from `next/navigation`
- Added `logout` from `useAuth()`
- In every catch block (fetchTasks, addTask, updateTask, deleteTask, toggleTaskCompletion): detect auth errors by checking if the error message contains "token", "login again", or "unauthorized", then call `logout()` and redirect to `/auth/sign-in`

## Outcome

- ✅ Impact: When an expired token is detected on any API call, the user is automatically logged out and redirected to the sign-in page instead of showing a crash error.
- 🧪 Tests: none
- 📁 Files: frontend/context/task-context.tsx
- 🔁 Next prompts: none
- 🧠 Reflection: The backend JWT token expiry needs to be handled gracefully on the frontend by detecting 401/auth errors and cleaning up the session.

## Evaluation notes (flywheel)

- Failure modes observed: stale token causing unhandled error overlay
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): centralize auth error handling in api.ts with a 401 interceptor
