"use server";

import { env } from "@/env";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { db } from "@/server/db";

dayjs.extend(utc);

export async function syncAllToGoogleSheets() {
  await synchronizeTicketsToGoogleSheets();
  await synchronizeMerchSalesToGoogleSheets();
}

export async function synchronizeTicketsToGoogleSheets() {
  const auth = new JWT({
    email: env.GOOGLE_CLIENT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  const doc = new GoogleSpreadsheet(env.SHEETS_ID, auth);
  await doc.loadInfo();

  const events = await db.event.findMany({
    include: {
      tickets: {
        include: {
          order: true,
        },
      },
    },
  });

  const columns = [
    "Ticket ID",
    "Ticket Name",
    "Event Name",
    "Bundle Name",
    "Start Time",
    "End Time",
    "Order ID",
    "Buyer Name",
    "Buyer Email",
    "Buyer Telegram Handle",
    "Buyer Contact Number",
    "PaymentIntent ID",
    "Created Time",
  ];
  const dateFormat = "D/M/YYYY H:mm:ss";

  for (const event of events) {
    let sheet = doc.sheetsByTitle[`${event.name} Tickets`];
    if (sheet === undefined) {
      sheet = await doc.addSheet({ title: `${event.name} Tickets` });
    }
    await sheet.setHeaderRow(columns);
    await sheet.clearRows();
    await sheet.addRows(
      event.tickets.map((ticket) => ({
        "Ticket ID": ticket.id,
        "Ticket Name": ticket.name,
        "Event Name": ticket.eventName,
        "Bundle Name": ticket.bundleName,
        "Start Time": dayjs.utc(ticket.startTime).format(dateFormat),
        "End Time": dayjs.utc(ticket.endTime).format(dateFormat),
        "Order ID": ticket.orderId,
        "Buyer Name": ticket.order.name,
        "Buyer Email": ticket.order.email,
        "Buyer Telegram Handle": ticket.order.telegramHandle,
        "Buyer Contact Number": ticket.order.phoneNumber,
        "PaymentIntent ID": ticket.order.paymentIntentId,
        "Created Time": dayjs.utc(ticket.order.created).format(dateFormat),
      })),
    );
  }
}

export async function synchronizeMerchSalesToGoogleSheets() {
  const auth = new JWT({
    email: env.GOOGLE_CLIENT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  const doc = new GoogleSpreadsheet(env.SHEETS_ID, auth);
  await doc.loadInfo();

  const orders = await db.merchOrderBundleItem.findMany({
    select: {
      variation: true,
      merch: {
        select: {
          name: true,
        },
      },
      merchOrderBundle: {
        select: {
          merchOrder: {
            select: {
              id: true,
              name: true,
              email: true,
              telegramHandle: true,
              phoneNumber: true,
              paymentIntentId: true,
              created: true,
            },
          },
        },
      },
    },
  });

  const transformedOrders = orders.map((order) => ({
    ...order.merchOrderBundle.merchOrder,
    merch: order.merch.name,
    variation: order.variation,
  }));

  const columns = [
    "Order ID",
    "Buyer Name",
    "Buyer Email",
    "Buyer Telegram Handle",
    "Buyer Contact Number",
    "Merch Name",
    "Merch Variation",
    "PaymentIntent ID",
    "Created Time",
  ];
  const dateFormat = "D/M/YYYY H:mm:ss";

  let sheet = doc.sheetsByTitle["Merchandise Sales"];
  if (sheet === undefined) {
    sheet = await doc.addSheet({ title: "Merchandise Sales" });
  }
  await sheet.setHeaderRow(columns);
  await sheet.clearRows();
  await sheet.addRows(
    transformedOrders.map((order) => ({
      "Order ID": order.id,
      "Buyer Name": order.name,
      "Buyer Email": order.email,
      "Buyer Telegram Handle": order.telegramHandle,
      "Buyer Contact Number": order.phoneNumber,
      "Merch Name": order.merch,
      "Merch Variation": order.variation,
      "PaymentIntent ID": order.paymentIntentId,
      "Created Time": dayjs.utc(order.created).format(dateFormat),
    })),
  );
}
