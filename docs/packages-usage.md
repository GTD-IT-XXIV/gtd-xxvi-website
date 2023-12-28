# Packages Usage

## tRPC

### In Client Components

Use the tRPC client `api` defined in `src/trpc/provider`. Example:

```tsx
// example-page.tsx
"use client";

import { api } from "@/trpc/provider";

// example-page.tsx

export default function ExamplePage() {
  const { data: event } = api.event.getById.useQuery(1);
  return <main>{event?.name}</main>;
}
```

### In Server Components

Use the tRPC client `api` defined in `src/trpc/server`. Example:

```tsx
// example-page.tsx
import { api } from "@/trpc/server";

export default async function ExamplePage() {
  const event = await api.event.getById.query(1);
  return <main>{event?.name}</main>;
}
```
