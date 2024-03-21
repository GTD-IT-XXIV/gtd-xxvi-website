"use client";

import { type Event } from "@prisma/client";
import { useEffect, useState } from "react";

import { DatePickerWithRange } from "@/components/date-range-picker";

import { api } from "@/lib/trpc/client";

import { EventCard } from "./event-card";
import { EventSelect } from "./event-select";

export default function DashboardHomeBody() {
  const { data, isPending, isError } = api.event.getAll.useQuery();
  const [events, setEvents] = useState<Event[]>([]);

  const handleFilter = (eventName: string, dateRange: unknown) => {
    // for now, we don't really have a way to filter based on dateRange. So it will not be used as of now
    setEvents(
      data?.filter((event) => eventName === "" || event.name === eventName) ??
        [],
    );
  };

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      if (!isPending && !isError) {
        setEvents(data);
      }
    }
    return () => {
      ignored = true;
    };
  }, [isPending, isError, data]);

  return (
    <div className="pt-5 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <EventSelect
            events={data ?? []}
            onValueChange={(eventName) => handleFilter(eventName, null)}
          />
          <DatePickerWithRange />
        </div>
        <div className="flex flex-col gap-4">
          {events?.map((event) => <EventCard event={event} key={event.name} />)}
        </div>
      </div>
    </div>
  );
}
