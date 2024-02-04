import { type Event } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EventSelect({ events, onValueChange }: EventSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an event" />
      </SelectTrigger>
      <SelectContent>
        {events.map((event) => (
          <SelectItem key={event.name} value={event.name}>
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
