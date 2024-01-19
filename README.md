# GTD XXVI Website

## Getting Started

1. Install Node.js directly ([LTS](https://nodejs.org/en/download/) or [Current](https://nodejs.org/en/download/current)) or use Node version manager ([`nvm` for macOS and Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating); [`nvm` for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)) to install Node.js.
2. Install [`pnpm` using Corepack](https://pnpm.io/installation#using-corepack).
3. Install dependencies:

```bash
pnpm install
```

4. Copy `.env.example` contents to `.env.development.local` and fill in the environment variables.
5. Start the development database (requires [Docker](https://docs.docker.com/desktop/)):

```bash
pnpm dev:db:start
```

6. Initialize the development database with sample data:

```bash
pnpm dev:db:init
```

7. Run the development server:

```bash
pnpm dev
```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
9. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
10. See [Workflow](docs/CONTRIBUTING.md) to contribute.

## Learn More

- [Documentation](docs/README.md)
- Learning resources: [github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources](https://github.com/GTD-IT-XXIV/gtd-xxvi-learning-resources)
- Learning articles:
  - [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)
  - [Server and Client Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- Official documentation: [Tailwind CSS](https://tailwindcss.com/docs/utility-first), [shadcn/ui](https://ui.shadcn.com/docs/cli), [Next.js](https://nextjs.org/docs), [tRPC](https://trpc.io/docs), [Zod](https://zod.dev/), [Prisma](https://www.prisma.io/docs/orm), [Supabase](https://supabase.com/docs)
