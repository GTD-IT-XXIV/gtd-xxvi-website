import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/trpc/client";

export function EventCard({ event }: EventCardProps) {
  const { data: count } = api.ticket.countByEvent.useQuery({
    event: event.name,
  });

  return (
    <Link href={`/dashboard/${event.name}`}>
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
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
  };
};
