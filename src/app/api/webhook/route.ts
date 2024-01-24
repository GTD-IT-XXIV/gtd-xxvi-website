import { env } from "@/env";
import GTDFestEmail from "@emails/gtdfest-email";
import { Prisma } from "@prisma/client";
import { render } from "@react-email/components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";
import SuperJSON from "superjson";
import { z } from "zod";

import { db } from "@/server/db";

import { BREVO_EMAIL } from "@/lib/constants";
import { sendEmail } from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { type OrderMetadata } from "@/lib/types";

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

          if (bookingIds.length === 0) {
            throw new Error("No bookings attached to this CheckoutSession");
          }

          const bookings = await db.booking.findMany({
            where: { id: { in: bookingIds } },
            include: { event: true, bundle: true, timeslot: true },
          });
          if (bookings.length !== bookingIds.length) {
            throw new Error("Not all bookings were found in database");
          }
          const isAllBookingsValid = bookings.every((booking) => booking.valid);
          if (!isAllBookingsValid) {
            throw new Error("Bookings invalid");
          }

          // use email as the owner of a ticket in the future after the schema changed
          // const tickets = await db.ticket.createMany({
          //   data: bookings.flatMap((booking) =>
          //     Array(booking.quantity)
          //       .fill(0)
          //       .map(() => ({
          //         name: booking.name,
          //         email: booking.email,
          //         telegramHandle: booking.telegramHandle,
          //         phoneNumber: booking.phoneNumber,
          //         bundleId: Number(booking.bundleId),
          //         timeslotId: Number(booking.timeslotId),
          //         paymentIntentId: String(data.payment_intent),
          //       })),
          //   ),
          // });
          const tickets = await db.$transaction(
            bookings.flatMap((booking) =>
              Array(booking.quantity)
                .fill(0)
                .map(() =>
                  db.ticket.create({
                    data: {
                      name: booking.name,
                      email: booking.email,
                      telegramHandle: booking.telegramHandle,
                      phoneNumber: booking.phoneNumber,
                      bundleId: Number(booking.bundleId),
                      timeslotId: Number(booking.timeslotId),
                      paymentIntentId: String(data.payment_intent),
                    },
                    select: { id: true },
                  }),
                ),
            ),
          );
          const ticketIds = tickets.map((ticket) => ticket.id);
          console.log("✅ Ticket details: ");
          console.log(tickets);

          // Unreachable code but necessary for type safety
          if (!bookings[0]) {
            throw new Error("An error occurred");
          }

          const recipient = {
            name: bookings[0].name,
            email: bookings[0].email,
          };
          const eventName = bookings[0].event.name;

          const ticketsUrl = `${
            env.NODE_ENV === "production"
              ? "https://www.pintugtd.com"
              : "http://localhost:3000"
          }/ticket/${btoa(SuperJSON.stringify(ticketIds))}`;

          let orderPrice = 0;
          const emailHtml = render(
            GTDFestEmail({
              name: recipient.name,
              orders: bookings.map((booking) => {
                const totalPrice = new Prisma.Decimal(booking.bundle.price)
                  .times(booking.quantity)
                  .toNumber();
                orderPrice += totalPrice;

                return {
                  eventName: booking.event.name,
                  bundleName: booking.bundle.name,
                  timeslot: {
                    startLabel: dayjs
                      .utc(booking.timeslot.startTime)
                      .format("h.mm A"),
                    endLabel: dayjs
                      .utc(booking.timeslot.endTime)
                      .format("h.mm A"),
                  },
                  quantity: booking.quantity,
                  totalPrice,
                };
              }),
              orderPrice,
              url: ticketsUrl,
            }),
          );

          await sendEmail({
            sender: {
              name: "pintu get together day xxvi",
              email: BREVO_EMAIL,
            },
            replyTo: {
              name: "PINTU Get Together Day XXVI",
              email: BREVO_EMAIL,
            },
            to: [recipient],
            subject: `Your Tickets for ${eventName}`,
            htmlContent: emailHtml,
            // textContent: `You bought ${tickets.count} tickets.`,
          });

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
