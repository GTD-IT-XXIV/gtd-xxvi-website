import { createTRPCRouter } from "@/trpc/config";

import { eventsRouter } from "./controllers/events-router";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
