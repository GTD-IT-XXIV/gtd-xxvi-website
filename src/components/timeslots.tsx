import "client-only";

import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { formDataAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { api } from "@/lib/trpc/provider";

import Timeslot from "./timeslot";

dayjs.extend(customParseFormat);

export type TimeslotsProps = {
  eventId: number;
  bundleId: number;
  /**
   * Amount of tickets/bundles to book
   */
  amount: number;
  onChange: (id: number) => void;
};

export default function Timeslots({
  eventId,
  bundleId,
  amount,
  onChange,
}: TimeslotsProps) {
  const queryClient = useQueryClient();
  const formData = useAtomValue(formDataAtom);
  const setError = useSetAtom(errorAtom);
  const [selectedId, setSelectedId] = useState(0);

  const { data: event, isLoading: isEventLoading } =
    api.events.getById.useQuery(eventId);
  const { data: bundle, isLoading: isBundleLoading } =
    api.bundles.getById.useQuery(bundleId);
  const { data: timeslots, isLoading: isTimeslotsLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);
  const { data: booking, isLoading: isBookingLoading } =
    api.bookings.getByEmailAndEvent.useQuery(
      { email: formData.email, eventId },
      { enabled: !!formData.email },
    );

  const isLoading =
    isEventLoading || isBundleLoading || isTimeslotsLoading || isBookingLoading;
  const partySize = amount * (bundle?.quantity ?? 0);
  const timeslotsQueryKey = getQueryKey(api.timeslots.getManyByEvent, eventId);
  const bookingQueryKey = getQueryKey(api.bookings.getByEmailAndEvent, {
    email: formData.email,
    eventId,
  });

  const createBooking = api.bookings.create.useMutation({
    onSuccess: (createdBooking) => {
      setSelectedId(createdBooking.timeslotId);
      void queryClient.invalidateQueries(timeslotsQueryKey);
      void queryClient.invalidateQueries(bookingQueryKey);
    },
    onError: (error) => {
      setError(
        `No timeslot. Please select another timeslot. (Error message: ${error.message})`,
      );
    },
  });
  const updateBooking = api.bookings.updateByEmailAndEvent.useMutation({
    onSuccess: (updatedBooking) => {
      setSelectedId(updatedBooking.timeslotId);
      void queryClient.invalidateQueries(timeslotsQueryKey);
      void queryClient.invalidateQueries(bookingQueryKey);
    },
    onError: (error) => {
      setError(
        `No timeslot. Please select another timeslot. (Error message: ${error.message})`,
      );
    },
  });

  function handleSelectTimeslot(id: number) {
    if (!booking) {
      createBooking.mutate({
        ...formData,
        quantity: amount,
        eventId,
        bundleId,
        timeslotId: id,
      });
    } else {
      updateBooking.mutate({
        email: formData.email,
        eventId,
        timeslotId: id,
      });
    }
    onChange(id);
  }

  useEffect(() => {
    function runEffect() {
      if (!isBookingLoading && !isTimeslotsLoading) {
        if (booking && selectedId === 0) {
          console.log({ timeslotId: booking.timeslotId });
          setSelectedId(booking.timeslotId);
          onChange(booking.timeslotId);
        }
        if (
          timeslots?.length === 1 &&
          timeslots[0] &&
          timeslots[0].id !== selectedId
        ) {
          handleSelectTimeslot(timeslots[0].id);
        }
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [booking, isBookingLoading, timeslots, isTimeslotsLoading]);

  if (isLoading || !event) {
    return <p>Loading...</p>;
  }

  const sortedTimeslots = timeslots
    ? [...timeslots].sort((a, b) => {
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
    : [];

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium">Timeslots for {event.name}</h2>
      {sortedTimeslots.map((timeslot) => (
        <Timeslot
          key={timeslot.id}
          startTime={timeslot.startTime}
          endTime={timeslot.endTime}
          selected={timeslot.id === selectedId}
          disabled={
            createBooking.isLoading ||
            updateBooking.isLoading ||
            timeslot.remainingSlots < partySize
          }
          onClick={() => handleSelectTimeslot(timeslot.id)}
        />
      ))}
    </div>
  );
}
