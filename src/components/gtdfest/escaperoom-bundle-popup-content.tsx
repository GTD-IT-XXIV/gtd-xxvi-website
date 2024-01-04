"use client";

import { Prisma } from "@prisma/client";

import { api } from "@/trpc/provider";

export default function GTDFestBundlePopupContent() {
  // eventId 10 is Sample GTD Escape Room
  const { data: bundles, isLoading: bundlesIsLoading } =
    api.bundles.getManyByEvent.useQuery(10);
  const { data: timeslots, isLoading: timeslotsIsLoading } =
    api.timeslots.getManyByEvent.useQuery(10);
  let bundlesAvailability: Record<number, boolean> | null = null;

  if (!bundlesIsLoading && !timeslotsIsLoading) {
    // check bundles' availability
    const totalTimeslots =
      timeslots?.reduce((sum, timeslot) => sum + timeslot.remainingSlots, 0) ??
      0;
    bundlesAvailability =
      bundles?.reduce(
        (accum, bundle) => ({
          ...accum,
          [bundle.id]:
            (bundle.remainingAmount === null || bundle.remainingAmount > 0) &&
            bundle.quantity <= totalTimeslots,
        }),
        {} as Record<number, boolean>,
      ) ?? {};
  }

  function handleClick(bundleId: number) {
    console.log({ bundleId });
  }

  return (
    <section>
      <h2 className="text-xl font-medium">GTD Escape Room Bundles</h2>
      {bundlesIsLoading ? (
        <p>Loading...</p>
      ) : !bundles || bundles.length === 0 ? (
        <p>Bundles not found</p>
      ) : (
        bundles.map((bundle) => (
          <section key={bundle.id}>
            <h3 className="text-lg">
              {bundle.name} ({bundle.quantity})
            </h3>
            <p>${new Prisma.Decimal(bundle.price).toString()}</p>
            <button
              type="button"
              className="p-2 bg-slate-200 enabled:hover:bg-slate-100 disabled:text-slate-400"
              onClick={() => handleClick(bundle.id)}
              disabled={!bundlesAvailability || !bundlesAvailability[bundle.id]}
            >
              Select Bundle
            </button>
          </section>
        ))
      )}
    </section>
  );
}
