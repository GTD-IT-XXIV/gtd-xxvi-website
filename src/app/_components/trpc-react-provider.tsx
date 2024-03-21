"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/react-query";
import { useState } from "react";

import { api } from "@/lib/trpc/client";
import { getUrl, transformer } from "@/lib/trpc/utils";

let clientQueryClientSingleton: QueryClient | undefined = undefined;

function createQueryClient() {
  return new QueryClient();
}

function getQueryClient() {
  if (typeof window === "undefined") {
    // Always create a new query client in server-side
    return createQueryClient();
  }
  // Always use singleton query client in client-side
  return (clientQueryClientSingleton ??= createQueryClient());
}

export default function TRPCReactProvider(props: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer,
          url: getUrl(),
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
