import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod";

import { retryPrismaTransaction } from "../utils";
import { type bookingSchema } from "./schemas";

/**
 * Creates a new booking in the database, guaranteeing the bundle amount
 * and timeslots are either decreased by the correct amount or not an all,
 * i.e, fails the creation of a new booking if there is insufficient amount
 * of bundle or timeslots available.
 *
 * @param db the Prisma client to access the database
 * @param booking data to save to database
 * @returns a promise to the booking created
 */
export async function createBooking(
  db: PrismaClient,
  booking: z.infer<typeof bookingSchema>,
) {
  const { eventName, bundleName, startTime, endTime, names } = booking;
  const quantity = names.length;
  const bundle = await db.bundle.findUnique({
    where: { name_eventName: { name: bundleName, eventName } },
  });
  const timeslot = await db.timeslot.findUnique({
    where: { startTime_endTime_eventName: { startTime, endTime, eventName } },
  });

  if (!bundle || !timeslot) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Bundle or timeslot not found",
    });
  }

  const partySize = quantity;
  const bundleQuantity = bundle.quantity;

  async function transaction() {
    // Unreachable code but necessary for type safety
    if (!bundle || !timeslot) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred",
      });
    }
    return await db.$transaction(
      async (tx) => {
        if (bundle.remainingAmount !== null) {
          const bundle = await tx.bundle.update({
            where: { name_eventName: { name: bundleName, eventName } },
            data: { remainingAmount: { decrement: bundleQuantity } },
          });
          if (bundle.remainingAmount! < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of bundles",
            });
          }
        }

        const timeslot = await tx.timeslot.update({
          where: {
            startTime_endTime_eventName: { startTime, endTime, eventName },
          },
          data: { remainingSlots: { decrement: partySize } },
        });
        if (timeslot.remainingSlots < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Insufficient number of timeslots",
          });
        }
        return await tx.booking.create({ data: booking });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  return await retryPrismaTransaction(transaction);
}
