# GTD XXVI Website Repository Documentation

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Directory Structure](#directory-structure)
3. [Lifecycles](./lifecycles.md):
   1. [Payment Lifecycle](./lifecycles.md#payment-lifecycle)
4. [Packages Usage](./packages-usage.md):
   1. [tRPC](./packages-usage.md#trpc)
5. Diagrams:
   1. [Entity-Relationship Diagrams](./er-diagrams.md)
   2. [Sequence Diagram](./sequence-diagrams.md)

## Tech Stack

- Meta-framework: **Next.js v14**
- Frontend:
  - UI library: **React v18.2**
  - Styling: **Tailwind CSS v3** & shadcn/ui
  - State management: zustand v4, Jotai v2
  - Asynchronous state management: TanStack Query v4
- Backend:
  - Route Handling: **Next.js v14**
  - API: tRPC v10
  - ORM: Prsima v5
  - Database: Supabase Postgres database
  - Payment: Stripe Checkout
- Miscellaneous:
  - Schema validation: Zod v3

## Directory Structure

```
gtd-xxvi-website/
├── prisma/
│   └── schema.prisma             # Prisma's schemas
├── public/                       # Static assets
└── src/
    ├── app/
    │   ├── api/                  # Route handlers; put all route handlers here
    │   │   └── trpc/             # tRPC route handlers
    │   ├── checkout/             # Checkout page
    │   └── events/               # Events page & event-related pages
    │       ├── book/             # Event booking page
    │       ├── gtdfest/          # GTD Fest page
    │       └── register/         # Event registration page
    ├── components/               # React components: put all components here &
    │   │                           separate by function or page for
    │   │                           page-specific components
    │   └── ui/                   # shadcn/ui files (components, hooks, etc.)
    ├── lib/                      # Libraries of utils, helpers, etc.
    │   ├── atoms/                # Jotai atoms
    │   ├── slices/               # zustand slices
    │   ├── trpc/                 # tRPC-related files
    │   ├── types/                # Custom type & schema definitions
    │   ├── constants.ts          # Constants definitions
    │   ├── hooks.ts              # Custom hooks
    │   └── utils.ts              # Utilities & helpers
    ├── server/                   # Backend code; put all backend code here
    │   ├── routers/              # Routers
    │   ├── middlewares/          # Route middlewares
    │   ├── db.ts                 # Database/PrismaClient configuration
    │   └── root.ts               # The main app tRPC router
    ├── styles/                   # CSS files; put all CSS files here
    ├── tests/                    # Test files
    └── env.js                    # Environment variables validation
```
