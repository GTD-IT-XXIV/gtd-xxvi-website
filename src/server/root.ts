import { createTRPCRouter } from "@/trpc/config";

import { bundlesRouter } from "./controllers/bundles-router";
import { eventsRouter } from "./controllers/events-router";
import { paymentsRouter } from "./controllers/payments-router";
import { timeslotsRouter } from "./controllers/timeslots-router";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  events: eventsRouter,
  timeslots: timeslotsRouter,
  bundles: bundlesRouter,
  payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;
