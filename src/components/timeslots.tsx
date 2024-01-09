"use client";

import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import {
  eventDetailsAtom,
  eventsFormDataAtom,
} from "@/lib/atoms/events-registration";
import { api } from "@/trpc/provider";

import Timeslot from "./timeslot";
import { useToast } from "./ui/use-toast";

dayjs.extend(customParseFormat);

export default function Timeslots({
  eventId,
  eventName,
  invalidateQueryKey,
}: {
  eventId: number;
  eventName: string;
  invalidateQueryKey: QueryKey;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState(0); // selected timeslot id
  const [isInitialized, setIsInitialized] = useState(false);
  const formData = useAtomValue(eventsFormDataAtom);
  const eventDetails = useAtomValue(eventDetailsAtom);

  const { data: timeslots, isLoading: timeslotsAreLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);
  const { data: booking, isLoading: bookingIsLoading } =
    api.bookings.getByEmailAndEvent.useQuery({
      email: formData.email,
      eventId: eventId,
    });
  const createBooking = api.bookings.create.useMutation({
    onSuccess: () => queryClient.invalidateQueries(invalidateQueryKey),
  });
  const updateBooking = api.bookings.updateByEmailAndEvent.useMutation({
    onSuccess: () => queryClient.invalidateQueries(invalidateQueryKey),
  });

  const isLoading = timeslotsAreLoading || bookingIsLoading;
  const partySize =
    (booking?.quantity ?? 0) * (eventDetails[eventId]?.bundle?.quantity ?? 0);

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
      createBooking.mutate(
        {
          name: formData.name,
          email: formData.email,
          telegramHandle: formData.telegram,
          phoneNumber: formData.phone,
          quantity: eventDetails[eventId]!.quantity,
          eventId: eventId,
          bundleId: eventDetails[eventId]!.bundle!.id,
          timeslotId: id,
        },
        {
          onSuccess: () => setSelectedId(id),
          onError: () => {
            toast({
              title: "No timeslot",
              description: "Please select another timeslot.",
            });
          },
        },
      );
    } else {
      updateBooking.mutate(
        {
          email: formData.email,
          eventId: eventId,
          timeslotId: id,
          bundleId: booking.bundleId,
        },
        {
          onSuccess: () => setSelectedId(id),
          onError: () => {
            toast({
              title: "No timeslot",
              description: "Please select another timeslot.",
            });
          },
        },
      );
    }
  }

  useEffect(() => {
    let ignored = false;
    if (
      !ignored &&
      !isInitialized &&
      !bookingIsLoading &&
      !timeslotsAreLoading
    ) {
      setIsInitialized(true);
      if (booking && selectedId === 0) {
        setSelectedId(booking.timeslotId);
      }
      if (timeslots?.length === 1 && timeslots[0]!.id !== selectedId) {
        handleSelect(timeslots[0]!.id);
      }
    }
    return () => {
      ignored = true;
    };
  }, [booking, bookingIsLoading, timeslots, timeslotsAreLoading]);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium">Timeslots for {eventName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : !timeslots || timeslots.length === 0 ? (
        <p>Event timeslots not found</p>
      ) : (
        [...timeslots]
          .sort((a, b) => {
            const aStartDayjs = dayjs(a.startTime);
            const bStartDayjs = dayjs(b.startTime);
            if (aStartDayjs.isSame(bStartDayjs)) {
              return 0;
            }
            if (aStartDayjs.isBefore(bStartDayjs)) {
              return -1;
            }
            return 1;
          })
          .map((timeslot) => (
            <Timeslot
              key={timeslot.id}
              timeslot={timeslot}
              disabled={
                createBooking.isLoading ||
                updateBooking.isLoading ||
                timeslot.remainingSlots < partySize
              }
              selected={timeslot.id === selectedId}
              onClick={() => handleSelect(timeslot.id)}
            />
          ))
      )}
    </div>
  );
}
