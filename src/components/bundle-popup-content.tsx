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
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);
  const [bundlesAvailability, setBundlesAvailability] = useState<Record<
    number, // bundleId
    boolean
  > | null>(null);

  const { data: bundles, isLoading: bundlesIsLoading } =
    api.bundles.getManyByEvent.useQuery(eventId);
  const { data: timeslots, isLoading: timeslotsIsLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);

  /**
   * Calculates the bundles' avalability based on its quanitty and the remaining
   * timeslots.
   * @returns The bundles' availability as a record indexed by the bundles' id
   */
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

  /**
   * Save the selected bundle to the `eventDetails` storage atom. This should
   * be called after the component is mounted so that `eventDetails` is
   * synchronized with `localStorage`. This is called by the "Select Bundle"
   * button which is rendered for each bundle.
   * @param id - The selected bundle id
   */
  function selectBundle(id: number) {
    // Unreachable but necessary for typesafety
    if (!bundles) {
      throw new Error("Bundles not found");
    }
    setEventDetails({
      ...eventDetails,
      [eventId]: {
        name: eventName,
        quantity: 1,
        bundle: bundles.find((bundle) => bundle.id === id),
      },
    });
  }

  /**
   * Change quantity of the selected bundle. This should be called after the
   * component is mounted so that `eventDetails` is synchronized with
   * `localStorage`.
   * @param amount - The new quantity
   */
  function changeQuantity(amount: number) {
    // Unreachable but necessary for typesafety
    if (!eventDetails[eventId]) {
      throw new Error("Event detail not found");
    }
    setEventDetails({
      ...eventDetails,
      [eventId]: {
        ...eventDetails[eventId]!,
        quantity: amount,
      },
    });
  }

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      if (!bundlesIsLoading && !timeslotsIsLoading) {
        const newBundlesAvailability = getBundlesAvailability();
        const newEventDetails = { ...eventDetails };
        // Unreachable but necessary for typesafety
        if (!newEventDetails[eventId]) {
          throw new Error("Event detail not found");
        }
        // deselect if bundle is no longer available
        if (
          newEventDetails[eventId]!.bundle &&
          !newBundlesAvailability[newEventDetails[eventId]!.bundle!.id]
        ) {
          newEventDetails[eventId]!.bundle = undefined;
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
