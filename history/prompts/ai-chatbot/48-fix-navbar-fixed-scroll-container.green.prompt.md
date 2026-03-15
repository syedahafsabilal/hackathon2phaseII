---
id: 48
title: Fix Navbar Fixed Position Scroll Container
stage: green
date: 2026-03-12
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: sp.implement
labels: ["ui","navbar","scroll","fix","position-fixed"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/app/page.tsx
tests:
  - none
---

## Prompt

make the navbar in home page work even when scrolling

## Response snapshot

Root cause: The navbar (`position: fixed`) was nested inside an `overflow-y: auto` scroll container (`height: 100vh`). In some browsers (Safari/WebKit), `position: fixed` inside an overflow ancestor can fail to stay fixed relative to the viewport — it scrolls away with the content.

Fix: Moved the navbar outside the scrollable `<div>` by wrapping the return in a React fragment (`<>...</>`). The navbar is now a sibling of the scroll container, so `position: fixed` reliably pins it to the viewport regardless of scroll.

Structure before:
```
<div overflowY:auto height:100vh>
  <section>  ← slide 1
    <nav position:fixed>  ← WRONG: inside overflow ancestor
```

Structure after:
```
<>
  <nav position:fixed>  ← CORRECT: outside overflow container
  <div overflowY:auto height:100vh>
    <section>  ← slide 1
```

## Outcome

- ✅ Impact: Navbar now stays visible at the top of the viewport while scrolling through all 3 slides on the home page
- 🧪 Tests: none — visual fix
- 📁 Files: frontend/app/page.tsx
- 🔁 Next prompts: none
- 🧠 Reflection: Always place `position: fixed` elements outside overflow scroll containers to guarantee viewport-relative positioning in all browsers

## Evaluation notes (flywheel)

- Failure modes observed: position:fixed inside overflow:auto ancestor loses fixed behaviour in some browsers
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
