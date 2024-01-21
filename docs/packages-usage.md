# Packages Usage

## tRPC

### In Server Components

Use the tRPC client `api` defined in `src/trpc/server`. Example:

```tsx
// example-page.tsx
import { api } from "@/server/trpc";

export default async function ExamplePage() {
  const event = await api.event.getById.query(1);
  return <main>{event?.name}</main>;
}
```

### In Client Components

Use the tRPC client `api` defined in `src/trpc/provider`. Example:

```tsx
// example-page.tsx
"use client";

import { api } from "@/lib/trpc/provider";

export default function ExamplePage() {
  const { data: event } = api.event.getById.useQuery(1);
  return <main>{event?.name}</main>;
}
```

## Day.js

Do:

- Use Day.js to parse, find difference, format, etc. `Date` to `String`

Don't:

- Use Day.js as prop/state. Use `Date` instead (`dayjs().toDate()`)
