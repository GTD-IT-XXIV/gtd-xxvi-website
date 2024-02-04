import { createCallerFactory, createTRPCRouter } from "@/lib/trpc/config";

import { bookingRouter } from "./routers/booking";
import { bundleRouter } from "./routers/bundle";
import { eventRouter } from "./routers/event";
import { orderRouter } from "./routers/order";
import { paymentRouter } from "./routers/payment";
import { ticketRouter } from "./routers/ticket";
import { timeslotRouter } from "./routers/timeslot";

// Primary server router
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  event: eventRouter,
  timeslot: timeslotRouter,
  bundle: bundleRouter,
  order: orderRouter,
  ticket: ticketRouter,
  payment: paymentRouter,
  booking: bookingRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
