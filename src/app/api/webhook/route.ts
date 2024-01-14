import { env } from "@/env";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";
import SuperJSON from "superjson";
import { z } from "zod";

import { db } from "@/server/db";

import { stripe } from "@/lib/stripe";
import { type OrderMetadata } from "@/lib/types/order-metadata";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature")!,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err instanceof Error) {
      console.log(err);
    }
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
    "checkout.session.expired",
  ];
  console.log(event.type);

  if (permittedEvents.includes(event.type)) {
    try {
      let data: Stripe.Checkout.Session;
      let metadata: OrderMetadata;
      switch (event.type) {
        case "checkout.session.async_payment_succeeded":
        case "checkout.session.completed": {
          data = event.data.object as unknown as Stripe.Checkout.Session;
          console.log({ data });
          metadata = data.metadata as unknown as OrderMetadata;
          const bookingIds = z
            .number()
            .positive()
            .array()
            .parse(SuperJSON.parse(metadata.bookingIds));
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);

          const bookings = await db.booking.findMany({
            where: { id: { in: bookingIds } },
          });
          if (bookings.length !== bookingIds.length) {
            throw new Error("Not all bookings were found in database");
          }
          const bookingsAreValid = bookings.reduce(
            (accum, booking) => (accum &&= booking.valid),
            true,
          );
          if (!bookingsAreValid) {
            throw new Error("Bookings invalid");
          }

          // TODO: sending an email to user
          // use email as the owner of a ticket in the future after the schema changed

          const tickets = await db.ticket.createMany({
            data: bookings.flatMap((booking) =>
              Array(booking.quantity)
                .fill(0)
                .map(() => ({
                  name: booking.name,
                  email: booking.email,
                  telegramHandle: booking.telegramHandle,
                  phoneNumber: booking.phoneNumber,
                  bundleId: Number(booking.bundleId),
                  timeslotId: Number(booking.timeslotId),
                  paymentIntentId: String(data.payment_intent),
                })),
            ),
          });
          console.log("✅ Ticket details: ");
          console.log(tickets);

          await db.booking.deleteMany({
            where: { id: { in: bookingIds } },
          });
          break;
        }
        case "checkout.session.expired": {
          data = event.data.object as unknown as Stripe.Checkout.Session;
          metadata = data.metadata as unknown as OrderMetadata;
          const bookingIds = z
            .number()
            .positive()
            .array()
            .parse(JSON.parse(metadata.bookingIds));
          console.log(`❌ Payment failed with session: ${data.id}`);

          const bookings = await db.booking.findMany({
            where: { id: { in: bookingIds } },
            include: { bundle: true, timeslot: true },
          });

          await db.$transaction(async (tx) => {
            for (const booking of bookings) {
              const partySize = booking.quantity * booking.bundle.quantity;

              await tx.bundle.update({
                where: { id: Number(booking.bundleId) },
                data: {
                  remainingAmount: { increment: Number(booking.quantity) },
                },
              });

              await tx.timeslot.update({
                where: { id: Number(booking.timeslotId) },
                data: { remainingSlots: { increment: Number(partySize) } },
              });
            }
          });
          break;
        }
        default: {
          throw new Error(`Unhandled event: ${event.type}`);
        }
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 },
      );
    }
  } else {
    console.log(`Unpermitted event handled: ${event.type}`);
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
