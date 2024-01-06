"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Timeslots from "@/components/timeslots";

import {
  eventDetailsAtom,
  registrationCompletionAtom,
} from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

export default function BookingPage() {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [registrationCompletion] = useAtom(registrationCompletionAtom);
  const [eventDetails] = useAtom(eventDetailsAtom);

  // Cmn bisa masuk page ini kalau udh isi form registration
  // Kalau cmn ada 1 timeslot, redirect ke checkout page
  if (hasMounted && !registrationCompletion.register) {
    router.push("/events/register");
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Booking Page</h1>
      {Object.keys(eventDetails).map((key) => {
        const eventId = parseInt(key);
        return (
          <Timeslots
            key={eventId}
            eventId={eventId}
            eventName={eventDetails[eventId]!.name}
          />
        );
      })}
    </main>
  );
}
