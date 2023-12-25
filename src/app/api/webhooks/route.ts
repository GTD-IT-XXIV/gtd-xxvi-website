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

  const permittedEvents: string[] = ["checkout.session.completed"];

  if (permittedEvents.includes(event.type)) {
    try {
      let data;
      let metadata;
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as unknown as Stripe.Checkout.Session;
          const { bundle_id, timeslot_id, quantity } =
            data.metadata as unknown as OrderMetadata;
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          // TODO: sending an email to user
          // use email as the owner of a ticket in the future after the schema changed
          const tickets = await prisma.ticket.createMany({
            data: Array(quantity)
              .fill(0)
              .map((_) => ({
                status: "RECEIVED", // both to be unused changes
                bundleId: bundle_id,
                timeslotId: timeslot_id,
                transactionId: 0, // both to be unused after schema changes
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
            `Relinquishing timeslot with ID: ${metadata.timeslot_id} of ${metadata.quantity} slots`,
          );
          await prisma.timeslot.update({
            where: { id: Number(metadata.timeslot_id) },
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
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
