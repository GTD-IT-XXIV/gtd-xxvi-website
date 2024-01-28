"use client";

import { useState } from "react";

import { DatePickerWithRange } from "@/components/date-range-picker";

import { api } from "@/lib/trpc/client";
import type { Event } from "@/lib/types";

import { EventCard } from "./_components/event-card";
import { EventSelect } from "./_components/event-select";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/52 GitHub Issue}
 */
export default function DashboardHomePage() {
  const { data } = api.event.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setEvents(data);
    },
  });
  const [events, setEvents] = useState<Event[]>([]);

  const handleFilter = (eventName: string, dateRange: unknown) => {
    // for now, we don't really have a way to filter based on dateRange. So it will not be used as of now
    setEvents(
      data?.filter((event) => eventName === "" || event.name === eventName) ??
        [],
    );
  };

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
          {events?.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
      </div>
    </div>
  );
}
