import "client-only";

import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export type DashboardDataSelectProps = {
  selectedEvent?: string;
  onChange: (name: string) => void;
};

export default function DashboardDataSelect({
  selectedEvent = "",
  onChange,
}: DashboardDataSelectProps) {
  const { data: events, isPending, isError } = api.event.getAll.useQuery();
  const {
    data: bookingsCount,
    isPending: isCountPending,
    isError: isCountError,
  } = api.event.countBookingsByName.useQuery(
    { name: selectedEvent },
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
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value={0}>
          Select an Event
        </option>
        {isPending ? (
          <option disabled>Loading events...</option>
        ) : isError ? (
          <option disabled>An error occurred</option>
        ) : (
          events.map((event) => (
            <option key={event.name} value={event.name}>
              {event.name}
            </option>
          ))
        )}
      </select>
      {!!selectedEvent && (
        <div className="p-1 text-sm shrink flex items-center border border-l-0 border-slate-300 rounded-r-md px-4 py-2.5">
          {isCountPending ? (
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
