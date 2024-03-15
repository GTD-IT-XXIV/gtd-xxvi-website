import { type Metadata } from "next";
import Link from "next/link";

import { api } from "@/server/trpc";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await api.event.getAll();

  return (
    <section>
      <h1>Events Page</h1>
      {events.map((event) => (
        <Link
          key={event.name}
          href={`/events/${event.name.split(" ").join("_")}`}
          className="block text-blue-600 hover:underline"
        >
          link to {event.name} page
        </Link>
      ))}
    </section>
  );
}
