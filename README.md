# GTD XXVI Website

## Tech Stack

- Meta-framework: **Next.js v14**
- Frontend:
  - UI library: **React v18.2**
  - Styling: **Tailwind CSS v3.3** & shadcn/ui
  - State management: zustand v4.4
  - Asynchronous state management: TanStack Query v4
- Backend:
  - Route Handling: **Next.js v14**
  - API: tRPC v10
  - ORM: Prsima v5.7
  - Database: Supabase Postgres database
  - Payment: Stripe SAAS Supabase integration
- Miscellaneous:
  - Schema validation: Zod v3.22

## Getting Started
1. Install Node.js directly ([LTS](https://nodejs.org/en/download/) or [Current](https://nodejs.org/en/download/current)) or use Node version manager ([`nvm` for macOS and Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating); [`nvm` for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)) to install Node.js.
2. Optional: install [`pnpm` using Corepack](https://pnpm.io/installation#using-corepack).
3. Install dependencies:

```bash
npm install
# or
pnpm install
```

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
6. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Style Guide

Optional but recommended:
- Git commits style guide: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Use TypeScript types instead of interfaces unless necessary ([*why?*](https://youtu.be/zM9UPcIyyhQ?si=TI7vrg4OZAOpBd1x))
- Use [`function` declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) for React components and event handlers 
  - Learn more: [`function` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#hoisting) vs [`function` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) vs [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Learn More

Learning resources: [github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources](https://github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources)

Official documentation: [Tailwind CSS](https://tailwindcss.com/docs/utility-first), [shadcn/ui](https://ui.shadcn.com/docs/cli), [Next.js](https://nextjs.org/docs), [tRPC](https://trpc.io/docs), [Zod](https://zod.dev/), [Prisma](https://www.prisma.io/docs/orm), [Supabase](https://supabase.com/docs)