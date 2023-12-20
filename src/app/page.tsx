"use client";

import dayjs from "dayjs";

import { api } from "@/trpc/provider";

export default function Home() {
  const { data: singleEvent, isLoading: isLoadingSingleEvent } =
    api.events.getById.useQuery(1); // Assuming 1 is the event ID

  const { data: timeslotsForEvent, isLoading: isLoadingTimeslots } =
    api.timeslots.getAllForEvent.useQuery(1); // Assuming 1 is the event ID

  const { data: singleTimeslot, isLoading: isLoadingSingleTimeslot } =
    api.timeslots.getById.useQuery(1); // Assuming 1 is the timeslot ID

  if (isLoadingSingleEvent || isLoadingTimeslots || isLoadingSingleTimeslot) {
    return <main>Loading...</main>;
  }

  console.log({
    singleEvent,
    timeslotsForEvent,
    singleTimeslot,
  });

  return (
    <main>
      {/* Display single event */}
      <h2 className="text-2xl font-bold mt-6">Event</h2>
      {singleEvent && (
        <div>
          <h2 className="text-lg font-bold">{singleEvent.name}</h2>
          <p>{singleEvent.description}</p>
          <p>
            From {dayjs(singleEvent.startDate).format("M MMM YYYY")} to{" "}
            {dayjs(singleEvent.endDate).format("M MMM YYYY")}
          </p>
        </div>
      )}

      {/* Display timeslots for the specific event */}
      <h2 className="text-2xl font-bold mt-6">Timeslots for Event</h2>
      <ul className="space-y-4">
        {timeslotsForEvent?.map((timeslot) => (
          <li key={timeslot.id} className="block space-y-2">
            {/* Adjust rendering based on actual properties of timeslot */}
            <p>Timeslot ID: {timeslot.id}</p>
            <p>
              Start Time: {dayjs(timeslot.startTime).format("M MMM YYYY HH:mm")}
            </p>
            <p>
              End Time: {dayjs(timeslot.endTime).format("M MMM YYYY HH:mm")}
            </p>
          </li>
        ))}
      </ul>

      {/* Display specific timeslot */}
      <h2 className="text-2xl font-bold mt-6">Specific Timeslot</h2>
      {singleTimeslot && (
        <div>
          <p>Timeslot ID: {singleTimeslot.id}</p>
          <p>
            Start Time:{" "}
            {dayjs(singleTimeslot.startTime).format("M MMM YYYY HH:mm")}
          </p>
          <p>
            End Time: {dayjs(singleTimeslot.endTime).format("M MMM YYYY HH:mm")}
          </p>
        </div>
      )}
    </main>
  );
}
