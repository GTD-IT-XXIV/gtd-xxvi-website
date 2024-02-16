import "server-only";

import { env } from "@/env";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { db } from "@/server/db";

import { MAX_TRANSACTION_RETRIES } from "@/lib/constants";

dayjs.extend(utc);

export async function retryPrismaTransaction<T>(
  transaction: () => Promise<T>,
): Promise<T> {
  for (let retries = 0; retries < MAX_TRANSACTION_RETRIES; retries++) {
    try {
      const booking = await transaction();
      return booking;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        continue;
      }
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred during interactive transaction",
      });
    }
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Interactive transaction reached maximum retries",
  });
}

export function extendPrismaTransaction(tx: Prisma.TransactionClient) {
  return new Proxy(tx, {
    get: (target, property) => {
      if (property === "$transaction") {
        type Transaction = InstanceType<typeof PrismaClient>["$transaction"];
        return (func: Parameters<Transaction>[0]) => func(tx);
      }
      return Reflect.get(target, property) as unknown;
    },
  }) as Prisma.TransactionClient & Pick<PrismaClient, "$transaction">;
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
