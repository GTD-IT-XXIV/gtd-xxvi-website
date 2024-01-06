"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  eventDetailsAtom,
  eventsFormDataAtom,
} from "@/lib/atoms/events-registration";
import { api } from "@/trpc/provider";

import Timeslot from "./timeslot";

export default function Timeslots({
  eventId,
  eventName,
}: {
  eventId: number;
  eventName: string;
}) {
  const [formData] = useAtom(eventsFormDataAtom);
  const [eventDetails] = useAtom(eventDetailsAtom);

  const { data: timeslots, isLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);
  const createBooking = api.bookings.create.useMutation();
  const createCheckoutSession =
    api.payments.createCheckoutSession.useMutation();

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      if (!isLoading && timeslots?.length === 1) {
        // TODO: extract to separate function
        createBooking.mutate(
          {
            name: formData.name,
            email: formData.email,
            telegramHandle: formData.telegram,
            phoneNumber: formData.phone,
          },
          {
            onSuccess: (booking) => {
              createCheckoutSession.mutate({
                quantity: eventDetails[eventId]!.quantity,
                bundleId: eventDetails[eventId]!.bundle!.id,
                timeslotId: timeslots[0]!.id,
                bookingId: booking.id,
              });
            },
          },
        );
      }
    }
    return () => {
      ignored = true;
    };
  }, [isLoading, timeslots]);

  if (timeslots?.length === 1) return null;

  return (
    <div>
      <h2 className="text-xl font-medium">Timeslots for {eventName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : !timeslots || timeslots.length === 0 ? (
        <p>Event timeslots not found</p>
      ) : (
        timeslots.map((timeslot) => (
          <Timeslot key={timeslot.id} timeslot={timeslot} />
        ))
      )}
    </div>
  );
}
