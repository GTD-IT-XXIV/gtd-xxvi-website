"use client";

import { useSetAtom } from "jotai";
import { type ReactNode, useEffect } from "react";

import { cartAtom } from "@/lib/atoms/events-registration";

export type CartCleanerProps = {
  eventIds: number[];
  children: ReactNode;
};

export default function CartCleaner({ eventIds, children }: CartCleanerProps) {
  const setCart = useSetAtom(cartAtom);

  useEffect(() => {
    function runEffect() {
      setCart((prev) => prev.filter((item) => eventIds.includes(item.eventId)));
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
