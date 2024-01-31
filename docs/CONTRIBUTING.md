# Workflow

1. Create new feature branch with the following format `name/feature` and push the new branch to remote (this repository):

```bash
git checkout -b bob/leaderboard-router
git push -u origin bob/leaderboard-router
```

2. Stage files & commit changes on your feature branch and push to repository (Note: [Husky](https://typicode.github.io/husky/) will automatically lint and format your code before commit):

```bash
git add .
git commit -m "feat: add leaderboard router"
git push
```

3. Open a pull request (PR). Add the `WIP` tag for work in progress PRs. Add `Resolves #<issue-number>` to the PR body ([learn more](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)). Add other tags as necessary.

4. See specific workflows:

   - [Frontend workflow](#frontend-workflow)
   - [Backend worflow](#backend-workflow)

5. See [Tips](./tips.md).

## Frontend Workflow

1. Check [shadcn/ui](https://ui.shadcn.com/docs/components/accordion) if the component is already in the shadcn/ui library.
2. Do not directly modify the base UI provided by shadcn/ui. Either create a new component that wraps the base UI or add variants to the base component.
3. Try not to use many arbitrary values. For colors, check if they have been included inside the tailwind config (GTD colors are included in the tailwind config, e.g., `bg-color-gtd-primary-30`).

## Backend Workflow

1. [Sign up](https://dashboard.stripe.com/register) for a Stripe account or [sign in](https://dashboard.stripe.com/login) to your Stripe account. If prompted to activate payments on sign in, close the popup.
2. Setup 2FA for your Stripe account and generate a restricted key.
3. [Setup Stripe CLI](https://stripe.com/docs/stripe-cli) for development.
4. Run the Stripe CLI to listen for events:

```bash
pnpm dev:stripe
```

5. Open [Prisma Studio](https://www.prisma.io/studio) to view database information & create new rows for development/testing purposes:

```bash
pnpm dev:db:studio
```

6. Create tRPC routers/controllers at `src/server/routers/<your-router>` and add them to the app router at `src/server/root.ts`.

## Style Guide

Optional but recommended:

- Use import aliases instead of relative paths for package imports, e.g. `import { Button } from "@/components/ui/button";`
- Git commits style guide: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Use TypeScript types instead of interfaces unless necessary ([_why?_](https://youtu.be/zM9UPcIyyhQ?si=TI7vrg4OZAOpBd1x))
- Use [`function` declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) for React components and event handlers
  - Learn more: [`function` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#hoisting) vs [`function` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) vs [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Learn More

- [Documentation](./README.md)
- Learning resources: [github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources](https://github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources)
- Learning articles:
  - [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)
  - [Server and Client Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- Official documentation: [Tailwind CSS](https://tailwindcss.com/docs/utility-first), [shadcn/ui](https://ui.shadcn.com/docs/cli), [Next.js](https://nextjs.org/docs), [tRPC](https://trpc.io/docs), [Zod](https://zod.dev/), [Prisma](https://www.prisma.io/docs/orm), [Supabase](https://supabase.com/docs)
