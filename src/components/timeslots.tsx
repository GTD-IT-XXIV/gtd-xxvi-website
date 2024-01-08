"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  eventDetailsAtom,
  eventsFormDataAtom,
} from "@/lib/atoms/events-registration";
import { api } from "@/trpc/provider";

import Timeslot from "./timeslot";

dayjs.extend(customParseFormat);

export default function Timeslots({
  eventId,
  eventName,
}: {
  eventId: number;
  eventName: string;
}) {
  const [selectedId, setSelectedId] = useState(0); // selected timeslot id
  const [formData] = useAtom(eventsFormDataAtom);
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);

  const { data: timeslots, isLoading: timeslotsAreLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);
  const { data: booking, isLoading: bookingIsLoading } =
    api.bookings.getByEmailAndEvent.useQuery({
      email: formData.email,
      eventId: eventId,
    });
  const createBooking = api.bookings.create.useMutation();
  const updateBooking = api.bookings.updateByEmailAndEvent.useMutation();

  const isLoading = timeslotsAreLoading || bookingIsLoading;
  const sortedTimeslots = !timeslots
    ? []
    : [...timeslots].sort((a, b) => {
        const aStartDayjs = dayjs(a.startTime);
        const bStartDayjs = dayjs(b.startTime);
        if (aStartDayjs.isSame(bStartDayjs)) {
          return 0;
        }
        if (aStartDayjs.isBefore(bStartDayjs)) {
          return -1;
        }
        return 1;
      });

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      if (!bookingIsLoading && booking && selectedId === 0) {
        setSelectedId(booking.timeslotId);
      }
    }
    return () => {
      ignored = true;
    };
  }, [booking, bookingIsLoading]);

  function handleSelect(id: number) {
    // console.log(`Selected timeslot ${id}!`);
    if (!eventDetails[eventId]) {
      throw new Error(
        `Event details for ${eventName} (id: ${eventId}) not found`,
      );
    }
    if (!eventDetails[eventId]!.bundle?.id) {
      throw new Error(
        `Bundle details for ${eventName} (id: ${eventId}) not found`,
      );
    }
    if (!booking) {
      createBooking.mutate({
        name: formData.name,
        email: formData.email,
        telegramHandle: formData.telegram,
        phoneNumber: formData.phone,
        quantity: eventDetails[eventId]!.quantity,
        eventId: eventId,
        bundleId: eventDetails[eventId]!.bundle!.id,
        timeslotId: id,
      });
    } else {
      updateBooking.mutate({
        email: formData.email,
        eventId: eventId,
        timeslotId: id,
        bundleId: booking.bundleId,
      });
    }
    setSelectedId(id);
  }

  return (
    <div>
      <h2 className="text-xl font-medium">Timeslots for {eventName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : !timeslots || timeslots.length === 0 ? (
        <p>Event timeslots not found</p>
      ) : (
        sortedTimeslots.map((timeslot) => (
          <Timeslot
            key={timeslot.id}
            timeslot={timeslot}
            disabled={createBooking.isLoading || updateBooking.isLoading}
            selected={timeslot.id === selectedId}
            onClick={() => handleSelect(timeslot.id)}
          />
        ))
      )}
    </div>
  );
}
