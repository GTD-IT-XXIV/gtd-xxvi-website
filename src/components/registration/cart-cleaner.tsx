"use client";

import { useAtom, useSetAtom } from "jotai";
import { type ReactNode, useEffect } from "react";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

export type CartCleanerProps = {
  eventNames: string[];
  children: ReactNode;
};

export default function CartCleaner({
  eventNames,
  children,
}: CartCleanerProps) {
  const hasMounted = useHasMounted();
  const [cart, setCart] = useAtom(cartAtom);
  if (hasMounted) {
    console.log({ cart });
  }

  useEffect(() => {
    function runEffect() {
      // setCart((prev) =>
      //   prev.filter(async (item) => {
      //     console.log({eventNames, item, itemEvent: item.event.name});
      //     if (item.quantity === 0) {
      //       return false;
      //     }
      //     if (!item.timeslot) {
      //       return eventNames.includes(item.event.name);
      //     }
      //     return true;
      //   }),
      // );
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, []);

  return children;
}
