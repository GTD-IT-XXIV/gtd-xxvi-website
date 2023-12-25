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
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      const data = event.data.object as Stripe.PaymentIntent;
      const metadata = data.metadata as unknown as OrderMetadata;
      switch (event.type) {
        case "payment_intent.payment_failed":
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          console.log(
            `Relinquishing timeslot with ID: ${metadata.timeslot_id} of ${metadata.quantity} slots`,
          );
          await prisma.timeslot.update({
            where: { id: Number(metadata.timeslot_id) },
            data: { remainingSlots: { increment: Number(metadata.quantity) } },
          });
          break;
        case "payment_intent.succeeded":
          console.log(`💰 PaymentIntent status: ${data.status}`);
          console.log(
            `Generating ${metadata.quantity} tickets of timeslot with ID: ${metadata.timeslot_id}`,
          );
          // TODO: sending an email to user
          // use email as the owner of a ticket in the future after the schema changed
          const tickets = await prisma.ticket.createMany({
            data: Array(metadata.quantity)
              .fill(0)
              .map((_) => ({
                status: "RECEIVED", // both to be unused changes
                bundleId: metadata.bundle_id,
                timeslotId: metadata.timeslot_id,
                transactionId: 0, // both to be unused after schema changes
              })),
          });
          console.log("Ticket details: ");
          console.log(tickets);
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
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
