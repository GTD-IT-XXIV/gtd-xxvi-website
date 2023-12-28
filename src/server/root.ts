import { createTRPCRouter } from "@/trpc/config";

import { bundlesRouter } from "./routers/bundles";
import { eventsRouter } from "./routers/events";
import { timeslotsRouter } from "./routers/timeslots";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  events: eventsRouter,
  timeslots: timeslotsRouter,
  bundles: bundlesRouter,
});

export type AppRouter = typeof appRouter;
