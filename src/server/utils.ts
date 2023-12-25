import { type Order } from "@/types/order";
import { TRPCError } from "@trpc/server";

import { prisma } from "./db";

const DOLLAR = 100;
export const calculateOrderAmount = async (order: Order): Promise<number> => {
  return order.quantity * (await getBundleAmountPerQuantity(order.bundle_id));
};

// temporarily: return bundleID. In reality, should query the price from the DB of bundles.
// may throw some error too if bundleID does not exist in database. Alternatively, zod validator can also validate whether it actually exist in database before it actually gets here, soon to be implemented.
const getBundleAmountPerQuantity = async (
  bundleID: number,
): Promise<number> => {
  try {
    const { price } = await prisma.bundle.findUniqueOrThrow({
      where: { id: bundleID },
    });

    return Number(price) * DOLLAR;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Bundle is not found",
    });
  }
};
