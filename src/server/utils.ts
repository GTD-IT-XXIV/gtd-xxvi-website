const DOLLAR = 100;
export const calculateOrderAmount = async (
  order: {
    quantity: number;
    bundle_id: number;
  }[],
): Promise<number> => {
  let totalPrice = 0;
  await Promise.all(
    order.map(async ({ quantity, bundle_id }) => {
      totalPrice += quantity * (await getBundleAmountPerQuantity(bundle_id));
    }),
  );

  return totalPrice;
};

// temporarily: return bundleID. In reality, should query the price from the DB of bundles.
// may throw some error too if bundleID does not exist in database. Alternatively, zod validator can also validate whether it actually exist in database before it actually gets here, soon to be implemented.
const getBundleAmountPerQuantity = async (
  bundleID: number,
): Promise<number> => {
  return bundleID * DOLLAR;
};
