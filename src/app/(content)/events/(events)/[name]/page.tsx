import { type Metadata } from "next";

import { api } from "@/server/trpc";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const event = await api.event.getByName.query({ name });

  return { title: event.name };
}

export default function EventPage({ params }: { params: { name: string } }) {
  return <h1>Event {params.name} page</h1>;
}
