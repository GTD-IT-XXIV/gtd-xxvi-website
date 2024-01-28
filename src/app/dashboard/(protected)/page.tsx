"use client";

import { DatePickerWithRange } from "@/components/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/lib/trpc/client";

import { EventCard } from "./_components/event-card";
import { EventSelect } from "./_components/event-select";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/52 GitHub Issue}
 */
export default function DashboardHomePage() {
  const { data: events } = api.event.getAll.useQuery();
  return (
    <div className="pt-5 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <EventSelect events={events ?? []} />
          <DatePickerWithRange />
        </div>
        <div className="flex flex-col gap-4">
          {events?.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
      </div>
    </div>
  );
}
