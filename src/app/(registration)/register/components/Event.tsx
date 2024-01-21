import React from "react";

import { api } from "@/server/trpc";

import BundleCard from "./BundleCard";

export default async function Event({ eventId }: { eventId: number }) {
  const bundles = await api.bundle.getManyByEvent.query({ eventId });

  const bundleIds = bundles.map((bundle) => bundle.id);

  return (
    <div className="flex flex-col items-center">
      {bundleIds.map((bundleId) => (
        <BundleCard
          key={bundleId}
          eventId={eventId}
          bundleId={bundleId - bundleIds[0]!}
        />
      ))}
    </div>
  );
}
