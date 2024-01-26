import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod";

import { retryPrismaTransaction } from "../utils";
import {
  type bookingEventConsistencySchema,
  type bookingSchema,
} from "./schemas";

/**
 * Checks whether the event ID of the booking, bundle, and timeslot match.
 *
 * @param db the Prisma client to access the database
 * @param booking booking data to check the event IDs from
 * @returns a promise to whether they match
 */
export async function checkEventConsistency(
  db: PrismaClient,
  booking: z.infer<typeof bookingEventConsistencySchema>,
) {
  const id = booking.eventId; // source of truth
  const bundle = await db.bundle.findUnique({
    where: { id: booking.bundleId },
    select: { eventId: true },
  });
  const timeslot = await db.timeslot.findUnique({
    where: { id: booking.timeslotId },
    select: { eventId: true },
  });
  return id === bundle?.eventId && id === timeslot?.eventId;
}

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
  const { bundleId, timeslotId, quantity } = booking;
  const bundle = await db.bundle.findUnique({
    where: { id: bundleId },
  });
  const timeslot = await db.timeslot.findUnique({
    where: { id: timeslotId },
  });

  // Unreachable code but necessary for type safety
  if (!bundle || !timeslot) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred",
    });
  }

  const partySize = quantity * bundle.quantity;

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
            where: { id: bundleId },
            data: { remainingAmount: { decrement: quantity } },
          });
          if (bundle.remainingAmount! < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of bundles",
            });
          }
        }

        const timeslot = await tx.timeslot.update({
          where: { id: timeslotId },
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
