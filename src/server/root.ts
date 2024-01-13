import { createTRPCRouter } from "@/lib/trpc/config";

import { bookingRouter } from "./routers/booking";
import { bundleRouter } from "./routers/bundle";
import { eventRouter } from "./routers/event";
import { paymentsRouter } from "./routers/payments";
import { ticketRouter } from "./routers/ticket";
import { timeslotRouter } from "./routers/timeslot";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  event: eventRouter,
  timeslot: timeslotRouter,
  bundle: bundleRouter,
  ticket: ticketRouter,
  payment: paymentsRouter,
  booking: bookingRouter,
});

export type AppRouter = typeof appRouter;
