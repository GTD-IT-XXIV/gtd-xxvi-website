import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod";

import { retryPrismaTransaction } from "../utils";
import { type merchBookingSchema } from "./schemas";

export async function createBooking(
  db: PrismaClient,
  booking: z.infer<typeof merchBookingSchema>,
) {
  const { merchBundleId, quantity, merch } = booking;
  const bundle = await db.merchBundle.findUnique({
    where: { id: merchBundleId },
  });

  // Unreachable code but necessary for type safety
  if (!bundle) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred",
    });
  }

  async function transaction() {
    // Unreachable code but necessary for type safety
    if (!bundle) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred",
      });
    }
    return await db.$transaction(
      async (tx) => {
        const merchBundle = await tx.merchBundle.update({
          where: { id: merchBundleId },
          data: { stock: { decrement: quantity } },
          select: {
            stock: true,
            bundleItems: { select: { merch: { select: { id: true } } } },
          },
        });
        if (merchBundle.stock < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Insufficient bundle stock",
          });
        }

        const merchIds = merchBundle.bundleItems.map((item) => item.merch.id);
        for (const merchId of merchIds) {
          const updatedMerch = await tx.merch.update({
            where: { id: merchId },
            data: { stock: { decrement: 1 } },
            select: { stock: true },
          });
          if (updatedMerch.stock < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient merch stock",
            });
          }
        }

        const { merch: _, ...merchBookingData } = booking;
        const merchBooking = await tx.merchBooking.create({
          data: merchBookingData,
        });

        await tx.merchBookingItem.createMany({
          data: merch.map((item) => ({
            merchId: item.id,
            merchBookingId: merchBooking.id,
            variation: item.variation,
          })),
        });

        return merchBooking;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  return await retryPrismaTransaction(transaction);
}
