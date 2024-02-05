"use client";

import { useSetAtom } from "jotai";
import { type ReactNode, useEffect } from "react";

import { cartAtom } from "@/lib/atoms/events-registration";

export type CartCleanerProps = {
  eventNames: string[];
  children: ReactNode;
};

export default function CartCleaner({
  eventNames,
  children,
}: CartCleanerProps) {
  const setCart = useSetAtom(cartAtom);

  useEffect(() => {
    function runEffect() {
      setCart((prev) =>
        prev.filter(async (item) => {
          if (item.quantity === 0) {
            return false;
          }
          if (!item.timeslot) {
            return eventNames.includes(item.event.name);
          }
          return true;
        }),
      );
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
