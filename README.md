# GTD XXVI Website

## Table of Content

- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Setting Up](#setting-up)
  - [Additional Tools](#additional-tools)
    - [Prisma Studio](#prisma-studio)
    - [Stripe CLI](#stripe-cli)
    - [Brevo SMTP](#brevo-smtp)
- [Workflow](#workflow)
  - [Git & GitHub](#git--github)
  - [Style Guide](#style-guide)
  - [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
  - [Merge conflicts in `pnpm-lock.yaml`](#merge-conflicts-in-pnpm-lockyaml)
  - [Access the Dashboard](#access-the-dashboard)
  - [Error running development server or husky](#error-running-development-server-or-husky)
  - [Database errors](#database-errors)
  - [Save storage space](#save-storage-space)
- [Packages Usage](#packages-usage)
  - [tRPC](#trpc)
    - [In Server Components](#in-server-components)
    - [In Client Components](#in-client-components)
  - [Day.js](#dayjs)
  - [Sharp CLI](#sharp-cli)
- [Learn More](#learn-more)

## Project Setup

### Prerequisites

1. Install Node Version Manager (NVM). Installation: [macOS/Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), [Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview).
2. Install Node.js Iron (LTS):

```bash
# For macOS/Linux
nvm install --lts=iron
nvm use --lts=iron
```

```pwsh
# For Windows
nvm install lts
nvm use lts
```

3. Install pnpm using Corepack (or alternatively, [using npm](https://pnpm.io/installation#using-npm)):

```bash
corepack enable pnpm
```

4. Install Docker. Installation: [macOS](https://docs.docker.com/desktop/install/mac-install/), [Linux](https://docs.docker.com/desktop/install/linux-install/), [Windows](https://docs.docker.com/desktop/install/windows-install/).

### Setting Up

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` contents to `.env.development.local` and fill the environment variables (instructions inside file):

```bash
# For macOS/Linux
cp .env.example .env.development.local
```

```pwsh
# For Windows
copy .env.example .env.development.local
```

3. Start the development database:

```bash
pnpm dev:db:start
```

4. Initialize the development database with sample data:

```bash
pnpm dev:db:reset
```

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional Tools

#### Prisma Studio

See development database contents:

```bash
pnpm dev:db:studio
```

#### Stripe CLI

Listen for Stripe events and trigger webhooks in development environment:

1. [Sign up](https://dashboard.stripe.com/register) for a Stripe account or [sign in](https://dashboard.stripe.com/login) to your Stripe account. No need to activate payments.
2. Add your API secret key and publishable key to `.env.development.local`.
3. Setup 2FA for your Stripe account and generate a restricted key.
4. [Setup Stripe CLI](https://stripe.com/docs/stripe-cli) for development.
5. Run the Stripe CLI:

```bash
pnpm dev:stripe
```

#### Brevo SMTP

Send emails:

1. [Sign up](https://onboarding.brevo.com/account/register) for a Brevo account.
2. Go [here](https://app.brevo.com/settings/keys/api) to create an API key and add it to `.env.development.local`.

## Workflow

### Git & GitHub

1. Create new feature branch with the following format `name/feature` and push the new branch to remote (this repository):

```bash
git checkout -b bob/leaderboard-router
git push -u origin bob/leaderboard-router
```

2. Stage changes, commit on your feature branch, and push to remote (note: do not commit on `main` branch):

```bash
git add .
git commit -m "feat: add leaderboard router"
git push
```

### Style Guide

- Use kebab case to name files, e.g., `leaderboard-router.ts`
- Use kebab case + full component name for component files, e.g., `button-group-card.tsx` for `<ButtonGroupCard />`
- Use import aliases instead of relative paths for package imports, e.g. `import { Button } from "@/components/ui/button";`
- Git commits style guide: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Use TypeScript types instead of interfaces unless necessary ([_why?_](https://youtu.be/zM9UPcIyyhQ?si=TI7vrg4OZAOpBd1x))
- Use [`function` declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) for React components and event handlers
  - Learn more: [`function` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#hoisting) vs [`function` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) vs [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### Project Structure

| Path                     | Import Alias      | Usage                                                        |
| ------------------------ | ----------------- | ------------------------------------------------------------ |
| `src/app`                | `@/app`           | Next.js App Router                                           |
| `src/app/_components`    | `@/components`    | App-wide components                                          |
| `src/app/_components/ui` | `@/components/ui` | Components scaffolded by [shadcn/ui](https://ui.shadcn.com/) |
| `src/lib`                | `@/lib`           | Library/package-related files                                |
| `src/server`             | `@/server`        | Server-related files                                         |
| `src/assets`             | `@/assets`        | App-wide assets                                              |
| `public`                 | `~/public`        | Public assets                                                |
| `emails`                 | `~/emails`        | [React Email](https://react.email/) templates                |

## Troubleshooting

### Merge conflicts in `pnpm-lock.yaml`

1. pnpm can automatically resolve lockfile conflicts. Run:

```bash
pnpm install
```

2. Stage and commit the lockfile:

```bash
git add pnpm-lock.yaml
git commit -m "chore: resolve lockfile conflict"
```

### Access the Dashboard

1. Sign up for a user at `/dashboard/signup`.
2. Open [Prisma Studio](https://www.prisma.io/studio):

```bash
pnpm dev:db:studio
```

3. Open the User Model:
   ![Prisma Studio UI](docs/assets/Screenshot%202024-01-19%20at%2000.42.28.png)

4. Change the user's role to `ADMIN`:
   ![Prisma Studio UI](docs/assets/Screenshot%202024-01-19%20at%2000.45.53.png)

5. Save changes in Prisma Studio.
6. Log in as the user at `/dashboard/login`. You should be able to access the dashboard now.

### Error running development server or husky

1. Remove the `.next` folder:

```bash
rm -rf .next
```

2. Retry.

### Database errors

1. Reset the development database by first removing the image:

```bash
docker image rm -f gtd-xxvi/db-dev
```

2. Remove the volume where the development database data is stored:

```bash
docker volume rm gtd-xxvi-db-pgdata-dev
```

3. Restart the development database:

```bash
pnpm dev:db:start
```

### Save storage space

1. Remove unused packages:

```bash
pnpm prune
```

2. Remove unused and dangling Docker containers and images:

```bash
docker system prune
```

## Packages Usage

### tRPC

#### In Server Components

Use the tRPC client `api` defined in `src/trpc/server`. Example:

```tsx
// example-page.tsx
import { api } from "@/server/trpc";

export default async function ExamplePage() {
  const event = await api.event.getById(1);
  return <main>{event?.name}</main>;
}
```

#### In Client Components

Use the tRPC client `api` defined in `src/trpc/client`. Example:

```tsx
// example-page.tsx
"use client";

import { api } from "@/lib/trpc/provider";

export default function ExamplePage() {
  const { data: event } = api.event.getById.useQuery(1);
  return <main>{event?.name}</main>;
}
```

### Day.js

Do:

- Use Day.js to parse, find difference, format, etc. `Date` to `String`

Don't:

- Use Day.js as prop/state. Use `Date` instead (`dayjs().toDate()`)

### Sharp CLI

Compress one image into `.webp`:

```bash
pnpm dlx sharp-cli -f webp --effort 6 -q 75 -i large-image.jpg -o {dir}
```

Compress all images in the current working directory into `.webp`:

```bash
pnpm dlx sharp-cli -f webp --effort 6 -q 75 -i ./* -o {dir}
```

More info: [Sharp CLI documentation](https://github.com/vseventer/sharp-cli)

## Learn More

- Learning resources: [github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources](https://github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources)
- Learning articles:
  - [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)
  - [Server and Client Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- Official documentation: [Tailwind CSS](https://tailwindcss.com/docs/utility-first), [shadcn/ui](https://ui.shadcn.com/docs/cli), [Next.js](https://nextjs.org/docs), [tRPC](https://trpc.io/docs), [Zod](https://zod.dev/), [Prisma](https://www.prisma.io/docs/orm)
