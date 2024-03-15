import { createCallerFactory, createTRPCRouter } from "@/lib/trpc/config";

import { bookingRouter } from "./routers/booking";
import { bundleRouter } from "./routers/bundle";
import { eventRouter } from "./routers/event";
import { merchBookingRouter } from "./routers/merch-booking";
import { merchBundleRouter } from "./routers/merch-bundle";
import { orderRouter } from "./routers/order";
import { paymentRouter } from "./routers/payment";
import { ticketRouter } from "./routers/ticket";
import { timeslotRouter } from "./routers/timeslot";

/**
 * Primary server router. All routers in /routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // Insert TRPC routers here
  event: eventRouter,
  timeslot: timeslotRouter,
  bundle: bundleRouter,
  order: orderRouter,
  ticket: ticketRouter,
  payment: paymentRouter,
  booking: bookingRouter,
  merchBundle: merchBundleRouter,
  merchBooking: merchBookingRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
