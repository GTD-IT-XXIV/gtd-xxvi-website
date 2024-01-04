import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { type OrderMetadata } from "@/types/order-metadata";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";

import { prisma } from "@/server/db";

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
    if (err instanceof Error) console.log(err);
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
    "checkout.session.expired",
  ];
  console.log(event.type);

  if (permittedEvents.includes(event.type)) {
    try {
      let data: Stripe.Checkout.Session;
      let metadata: OrderMetadata;
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as unknown as Stripe.Checkout.Session;
          metadata = data.metadata as unknown as OrderMetadata;
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);

          const booking = await prisma.booking.findUnique({
            where: { id: metadata.bookingId },
          });
          if (!booking || !booking.valid) {
            throw new Error("Booking invalid");
          }

          await prisma.booking.delete({ where: { id: metadata.bookingId } });

          // TODO: sending an email to user
          // use email as the owner of a ticket in the future after the schema changed

          const tickets = await prisma.ticket.createMany({
            data: Array(Number(metadata.quantity))
              .fill(0)
              .map((_) => ({
                bundleId: Number(metadata.bundleId),
                timeslotId: Number(metadata.timeslotId),
                bookingId: Number(metadata.bookingId),
                paymentIntentId: String(data.payment_intent),
              })),
          });
          console.log("Ticket details: ");
          console.log(tickets);
          break;
        case "checkout.session.expired":
          data = event.data.object as unknown as Stripe.Checkout.Session;
          metadata = data.metadata as unknown as OrderMetadata;
          console.log(`❌ Payment failed with session: ${data.id}`);
          console.log(
            `Relinquishing timeslot with ID: ${metadata.timeslotId} of ${metadata.quantity} slots`,
          );
          await prisma.timeslot.update({
            where: { id: Number(metadata.timeslotId) },
            data: { remainingSlots: { increment: Number(metadata.quantity) } },
          });
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
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
