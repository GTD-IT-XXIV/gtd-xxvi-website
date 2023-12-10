import { createTRPCRouter } from "@/trpc/config";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
})

export type AppRouter = typeof appRouter;
