import { TRPCClientError } from "@trpc/client";
import React from "react";

import { api } from "@/server/trpc";

import BundleCard from "./bundle-card";

export default async function EventCardGroup({
  eventName,
}: {
  eventName: string;
}) {
  try {
    const event = await api.event.getByName({ name: eventName });
    const bundles = await api.bundle.getManyByEvent({
      event: eventName,
      open: true,
    });

    const bundleNames = bundles.map((bundle) => bundle.name);

    return (
      <div className="flex flex-col items-center space-y-4 md:grow">
        {bundleNames.map((bundleName) => (
          <BundleCard
            key={bundleName}
            event={{
              name: event.name,
              startDate: event.startDate,
              location: event.location,
            }}
            bundleName={bundleName}
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
