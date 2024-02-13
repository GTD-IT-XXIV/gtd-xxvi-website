"use client";

import { Prisma } from "@prisma/client";
import { useAtomValue } from "jotai";

import { merchCartAtom } from "@/lib/atoms/merch";
import { useHasMounted } from "@/lib/hooks";
import { api } from "@/lib/trpc/client";

import MerchTotalPriceLoading from "./loading";

export default function MerchTotalPrice() {
  const hasMounted = useHasMounted();
  const merchCart = useAtomValue(merchCartAtom);

  const merchBundleQueries = api.useQueries((api) =>
    merchCart.map((item) =>
      api.merchBundle.getById({
        id: item.merchBundleId,
      }),
    ),
  );

  const isLoading = merchBundleQueries.some((query) => query.isLoading);
  const isError = merchBundleQueries.some((query) => query.isError);

  if (isLoading || !hasMounted) {
    return <MerchTotalPriceLoading />;
  }

  if (isError) {
    return null;
  }

  const totalPrice = merchCart.reduce((accum, item, idx) => {
    const query = merchBundleQueries[idx];
    if (!query?.data) {
      throw new Error("One of the bundles in cart is not found");
    }
    return accum.plus(
      new Prisma.Decimal(query.data.price).times(item.quantity),
    );
  }, new Prisma.Decimal(0));

  return (
    <div className="text-gtd-secondary-20 text-sm md:text-right">
      $
      <p className="text-2xl font-medium inline md:text-right">
        {totalPrice.toDP(2).toString()}
      </p>
    </div>
  );
}
