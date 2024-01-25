"use client";

import { useAtomValue } from "jotai";

import TimeSlotSection from "@/components/registration/timeslot-section";

import { cartAtom } from "@/lib/atoms/events-registration";

export default function TimeslotsPageBody() {
  const cart = useAtomValue(cartAtom);

  return (
    <>
      {cart.map((item) => (
        <TimeSlotSection
          eventId={item.eventId}
          bundleId={item.bundleId}
          quantity={item.quantity}
        />
      ))}
    </>
  );
}
