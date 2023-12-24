import { type Order } from "@/types/order";

const DOLLAR = 100;
export const calculateOrderAmount = async (order: Order): Promise<number> => {
  return order.quantity * (await getBundleAmountPerQuantity(order.bundle_id));
};

// temporarily: return bundleID. In reality, should query the price from the DB of bundles.
// may throw some error too if bundleID does not exist in database. Alternatively, zod validator can also validate whether it actually exist in database before it actually gets here, soon to be implemented.
const getBundleAmountPerQuantity = async (
  bundleID: number,
): Promise<number> => {
  return bundleID * DOLLAR;
};
