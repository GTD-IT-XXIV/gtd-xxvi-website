import { env } from "@/env";
import GTDEmail from "@emails/gtd-email";
import { Prisma } from "@prisma/client";
import { render } from "@react-email/components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";
import SuperJSON from "superjson";
import { z } from "zod";

import { db } from "@/server/db";
import { synchronizeToGoogleSheets } from "@/server/routers/utils";

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

          if (!data.payment_intent) {
            throw new Error("Payment intent ID is null");
          }

          const { order, tickets } = await db.$transaction(async (tx) => {
            // Unreachable code but necessary for type safety
            if (!bookings[0]) {
              throw new Error("An error occurred");
            }

            const booking = bookings[0];
            const order = await tx.order.create({
              data: {
                name: booking.name,
                email: booking.email,
                telegramHandle: booking.telegramHandle,
                phoneNumber: booking.phoneNumber,
                paymentIntentId: String(data.payment_intent),
              },
            });

            await tx.ticket.createMany({
              data: bookings.flatMap((booking) =>
                booking.names.flatMap(
                  (name) =>
                    ({
                      name,
                      orderId: order.id,
                      eventName: booking.eventName,
                      bundleName: booking.bundleName,
                      startTime: booking.startTime,
                      endTime: booking.endTime,
                    }) satisfies Prisma.TicketCreateManyInput,
                ),
              ),
            });

            const tickets = await tx.ticket.findMany({
              where: { orderId: order.id },
            });
            return { order, tickets };
          });

          // const ticketIds = tickets.map((ticket) => ticket.id);
          console.log("✅ Ticket details: ");
          console.log(tickets);

          const eventTitle = [
            ...new Set(bookings.map((booking) => booking.event.name)),
          ].join(", ");

          // Unreachable code but necessary for type safety
          if (!bookings[0]) {
            throw new Error("An error occurred");
          }

          const recipient = {
            name: bookings[0].name,
            email: bookings[0].email,
          };

          let orderPrice = 0;
          const emailHtml = render(
            GTDEmail({
              orderId: order.id,
              name: recipient.name,
              bookings: bookings.map((booking) => {
                const totalPrice = new Prisma.Decimal(booking.bundle.price)
                  .times(booking.names.length / booking.bundle.quantity)
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
                  quantity: booking.names.length / booking.bundle.quantity,
                  totalPrice,
                  tickets: tickets
                    .filter(
                      (ticket) =>
                        ticket.eventName === booking.eventName &&
                        ticket.bundleName === booking.bundleName,
                    )
                    .map((ticket) => ({ id: ticket.id, name: ticket.name })),
                };
              }),
              orderPrice,
              eventTitle,
            }),
          );

          await sendEmail({
            sender: {
              name: "PINTU Get Together Day XXVI",
              email: BREVO_EMAIL,
            },
            replyTo: {
              name: "PINTU Get Together Day XXVI",
              email: BREVO_EMAIL,
            },
            to: [recipient],
            subject: `Your ${eventTitle} Tickets`,
            htmlContent: emailHtml,
          });

          await db.booking.deleteMany({
            where: { id: { in: bookingIds } },
          });

          await synchronizeToGoogleSheets();
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
              const partySize = booking.names.length;

              await tx.bundle.update({
                where: {
                  name_eventName: {
                    name: booking.bundleName,
                    eventName: booking.eventName,
                  },
                },
                data: {
                  remainingAmount: {
                    increment: booking.names.length / booking.bundle.quantity,
                  },
                },
              });

              await tx.timeslot.update({
                where: {
                  startTime_endTime_eventName: {
                    startTime: booking.startTime,
                    endTime: booking.endTime,
                    eventName: booking.eventName,
                  },
                },
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
