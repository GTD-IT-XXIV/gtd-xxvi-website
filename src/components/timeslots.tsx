"use client";

import { api } from "@/trpc/provider";

import Timeslot from "./timeslot";

export default function Timeslots({
  eventId,
  eventName,
}: {
  eventId: number;
  eventName: string;
}) {
  const { data: timeslots, isLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);

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
