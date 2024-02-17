import GTDEmail from "@emails/gtd-email";
import GTDMerchEmail from "@emails/gtd-merch-email";
import { Prisma } from "@prisma/client";
import { render } from "@react-email/components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type Stripe from "stripe";
import { z } from "zod";

import { db } from "@/server/db";
import { synchronizeTicketsToGoogleSheets } from "@/server/routers/utils";

import { BREVO_EMAIL } from "@/lib/constants";
import { sendEmail } from "@/lib/email";

dayjs.extend(utc);

export async function handleEventPaymentSuccess(
  data: Stripe.Checkout.Session,
  bookingIds: number[],
) {
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
            startLabel: dayjs.utc(booking.timeslot.startTime).format("h.mm A"),
            endLabel: dayjs.utc(booking.timeslot.endTime).format("h.mm A"),
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

  await synchronizeTicketsToGoogleSheets();
}

export async function handleEventPaymentExpired(bookingIds: number[]) {
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
    await tx.booking.deleteMany({
      where: { id: { in: bookings.map((booking) => booking.id) } },
    });
  });
}

export async function handleMerchPaymentSuccess(
  data: Stripe.Checkout.Session,
  bookingIds: number[],
) {
  const bookings = await db.merchBooking.findMany({
    where: { id: { in: bookingIds } },
    include: { merchBundle: true, merchBookingItem: true },
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

  const { order, bundles } = await db.$transaction(async (tx) => {
    // Unreachable code but necessary for type safety
    if (!bookings[0]) {
      throw new Error("An error occurred");
    }

    const booking = bookings[0];
    const order = await tx.merchOrder.create({
      data: {
        name: booking.name,
        email: booking.email,
        telegramHandle: booking.telegramHandle,
        phoneNumber: booking.phoneNumber,
        paymentIntentId: String(data.payment_intent),
      },
    });

    const merchOrderBundleCreateSelectArg = {
      id: true,
      merchBundle: {
        select: {
          name: true,
          price: true,
        },
      },
      merchOrderBundleItem: {
        select: {
          variation: true,
          merch: {
            select: {
              name: true,
            },
          },
        },
      },
    } satisfies Prisma.Args<typeof tx.merchOrderBundle, "create">["select"];

    const bundleSchema = z.object({
      name: z.string(),
      quantity: z.number().positive(),
      totalPrice: z.number(),
      items: z
        .object({
          name: z.string(),
          variation: z.string(),
        })
        .array(),
    });

    const bundles: z.infer<typeof bundleSchema>[] = [];

    for (const booking of bookings) {
      await tx.merchOrderBundle.createMany({
        data: Array(booking.quantity)
          .fill(0)
          .map((_) => ({
            merchBundleId: booking.merchBundleId,
            merchOrderId: order.id,
          })),
      });

      const orderBundles = await tx.merchOrderBundle.findMany({
        where: {
          merchBundleId: booking.merchBundleId,
          merchOrderId: order.id,
        },
        select: merchOrderBundleCreateSelectArg,
      });

      const bundle: Partial<z.infer<typeof bundleSchema>> = {
        quantity: booking.quantity,
      };

      for (const orderBundle of orderBundles) {
        await tx.merchOrderBundleItem.createMany({
          data: booking.merchBookingItem.map((item) => ({
            merchOrderBundleId: orderBundle.id,
            merchId: item.merchId,
            variation: item.variation,
          })),
        });

        const orderBundlesItems = await tx.merchOrderBundleItem.findMany({
          where: { merchOrderBundleId: orderBundle.id },
          select: merchOrderBundleCreateSelectArg.merchOrderBundleItem.select,
        });

        if (bundle.name === undefined) {
          bundle.name = orderBundle.merchBundle.name;
        }
        if (bundle.totalPrice === undefined) {
          bundle.totalPrice = new Prisma.Decimal(orderBundle.merchBundle.price)
            .times(booking.quantity)
            .toNumber();
        }
        if (bundle.items === undefined) {
          bundle.items = orderBundlesItems.map((item) => ({
            name: item.merch.name,
            variation: item.variation,
          }));
        }
      }

      bundles.push(bundleSchema.parse(bundle));
    }

    return { order, bundles };
  });

  // const ticketIds = tickets.map((ticket) => ticket.id);
  console.log("✅ Merch bundle details: ");
  console.log(bundles);

  // Unreachable code but necessary for type safety
  if (!bookings[0]) {
    throw new Error("An error occurred");
  }

  const recipient = {
    name: bookings[0].name,
    email: bookings[0].email,
  };

  const emailHtml = render(
    GTDMerchEmail({
      orderId: order.id,
      name: recipient.name,
      bundles,
      orderPrice: bundles.reduce(
        (accum, { totalPrice }) => accum + totalPrice,
        0,
      ),
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
    subject: `Your Merchandise Sale Order`,
    htmlContent: emailHtml,
  });

  for (const id of bookingIds) {
    await db.merchBookingItem.deleteMany({
      where: { merchBookingId: id },
    });
  }
  await db.merchBooking.deleteMany({
    where: { id: { in: bookingIds } },
  });
}

export async function handleMerchPaymentExpired(bookingIds: number[]) {
  const bookings = await db.merchBooking.findMany({
    where: { id: { in: bookingIds } },
    include: { merchBookingItem: true, merchBundle: true },
  });

  await db.$transaction(async (tx) => {
    for (const booking of bookings) {
      const merchBundle = await tx.merchBundle.update({
        where: { id: booking.merchBundleId },
        data: { stock: { increment: booking.quantity } },
        select: {
          stock: true,
          bundleItems: { select: { merch: { select: { id: true } } } },
        },
      });

      const merchIds = merchBundle.bundleItems.map((item) => item.merch.id);
      for (const merchId of merchIds) {
        await tx.merch.update({
          where: { id: merchId },
          data: { stock: { increment: booking.quantity } },
          select: { stock: true },
        });
      }
    }

    const bookingIds = bookings.map((booking) => booking.id);
    await tx.merchBookingItem.deleteMany({
      where: { merchBookingId: { in: bookingIds } },
    });
    await tx.merchBooking.deleteMany({
      where: { id: { in: bookingIds } },
    });
  });
}
