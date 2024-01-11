import "client-only";

import { MAX_BUNDLE_PURCHASES } from "@/lib/constants";
import { api } from "@/lib/trpc/provider";
import { getBundlesAvailability } from "@/lib/utils";

import BundleOption from "./bundle-option";

export type BundleSelectProps = {
  eventId: number;
  selectedBundle: {
    id: number;
    amount: number;
  };
  onChangeBundle: (id: number) => void;
  onChangeAmount: (amount: number) => void;
};

export default function BundleSelect({
  eventId,
  selectedBundle,
  onChangeBundle,
  onChangeAmount,
}: BundleSelectProps) {
  const { data: event, isLoading: isEventLoading } =
    api.events.getById.useQuery(eventId);
  const { data: bundles, isLoading: isBundlesLoading } =
    api.bundles.getManyByEvent.useQuery(eventId);
  const { data: timeslots, isLoading: isTimeslotsLoading } =
    api.timeslots.getManyByEvent.useQuery(eventId);

  const isLoading = isEventLoading || isBundlesLoading || isTimeslotsLoading;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (
    !event ||
    !bundles ||
    !timeslots ||
    bundles.length === 0 ||
    timeslots.length === 0
  ) {
    return <p>Bundle details not found</p>;
  }

  const bundlesWithAvailability = getBundlesAvailability(bundles, timeslots);
  console.log({ bundles: bundlesWithAvailability });

  return (
    <section>
      <h2 className="text-xl font-medium">{event.name} Bundles</h2>
      {bundlesWithAvailability.map((bundle) => {
        const isSelected = bundle.id === selectedBundle.id;
        return (
          <BundleOption
            key={bundle.id}
            bundle={bundle}
            selected={isSelected}
            disabled={!bundle.isAvailable}
            onSelect={() => onChangeBundle(bundle.id)}
            amount={isSelected ? selectedBundle.amount : 1}
            maxAmount={bundle.remainingAmount ?? MAX_BUNDLE_PURCHASES}
            setAmount={(amount) => onChangeAmount(amount)}
          />
        );
      })}
    </section>
  );
}
