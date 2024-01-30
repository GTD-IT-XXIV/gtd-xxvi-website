"use client";

import { Prisma } from "@prisma/client";
import { useAtomValue } from "jotai";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";
import { api } from "@/lib/trpc/client";

import TotalPriceLoading from "./loading";

export default function TotalPrice() {
  const hasMounted = useHasMounted();
  const cart = useAtomValue(cartAtom);
  const selected = cart.reduce((accum, item) => accum + item.quantity, 0);

  const bundleQueries = api.useQueries((api) =>
    cart.map((item) => api.bundle.getById({ id: item.bundleId })),
  );
  const isLoading = bundleQueries.some((query) => query.isLoading);
  const isError = bundleQueries.some((query) => query.isError);

  if (isLoading || !hasMounted) {
    return <TotalPriceLoading />;
  }

  if (isError) {
    return null;
  }

  const totalPrice = cart.reduce((accum, item, idx) => {
    const query = bundleQueries[idx];
    if (!query?.data) {
      throw new Error("One of the bundles in cart is not found");
    }
    return accum.plus(
      new Prisma.Decimal(query.data.price).times(item.quantity),
    );
  }, new Prisma.Decimal(0));

  return (
    <div className="space-y-0.5">
      <p className="text-gtd-secondary-10 text-sm">{selected} Selected</p>
      <div className="text-gtd-secondary-20 text-sm md:text-right">
        $
        <p className="text-2xl font-medium inline md:text-right">
          {totalPrice.toDP(2).toString()}
        </p>
      </div>
    </div>
  );
}
