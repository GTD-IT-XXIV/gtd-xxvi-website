"use client";

import { useAtomValue } from "jotai";

import { cartAtom } from "@/lib/atoms/events-registration";

export default function TotalPrice() {
  const cart = useAtomValue(cartAtom);
  const selected = cart.reduce((accum, item) => accum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (accum, item) => accum + item.price * item.quantity,
    0,
  );

  return (
    <div className="space-y-0.5">
      <p className="text-gtd-secondary-10 text-sm">{selected} Selected</p>
      <div className="text-gtd-secondary-20 text-sm">
        $<p className="text-2xl font-medium inline">{totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
