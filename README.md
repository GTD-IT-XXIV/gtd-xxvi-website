# GTD XXVI Website

## Getting Started

1. Install Node.js directly ([LTS](https://nodejs.org/en/download/) or [Current](https://nodejs.org/en/download/current)) or use Node version manager ([`nvm` for macOS and Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating); [`nvm` for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)) to install Node.js.
2. Install [`pnpm` using Corepack](https://pnpm.io/installation#using-corepack).
3. Install dependencies:

```bash
pnpm install
```

4. Copy `.env.example` contents to `.env.development.local` and modify the environment variables.
5. Change the `DATABASE_URL` environment variable or start the development database in a [Docker](https://docs.docker.com/desktop/) container:

```bash
pnpm dev:db:start
```

6. If the development database is started for the first time, initialize it:

```bash
pnpm dev:db:init
```

7. You can clear the development database by running `pnpm dev:db:clear`.
8. You can reset the development database by running `pnpm dev:db:reset`.
9. Run the development server:

```bash
pnpm dev
```

10. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
11. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Workflow

1. Create new feature branch with the following format `name/feature` and push the new branch to remote (this repository):

```bash
git checkout -b bob/leaderboard-router
git push -u origin bob/leaderboard-router
```

2. Commit on your feature branch and push to repository (Note: [Husky](https://typicode.github.io/husky/) will automatically lint and format your code before commit).

```bash
git add .
git commit -m "feat: add leaderboard router"
git push
```

3. Open a pull request (PR). Add the `DO NOT MERGE` tag for work in progress PRs. Add `Resolves #<issue-number>` to the PR body ([learn more](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)). Add other tags as necessary.
4. See specific workflows:
   - [Frontend workflow](#frontend-workflow-construction)
   - [Backend worflow](#backend-workflow)

### Frontend Workflow :construction:

### Backend Workflow

1. Open [Prisma Studio](https://www.prisma.io/studio) to view database information & create new rows for development/testing purposes:

```bash
pnpm dev:prisma:studio
```

2. Create tRPC routers/controllers at `src/server/controllers/<your-router>` and add them to the app router at `src/server/root.ts`.

## Style Guide

Optional but recommended:

- Git commits style guide: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Use TypeScript types instead of interfaces unless necessary ([_why?_](https://youtu.be/zM9UPcIyyhQ?si=TI7vrg4OZAOpBd1x))
- Use [`function` declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) for React components and event handlers
  - Learn more: [`function` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#hoisting) vs [`function` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) vs [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Learn More

- [This repository's documentation](docs/README.md)
- Learning resources: [github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources](https://github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources)
- Official documentation: [Tailwind CSS](https://tailwindcss.com/docs/utility-first), [shadcn/ui](https://ui.shadcn.com/docs/cli), [Next.js](https://nextjs.org/docs), [tRPC](https://trpc.io/docs), [Zod](https://zod.dev/), [Prisma](https://www.prisma.io/docs/orm), [Supabase](https://supabase.com/docs)
