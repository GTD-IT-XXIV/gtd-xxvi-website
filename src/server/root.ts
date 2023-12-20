import { createTRPCRouter } from "@/trpc/config";

import { eventsRouter } from "./controllers/events-router";
import { timeslotsRouter } from "./controllers/timeslots-router";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  events: eventsRouter,
  timeslots: timeslotsRouter,
});

export type AppRouter = typeof appRouter;
