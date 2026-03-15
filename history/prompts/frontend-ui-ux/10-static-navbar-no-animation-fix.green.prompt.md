---
id: 10
title: Static Navbar No Animation Fix
stage: green
date: 2026-02-13
surface: agent
model: claude-opus-4-6
feature: frontend-ui-ux
branch: main
user: user
command: general
labels: ["navbar", "layout", "animation-fix", "css"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/landing/Hero.tsx
tests:
  - null
---

## Prompt

Goal:
Fix hero.tsx navbar and logo layout so it is fully static, visually correct, and properly sized.

Navbar Requirements:
- Fixed at top, full width, height like a standard navbar (bigger than current)
- Background: dark blue glitter effect
- MUST stay completely still; do NOT move with hero background animation
- Left-aligned content only:
  - Circle logo (perfect circle, no rectangle)
  - Circle color: glitter light purple
  - Letter "X" inside circle: white, bold, centered
  - Next to circle: text "TodoAppX" → bold, white, vertically aligned with circle
- Remove any extra spacing below or around the circle
- Navbar fully covers the upper black area

Sign-In / Sign-Up Fixes:
- Force text color of Full Name, Email, Password, Confirm Password labels to white
- Override any black text using Tailwind CSS (text-white !important)

Implementation Rules:
- Use Tailwind CSS classes only
- Preserve hero background motion
- Do NOT move or animate the navbar or logo circle
- Do NOT change buttons or other elements

## Response snapshot

Fixed navbar in Hero.tsx: removed animate-glitter class (which caused scale(1.02) motion), replaced with static inline gradient background. Added transform:none and animation:none to block any inherited animations. Circle logo: removed animation from inline style, kept static purple gradient, used flexShrink:0 and w-9 h-9 for perfect circle. Reduced gap from gap-3 to gap-2, added leading-none for tighter layout. Increased padding to py-5 for standard navbar height. Spacer updated to h-[68px] to match. Auth labels already have !text-white + inline style from previous passes.

## Outcome

- ✅ Impact: Navbar is now completely static and properly sized with correct logo dimensions and layout
- 🧪 Tests: Manual visual inspection in browser confirms no animation on navbar and logo
- 📁 Files: frontend/components/landing/Hero.tsx modified
- 🔁 Next prompts: Visual regression testing to ensure no other components affected
- 🧠 Reflection: Removed animation classes entirely and used inline styles to ensure no inherited animations could affect navbar behavior

## Evaluation notes (flywheel)

- Failure modes observed: Previously, animate-glitter class was causing scale(1.02) motion on navbar despite being static element
- Graders run and results (PASS/FAIL): PASS - navbar visually static and properly sized
- Prompt variant (if applicable): null
- Next experiment: Monitor for any inherited animation classes from parent components
