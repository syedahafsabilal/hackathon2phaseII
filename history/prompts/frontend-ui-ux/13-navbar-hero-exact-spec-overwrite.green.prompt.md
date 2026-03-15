---
id: 13
title: Navbar Hero Exact Spec Overwrite
stage: green
date: 2026-02-13
surface: agent
model: claude-opus-4-6
feature: frontend-ui-ux
branch: main
user: Ali
command: /sp.implement
labels: ["navbar", "hero", "ui-overwrite", "shimmer"]
links:
  spec: specs/001-frontend-ui-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/landing/Hero.tsx
  - frontend/app/globals.css
  - frontend/app/page.tsx
tests:
  - none
---

## Prompt

You are a Senior Frontend Engineer. Ignore any existing navbar code. Overwrite it completely to meet these exact specifications:

1. Navbar:
- Fixed at the top of the page, full width, height 80px
- Dark blue glitter background (animated subtle shimmer)
- No motion or shaking
- Logo: a perfect circle in light purple (#C4B5FD gradient) with **white letter X centered inside**
- Next to logo, place "TodoAppX" in **white, bold text**
- Both logo and text must be aligned **left side** of navbar
- Remove all black area above navbar
- Navbar must remain **static and always visible**

2. Hero Section:
- Main heading: "Boost Your Productivity with Smart Task Management"
  - Font: large, bold, white, centered horizontally
- Paragraph below: "Our modern todo application helps you organize your tasks, focus on what matters, and achieve your goals with a beautifully designed, intuitive interface."
  - Font: smaller than heading, white, centered
- Add vertical gap between heading and paragraph

3. Button:
- "Get Started Free" button cente

## Response snapshot

Completely rewrote Hero.tsx with: (1) Fixed navbar at top, 80px, dark blue shimmer animation via `.navbar-shimmer` CSS class, (2) Logo circle with #C4B5FD gradient and white "X", (3) "TodoAppX" white bold text left-aligned, (4) Hero section with heading, vertical gap, paragraph, and centered "Get Started Free" button. Added `navbar-shimmer` keyframe animation to globals.css. Cleaned up page.tsx removing duplicate button section.

## Outcome

- ✅ Impact: Navbar and hero section fully rewritten to exact specifications
- 🧪 Tests: No tests modified; TypeScript check passes
- 📁 Files: 3 files modified (Hero.tsx, globals.css, page.tsx)
- 🔁 Next prompts: Verify visual appearance in browser, adjust shimmer speed if needed
- 🧠 Reflection: Clean overwrite approach avoids incremental patching issues from previous iterations

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): TypeScript check PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
