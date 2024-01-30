import { TRPCClientError } from "@trpc/client";
import React from "react";

import { api } from "@/server/trpc";

import BundleCard from "./bundle-card";

export default async function EventCardGroup({ eventId }: { eventId: number }) {
  try {
    const event = await api.event.getById.query({ id: eventId });
    const bundles = await api.bundle.getManyByEvent.query({
      eventId,
      open: true,
    });

    const bundleIds = bundles.map((bundle) => bundle.id);

    return (
      <div className="flex flex-col items-center space-y-4 md:grow">
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
  } catch (error) {
    if (error instanceof TRPCClientError) {
      throw new Error("EventCardGroupTRPCError");
    }
    throw error;
  }
}
