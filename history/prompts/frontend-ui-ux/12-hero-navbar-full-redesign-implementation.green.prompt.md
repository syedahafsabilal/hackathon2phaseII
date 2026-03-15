---
id: 12
title: Hero Navbar Full Redesign Implementation
stage: green
date: 2026-02-13
surface: agent
model: claude-opus-4-6
feature: frontend-ui-ux
branch: main
user: Ali
command: /sp.implement
labels: ["hero", "navbar", "redesign", "glitter", "ui"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/landing/Hero.tsx
tests:
  - none
---

## Prompt

You are a Senior Frontend Engineer.

Your task is to **fix and implement the Hero.tsx page** and navbar exactly as follows:

1. Navbar:
- Fixed at top, full width, tall (h-20)
- Dark blue glitter background (same as all buttons)
- Logo: a **perfect circle** in light purple with **white letter X** centered inside
- Next to logo, write "TodoAppX" in **white, bold text**
- Both logo and text **must be on the left side**, not centered
- Navbar **must stay still**, no motion
- Remove any black area above the navbar

2. Hero Section:
- Main heading: "Boost Your Productivity with Smart Task Management"
  - Font: large, bold, **white**
  - Centered horizontally
- Paragraph text below main heading:
  - "Our modern todo application helps you organize your tasks, focus on what matters, and achieve your goals with a beautifully designed, intuitive interface."
  - Font: smaller than heading, **white**
  - Centered horizontally
- Add a vertical gap (like one slide height) between heading and paragraph

3. Buttons:
- "Get Started Free" bu

## Response snapshot

Rewrote Hero.tsx with: (1) Fixed navbar h-20, dark blue gradient background, NO animation on navbar itself (animation: 'none'), explicit textAlign: 'left' to override global center. (2) Logo circle w-16 h-16 with light purple glitter gradient and animate-logo-glitter. (3) "TodoAppX" bold white text-xl left-aligned. (4) Hero heading text-4xl/text-6xl bold white centered. (5) 50vh vertical gap between heading and paragraph. (6) Paragraph text-lg/text-xl white centered. (7) Fixed broken "a\nnd" typo. (8) Get Started Free button with animate-glitter.

## Outcome

- ✅ Impact: Hero page fully redesigned per spec - navbar static, logo circle, white text, vertical gap
- 🧪 Tests: Visual verification required in browser
- 📁 Files: frontend/components/landing/Hero.tsx
- 🔁 Next prompts: Verify visual in browser, adjust gap size if needed
- 🧠 Reflection: Global CSS text-align:center required inline style overrides for navbar left alignment

## Evaluation notes (flywheel)

- Failure modes observed: Global CSS text-align:center conflicts with navbar left alignment
- Graders run and results (PASS/FAIL): N/A - visual change
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Adjust 50vh gap if too large/small
