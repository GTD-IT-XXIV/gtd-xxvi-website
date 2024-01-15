# Workflow

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
4. If you need reference/example code, checkout the v0.1.0 tag:
```bash
git checkout v0.1.0
```
5. See specific workflows:
   - [Frontend workflow](#frontend-workflow-construction)
   - [Backend worflow](#backend-workflow)

## Frontend Workflow

1. Check [shadcn/ui](https://ui.shadcn.com/docs/components/accordion) if the component is already in the shadcn/ui library.
2. Do not directly modify the base UI provided by shadcn/ui. Either create a new component that wraps the base UI instead or add variants to the base component as necessary.
3. Try not to use many arbitrary values. For colors, check if they have been included inside the tailwind config (GTD colors are included in the tailwind config, e.g., `bg-color-gtd-primary-30`)

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

6. Create tRPC routers/controllers at `src/server/controllers/<your-router>` and add them to the app router at `src/server/root.ts`.

## Style Guide

Optional but recommended:

- Git commits style guide: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Use TypeScript types instead of interfaces unless necessary ([_why?_](https://youtu.be/zM9UPcIyyhQ?si=TI7vrg4OZAOpBd1x))
- Use [`function` declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) for React components and event handlers
  - Learn more: [`function` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#hoisting) vs [`function` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) vs [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
