import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Event } from "@/lib/types";

export function EventSelect({ events, onValueChange }: EventSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an event" />
      </SelectTrigger>
      <SelectContent>
        {events.map((event) => (
          <SelectItem key={event.id} value={event.name}>
            {event.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type EventSelectProps = {
  events: Event[];
  onValueChange: (eventName: string) => void;
};
