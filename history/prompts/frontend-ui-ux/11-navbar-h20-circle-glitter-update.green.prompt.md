---
id: 11
title: Navbar H20 Circle Glitter Update
stage: green
date: 2026-02-13
surface: agent
model: claude-opus-4-6
feature: frontend-ui-ux
branch: main
user: Ali
command: /sp.implement
labels: ["navbar", "glitter", "logo-circle", "ui"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/landing/Hero.tsx
  - frontend/tailwind.config.ts
tests:
  - none
---

## Prompt

Update hero.tsx navbar:

1. Navbar:
- Fixed at top, full width, height 5rem (h-20)
- Background: dark blue glitter effect
- Completely static (do not move with hero background)

2. Logo:
- Circle shape
- Size: w-16 h-16
- Background: glitter light purple (animated subtle shine)
- Centered text inside circle: "X", white, bold, large
- No horizontal line, must be a circle

3. Logo text:
- Next to circle: "TodoAppX"
- Bold, white, text-xl
- Vertically aligned center with circle
- Left-aligned inside navbar, not centered

4. Sign In / Sign Up labels:
- Full Name, Email, Password, Confirm Password → text-white
- Keep font sizes consistent

5. Ensure spacing and alignment:
- Navbar tall enough to contain circle and text
- Circle and "TodoAppX" stay on left
- Navbar overlays hero background correctly

## Response snapshot

Updated Hero.tsx navbar to h-20 with dark blue glitter gradient background (animated via backgroundPosition keyframe at 6s). Enlarged logo circle to w-16 h-16 with light purple glitter gradient (3s animation). "X" centered in circle as text-2xl bold white. "TodoAppX" left-aligned next to circle. Spacer updated to h-20. Added navbar-glitter and logo-glitter keyframes to tailwind.config.ts. Auth form labels already had white text styling, no changes needed.

## Outcome

- ✅ Impact: Navbar now matches spec with h-20 height, large circle logo, and glitter animations
- 🧪 Tests: Visual verification required
- 📁 Files: Hero.tsx (navbar markup), tailwind.config.ts (keyframes/animations)
- 🔁 Next prompts: Verify visual appearance in browser
- 🧠 Reflection: Glitter effect achieved via background-size 200% + backgroundPosition animation

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A - visual change
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Adjust glitter speed if too fast/slow
