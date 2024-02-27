import { env } from "@/env";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";
import SuperJSON from "superjson";
import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { type OrderMetadata } from "@/lib/types";

import {
  handleEventPaymentExpired,
  handleEventPaymentSuccess,
  handleMerchPaymentExpired,
  handleMerchPaymentSuccess,
} from "./_utils/handlers";

dayjs.extend(utc);

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
    "payment_intent.payment_failed",
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
          const { type: rawType, bookingIds: rawBookingIds } = metadata;

          const type = z.enum(["event", "merch"]).parse(rawType);
          const bookingIds = z
            .number()
            .positive()
            .array()
            .parse(SuperJSON.parse(rawBookingIds));
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);

          if (bookingIds.length === 0) {
            throw new Error("No bookings attached to this CheckoutSession");
          }

          switch (type) {
            case "event": {
              await handleEventPaymentSuccess(data, bookingIds);
              break;
            }
            case "merch": {
              await handleMerchPaymentSuccess(data, bookingIds);
              break;
            }
          }

          break;
        }
        case "checkout.session.expired": {
          data = event.data.object as unknown as Stripe.Checkout.Session;
          console.log({ data });
          metadata = data.metadata as unknown as OrderMetadata;
          const { type: rawType, bookingIds: rawBookingIds } = metadata;

          const type = z.enum(["event", "merch"]).parse(rawType);
          const bookingIds = z
            .number()
            .positive()
            .array()
            .parse(SuperJSON.parse(rawBookingIds));
          console.log(`❌ Payment failed with session: ${data.id}`);

          switch (type) {
            case "event": {
              await handleEventPaymentExpired(bookingIds);
              break;
            }
            case "merch": {
              await handleMerchPaymentExpired(bookingIds);
              break;
            }
          }

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
