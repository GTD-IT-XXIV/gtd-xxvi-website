"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

import TimeSlotSection from "./timeslot-section";

export default function TimeslotsPageBody() {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [cart, setCart] = useAtom(cartAtom);
  const [skipTimeslots, setSkipTimeslots] = useState<boolean[]>([]);

  function handleSelectTimeslot(
    itemId: number,
    startTime: Date,
    endTime: Date,
  ) {
    setCart((prev) => {
      const updated = [...prev];
      const old = prev[itemId];
      if (!old) {
        throw new Error("Item does not exist in cart");
      }
      updated[itemId] = {
        ...old,
        timeslot: { start: startTime, end: endTime },
      };
      return updated;
    });
  }

  if (
    hasMounted &&
    skipTimeslots.length === cart.length &&
    skipTimeslots.every((val) => val)
  ) {
    router.replace("/register/details");
  }

  useEffect(() => {
    function runEffect() {
      setSkipTimeslots([]);
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, []);

  return cart.map((item, idx) => (
    <TimeSlotSection
      key={idx}
      eventName={item.event.name}
      bundleName={item.event.bundle}
      quantity={item.quantity}
      selected={item.timeslot}
      onChange={(start, end) =>
        handleSelectTimeslot(idx, start, end)
      }
      handleSkip={(value) => setSkipTimeslots((prev) => prev.concat(value))}
    />
  ));
}
