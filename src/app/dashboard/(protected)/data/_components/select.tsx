import "client-only";

import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export type DashboardDataSelectProps = {
  selectedEvent?: number;
  onChange: (id: number) => void;
};

export default function DashboardDataSelect({
  selectedEvent = 0,
  onChange,
}: DashboardDataSelectProps) {
  const { data: events, isLoading, isError } = api.event.getAll.useQuery();
  const {
    data: bookingsCount,
    isLoading: isCountLoading,
    isError: isCountError,
  } = api.event.countBookingsById.useQuery(
    { id: selectedEvent },
    { enabled: !!selectedEvent },
  );

  return (
    <div className="my-2 flex">
      <select
        className={cn(
          "border border-slate-300 rounded-l-md px-2 py-2.5 shrink text-sm focus:outline-none",
          selectedEvent ? "" : "rounded-r-md",
        )}
        value={selectedEvent}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option disabled value={0}>
          Select an Event
        </option>
        {isLoading ? (
          <option disabled>Loading events...</option>
        ) : isError ? (
          <option disabled>An error occurred</option>
        ) : (
          events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))
        )}
      </select>
      {!!selectedEvent && (
        <div className="p-1 text-sm shrink flex items-center border border-l-0 border-slate-300 rounded-r-md px-4 py-2.5">
          {isCountLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : isCountError ? (
            <span>Error</span>
          ) : (
            <span>{bookingsCount} Bookings</span>
          )}
        </div>
      )}
    </div>
  );
}
