import "client-only";

import { MAX_BUNDLE_PURCHASES } from "@/lib/constants";
import { api } from "@/lib/trpc/client";

import BundleOption from "./bundle-option";

export type BundleSelectProps = {
  eventId: number;
  quantity?: number;
  selectedId?: number;
  onChange: (id: number, quantity: number) => void;
};

export default function BundleSelect({
  eventId,
  quantity = 0,
  selectedId = 0,
  onChange,
}: BundleSelectProps) {
  const {
    data: event,
    error: eventError,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getById.useQuery({ id: eventId });
  const {
    data: bundles,
    error: bundlesError,
    isLoading: isBundlesLoading,
    isError: isBundlesError,
  } = api.bundle.getManyByEvent.useQuery({ eventId });

  return (
    <section>
      {isEventLoading ? (
        <p>Event loading...</p>
      ) : isEventError ? (
        <p>An error occurred: ${eventError.message}</p>
      ) : (
        <h2 className="text-xl font-medium">Bundles for {event.name}</h2>
      )}
      {isBundlesLoading ? (
        <p>Bundles loading...</p>
      ) : isBundlesError ? (
        <p>An error occurred: ${bundlesError.message}</p>
      ) : (
        bundles.map((bundle) => (
          <BundleOption
            key={bundle.id}
            bundle={bundle}
            quantity={bundle.id === selectedId ? quantity : 1}
            max={bundle.remainingAmount ?? MAX_BUNDLE_PURCHASES}
            selected={bundle.id === selectedId}
            disabled={
              bundle.remainingAmount !== null && bundle.remainingAmount <= 0
            }
            onClick={() => onChange(bundle.id, bundle.id === selectedId ? quantity : 1)}
            onChange={({ target }) => { console.log({val: target.value})
              onChange(bundle.id, Number(!!target.value ? target.value : 0))}
            }
          />
        ))
      )}
    </section>
  );
}
