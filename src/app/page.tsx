"use client";

import dayjs from "dayjs";

import { api } from "@/trpc/provider";

export default function Home() {
  const { data: events, isLoading } = api.events.getAll.useQuery();
  const { data: event2, isLoading: isLoading2 } =
    api.events.getById.useQuery(2);
  const { data: event1, isLoading: isLoading1 } =
    api.events.getByName.useQuery("Test Event 1");

  if (isLoading || isLoading2 || isLoading1) return <main>Loading...</main>;

  console.log({ events, event1, event2 });

  return (
    <main>
      <ul className="space-y-4">
        {events?.map((event) => (
          <li key={event.id} className="block space-y-2">
            <h2 className="text-lg font-bold">{event.name}</h2>
            <p>{event.description}</p>
            <p>
              From {dayjs(event.startDate).format("M MMM YYYY")} to{" "}
              {dayjs(event.endDate).format("M MMM YYYY")}
            </p>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-6">Event ID: 2</h2>
      {event2?.name}, {event2?.description}
      <h2 className="text-2xl font-bold mt-3">Event Name: Test Event 1</h2>
      {event1?.name}, {event1?.description}
    </main>
  );
}
