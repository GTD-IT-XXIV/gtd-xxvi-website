import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import SuperJSON from "superjson";

import { stripe } from "@/lib/stripe";
import { type OrderMetadata } from "@/lib/types";

type HandlerOptions = {
  ctx: {
    headers: Headers;
    db: PrismaClient;
  };
  bookingIds: number[];
};

export async function handleEventPayment({ ctx, bookingIds }: HandlerOptions) {
  const bookings = await ctx.db.booking.findMany({
    where: { id: { in: bookingIds } },
    include: { event: true, bundle: true, timeslot: true },
  });

  if (bookings.length !== bookingIds.length) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Not all bookings were not found",
    });
  }

  if (bookings.some((booking) => booking?.sessionId)) {
    const sessionId = bookings.find((booking) => booking?.sessionId)?.sessionId;

    if (!bookings.every((booking) => booking?.sessionId === sessionId)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Not all bookings were not found",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId!);
    return {
      clientSecret: session.client_secret,
      sessionId: session.id,
    };
  }

  const expiresAt = Date.now() + 30 * 60 * 1000; // timeout the payment after 30 minutes since it is the minimum time to timeout the transaction if there is no payment
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: bookings.map((booking) => ({
      price_data: {
        product_data: {
          name: `${booking.event.name} ${booking.bundle.name}`,
        },
        currency: "sgd",
        unit_amount: new Prisma.Decimal(booking.bundle.price)
          .times(100)
          .toNumber(), // Stripe charges in cents
      },
      quantity: booking.names.length / booking.bundle.quantity,
    })),
    mode: "payment",
    payment_method_types: ["paynow"],
    metadata: {
      type: "event",
      bookingIds: SuperJSON.stringify(bookingIds),
    } satisfies OrderMetadata,
    return_url: `${ctx.headers.get(
      "origin",
    )}/register/complete?session_id={CHECKOUT_SESSION_ID}`,
    expires_at: Math.floor(expiresAt / 1000), // since stripe time in seconds
  });

  await ctx.db.booking.updateMany({
    where: { id: { in: bookingIds } },
    data: { sessionId: String(session.id) },
  });

  return {
    clientSecret: session.client_secret,
    sessionId: session.id,
  };
}

export async function handleMerchPayment({ ctx, bookingIds }: HandlerOptions) {
  const bookings = await ctx.db.merchBooking.findMany({
    where: { id: { in: bookingIds } },
    include: { merchBundle: true, merchBookingItem: true },
  });

  if (bookings.length !== bookingIds.length) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Not all bookings were not found",
    });
  }

  if (bookings.some((booking) => booking?.sessionId)) {
    const sessionId = bookings.find((booking) => booking?.sessionId)?.sessionId;

    if (!bookings.every((booking) => booking?.sessionId === sessionId)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Not all bookings were not found",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId!);
    return {
      clientSecret: session.client_secret,
      sessionId: session.id,
    };
  }

  const expiresAt = Date.now() + 30 * 60 * 1000; // timeout the payment after 30 minutes since it is the minimum time to timeout the transaction if there is no payment
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: bookings.map((booking) => ({
      price_data: {
        product_data: {
          name: `${booking.merchBundle.name}`,
        },
        currency: "sgd",
        unit_amount: new Prisma.Decimal(booking.merchBundle.price)
          .times(100)
          .toNumber(), // Stripe charges in cents
      },
      quantity: booking.quantity,
    })),
    mode: "payment",
    payment_method_types: ["paynow"],
    metadata: {
      type: "merch",
      bookingIds: SuperJSON.stringify(bookingIds),
    } satisfies OrderMetadata,
    return_url: `${ctx.headers.get(
      "origin",
    )}/merch/complete?session_id={CHECKOUT_SESSION_ID}`,
    expires_at: Math.floor(expiresAt / 1000), // since stripe time in seconds
  });

  await ctx.db.booking.updateMany({
    where: { id: { in: bookingIds } },
    data: { sessionId: String(session.id) },
  });

  return {
    clientSecret: session.client_secret,
    sessionId: session.id,
  };
}
