import "client-only";

import { useEffect } from "react";

import { api } from "@/lib/trpc/client";

import Timeslot from "./timeslot";

export type TimeslotsProps = {
  eventId: number;
  selectedId?: number;
  onChange: (id: number) => void;
};

export default function Timeslots({
  eventId,
  selectedId = 0,
  onChange,
}: TimeslotsProps) {
  console.log({ eventId });
  const {
    data: event,
    error: eventError,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getById.useQuery({
    id: eventId,
  });
  const {
    data: min,
    error: minError,
    isLoading: isMinLoading,
    isError: isMinError,
  } = api.bundle.getMinQuantityByEvent.useQuery({ eventId });
  const {
    data: timeslots,
    error: timeslotsError,
    isLoading: isTimeslotsLoading,
    isError: isTimeslotsError,
  } = api.timeslot.getManyByEvent.useQuery({ eventId });

  useEffect(() => {
    function runEffect() {
      if (
        !isTimeslotsLoading &&
        !isTimeslotsError &&
        timeslots.length === 1 &&
        timeslots[0]
      ) {
        onChange(timeslots[0].id);
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [timeslots, isTimeslotsLoading, isTimeslotsError]);

  return (
    <section>
      {isEventLoading ? (
        <p>Event loading...</p>
      ) : isEventError ? (
        <p>An error occurred: {eventError.message}</p>
      ) : (
        <h2 className="text-xl font-medium">Timeslots for {event.name}</h2>
      )}
      {isMinLoading || isTimeslotsLoading ? (
        <p>Timeslots loading...</p>
      ) : isMinError || isTimeslotsError ? (
        <p>An error occurred: {timeslotsError?.message ?? minError?.message}</p>
      ) : (
        <div className="flex flex-col">
          {timeslots.map((timeslot) => (
            <Timeslot
              key={timeslot.id}
              startTime={timeslot.startTime}
              endTime={timeslot.endTime}
              disabled={timeslot.remainingSlots < min}
              selected={timeslot.id === selectedId}
              onClick={() => onChange(timeslot.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
