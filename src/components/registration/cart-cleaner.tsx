"use client";

import { useSetAtom } from "jotai";
import { type ReactNode, useEffect } from "react";

import { cartAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

export type CartCleanerProps = {
  eventIds: number[];
  children: ReactNode;
};

export default function CartCleaner({ eventIds, children }: CartCleanerProps) {
  const setCart = useSetAtom(cartAtom);
  const checkIds = api.booking.checkIdConsistency.useMutation();

  useEffect(() => {
    function runEffect() {
      setCart((prev) =>
        prev.filter(async (item) => {
          if (item.quantity === 0) {
            return false;
          }
          if (item.bundleId === 0 || item.timeslotId === 0) {
            return eventIds.includes(item.eventId);
          }
          return await checkIds.mutateAsync(item);
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
