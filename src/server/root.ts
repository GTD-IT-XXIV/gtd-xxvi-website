import { createTRPCRouter } from "@/lib/trpc/config";

import { bookingsRouter } from "./routers/bookings";
import { bundlesRouter } from "./routers/bundles";
import { eventsRouter } from "./routers/events";
import { paymentsRouter } from "./routers/payments";
import { ticketsRouter } from "./routers/tickets";
import { timeslotsRouter } from "./routers/timeslots";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  event: eventsRouter,
  timeslot: timeslotsRouter,
  bundle: bundlesRouter,
  ticket: ticketsRouter,
  payment: paymentsRouter,
  booking: bookingsRouter,
});

export type AppRouter = typeof appRouter;
