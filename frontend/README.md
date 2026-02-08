# Todo Application Frontend

This is the frontend for the Todo Application Phase II, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, professional UI with clean design
- Responsive layout for all device sizes
- Authentication flow (Sign In/Sign Up)
- Task management dashboard
- Add, edit, delete, and mark tasks as complete
- Form validation and error handling
- Accessible design following WCAG standards

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Headless UI

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/       # Protected dashboard
│   ├── tasks/           # Task management
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # Reusable UI components
│   ├── ui/              # Base components (Button, Input, Modal, Card)
│   ├── auth/            # Authentication-specific components
│   ├── tasks/           # Task management components
│   └── layout/          # Layout components
├── lib/                 # Utilities and shared functions
│   ├── utils.ts         # Helper functions
│   ├── validations.ts   # Form validations
│   └── types.ts         # TypeScript type definitions
└── public/              # Static assets
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)