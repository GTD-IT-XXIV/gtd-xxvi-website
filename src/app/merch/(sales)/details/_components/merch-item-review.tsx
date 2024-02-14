"use client";

import { useAtomValue, useSetAtom } from "jotai";

import { allowMerchCheckoutAtom, merchCartAtom } from "@/lib/atoms/merch";
import { useHasMounted } from "@/lib/hooks";

import MerchItem from "./merch-item";
import MerchItemLoading from "./merch-item/loading";

export default function MerchItemReview() {
  const hasMounted = useHasMounted();
  const merchCart = useAtomValue(merchCartAtom);
  const setAllowMerchCheckout = useSetAtom(allowMerchCheckoutAtom);
  const selected = merchCart.reduce((accum, item) => accum + item.quantity, 0);

  if (selected === 0) {
    setAllowMerchCheckout(false);
  }

  if (
    merchCart.every((item) =>
      item.merch.every((merchItem) => !!merchItem.variation),
    )
  ) {
    setAllowMerchCheckout(true);
  }

  return (
    <div className="space-y-3">
      <h2 className="text-gtd-secondary-20 text-xl font-medium">Item Review</h2>
      <div className="flex flex-col">
        {!hasMounted ? (
          <MerchItemLoading />
        ) : selected === 0 ? (
          <p className="text-gtd-secondary-10 self-center text-sm">
            No items found in cart
          </p>
        ) : (
          merchCart.map((item) => <MerchItem {...item} />)
        )}
      </div>
    </div>
  );
}
