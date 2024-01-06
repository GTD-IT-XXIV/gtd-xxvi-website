"use client";

import { Prisma } from "@prisma/client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { eventDetailsAtom } from "@/lib/atoms/events-registration";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/provider";

export default function BundlePopupContent({
  eventId,
  eventName,
}: {
  eventId: number;
  eventName: string;
}) {
  const [bundlesAvailability, setBundlesAvailability] = useState<Record<
    number,
    boolean
  > | null>(null);
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);

  const { data: bundles, isLoading: bundlesIsLoading } =
    api.bundles.getManyByEvent.useQuery(eventId);
  const { data: timeslots, isLoading: timeslotsIsLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);

  function getBundlesAvailability() {
    const totalTimeslots =
      timeslots?.reduce((sum, timeslot) => sum + timeslot.remainingSlots, 0) ??
      0;
    return (
      bundles?.reduce(
        (accum, bundle) => ({
          ...accum,
          [bundle.id]:
            (bundle.remainingAmount === null || bundle.remainingAmount > 0) &&
            bundle.quantity <= totalTimeslots,
        }),
        {} as Record<number, boolean>,
      ) ?? {}
    );
  }

  function selectBundle(bundleId: number) {
    if (eventDetails[eventId]) {
      setEventDetails({
        ...eventDetails,
        [eventId]: {
          name: eventName,
          quantity: 1,
          timeslot: eventDetails[eventId]?.timeslot ?? null,
          bundle: bundles!.find((bundle) => bundle.id === bundleId)!,
        },
      });
    }
  }

  function changeQuantity(amount: number) {
    if (eventDetails[eventId]) {
      setEventDetails({
        ...eventDetails,
        [eventId]: {
          ...eventDetails[eventId]!,
          quantity: amount,
        },
      });
    }
  }

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      if (!bundlesIsLoading && !timeslotsIsLoading) {
        const newBundlesAvailability = getBundlesAvailability();
        const newEventDetails = { ...eventDetails };
        // deselect if bundle no longer available
        if (
          newEventDetails[eventId]?.bundle &&
          !newBundlesAvailability[newEventDetails[eventId]!.bundle!.id]
        ) {
          newEventDetails[eventId]!.bundle = null;
        }
        setEventDetails(newEventDetails);
        setBundlesAvailability(newBundlesAvailability);
      }
    }
    return () => {
      ignored = true;
    };
  }, [bundlesIsLoading, timeslotsIsLoading]);

  return (
    <section>
      <h2 className="text-xl font-medium">{eventName} Bundles</h2>
      {bundlesIsLoading ? (
        <p>Loading...</p>
      ) : !bundles || bundles.length === 0 ? (
        <p>Bundles not found</p>
      ) : (
        bundles.map((bundle) => (
          <section key={bundle.id}>
            <h3 className="text-lg">
              {bundle.name} - {bundle.quantity}
            </h3>
            <p>${new Prisma.Decimal(bundle.price).toString()}</p>
            <button
              type="button"
              className={cn(
                "p-2 bg-slate-200 enabled:hover:bg-slate-100 disabled:text-slate-400",
                eventDetails[eventId]?.bundle &&
                  eventDetails[eventId]!.bundle!.id === bundle.id
                  ? "border-2 border-green-500"
                  : "",
              )}
              onClick={() => selectBundle(bundle.id)}
              disabled={!bundlesAvailability || !bundlesAvailability[bundle.id]}
            >
              Select Bundle
            </button>
            {!!eventDetails[eventId]?.bundle &&
              eventDetails[eventId]!.bundle!.id === bundle.id && (
                <input
                  type="number"
                  min={1}
                  value={eventDetails[eventId]!.quantity}
                  onChange={({ target }) =>
                    changeQuantity(parseInt(target.value))
                  }
                  className="border border-black"
                />
              )}
          </section>
        ))
      )}
    </section>
  );
}
