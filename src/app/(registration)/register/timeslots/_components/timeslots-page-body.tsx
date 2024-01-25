"use client";

import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TimeSlotSection from "@/components/registration/timeslot-section";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

export default function TimeslotsPageBody() {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [cart, setCart] = useAtom(cartAtom);
  const [skipTimeslots, setSkipTimeslots] = useState<boolean[]>([]);

  function handleSelectTimeslot(itemId: number, timeslotId: number) {
    setCart((prev) => {
      const updated = [...prev];
      const old = prev[itemId];
      if (!old) {
        throw new Error("Item does not exist in cart");
      }
      updated[itemId] = { ...old, timeslotId };
      return updated;
    });
  }

  console.log({ hasMounted, skipTimeslots, cart });

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

  return (
    <>
      {cart.map((item, idx) => (
        <TimeSlotSection
          key={idx}
          eventId={item.eventId}
          bundleId={item.bundleId}
          quantity={item.quantity}
          selectedId={item.timeslotId}
          onChange={(timeslotId) => handleSelectTimeslot(idx, timeslotId)}
          handleSkip={(value) => setSkipTimeslots((prev) => prev.concat(value))}
        />
      ))}
    </>
  );
}
