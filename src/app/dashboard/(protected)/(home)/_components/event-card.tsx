import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/trpc/client";

export function EventCard({ event }: EventCardProps) {
  const { data: count } = api.ticket.getCountByEvent.useQuery({
    eventId: event.id,
  });

  return (
    <Link href={`/dashboard/${event.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>Tickets Registered {count ?? 0}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

type EventCardProps = {
  event: {
    id: number;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
  };
};
