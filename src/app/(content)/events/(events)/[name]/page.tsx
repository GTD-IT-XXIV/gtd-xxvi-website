import { type Metadata } from "next";
import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";

import { api } from "@/server/trpc";

import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const event = await api.event.getByName.query({ name });

  return { title: event.name };
}

export default async function EventPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const event = await api.event.getByName.query({ name });

  const breadcrumb: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Events",
        item: `${BASE_URL}/events`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: event.name,
      },
    ] satisfies ListItem[],
  };
  return (
    <h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      Event {params.name} page
    </h1>
  );
}