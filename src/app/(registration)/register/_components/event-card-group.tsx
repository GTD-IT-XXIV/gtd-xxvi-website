import React from "react";

import { api } from "@/server/trpc";

import BundleCard from "./bundle-card";

export default async function EventCardGroup({ eventId }: { eventId: number }) {
  const event = await api.event.getById.query({ id: eventId });
  const bundles = await api.bundle.getManyByEvent.query({ eventId });

  const bundleIds = bundles.map((bundle) => bundle.id);

  return (
    <div className="flex flex-col items-center space-y-4">
      {bundleIds.map((bundleId) => (
        <BundleCard
          key={bundleId}
          event={{
            id: event.id,
            name: event.name,
            startDate: event.startDate,
            location: event.location,
          }}
          bundleId={bundleId}
        />
      ))}
    </div>
  );
}
