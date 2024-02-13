"use client";

import { useAtom } from "jotai";

import QuantitySelect from "@/components/quantity-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { merchCartAtom } from "@/lib/atoms/merch";
import { useHasMounted } from "@/lib/hooks";
import { type RouterOutputs } from "@/lib/trpc/utils";
import { type ArrElement, cn } from "@/lib/utils";

import MerchBundleCardCarousel from "./merch-bundle-card-carousel";

export type MerchBundleCardProps = {
  merchBundle: Omit<
    ArrElement<RouterOutputs["merchBundle"]["getAll"]>,
    "price"
  > & { price: number };
  className?: string;
};

export default function MerchBundleCard({
  merchBundle,
  className = "",
}: MerchBundleCardProps) {
  const hasMounted = useHasMounted();
  const [merchCart, setMerchCart] = useAtom(merchCartAtom);

  const { name, price, images, stock } = merchBundle;
  const merchNames = merchBundle.bundleItems
    .map((item) => item.merch.name)
    .join(", ");
  const available = stock > 0;

  function handleChangeAmount(amount: number) {
    setMerchCart((prev) => {
      const clone = structuredClone(prev);
      const updateIdx = prev.findIndex(
        (item) => item.merchBundleId === merchBundle.id,
      );
      if (updateIdx === -1) {
        return clone.concat([
          {
            merchBundleId: merchBundle.id,
            quantity: amount,
            merch: merchBundle.bundleItems.map((item) => ({
              id: item.merchId,
            })),
          },
        ]);
      }
      const toUpdate = clone[updateIdx];
      // Unreachable code but necessary for type safety
      if (!toUpdate) {
        throw new Error("An error occurred");
      }
      toUpdate.quantity = amount;
      return clone;
    });
  }

  function handleChangeVariation(merchId: number, variation: string) {
    setMerchCart((prev) => {
      const clone = structuredClone(prev);
      const updateIdx = prev.findIndex(
        (item) => item.merchBundleId === merchBundle.id,
      );
      if (updateIdx === -1) {
        return clone.concat([
          {
            merchBundleId: merchBundle.id,
            quantity: 0,
            merch: merchBundle.bundleItems.map((item) =>
              item.merchId !== merchId
                ? {
                    id: item.merchId,
                  }
                : {
                    id: item.merchId,
                    variation,
                  },
            ),
          },
        ]);
      }
      const toUpdate = clone[updateIdx];
      // Unreachable code but necessary for type safety
      if (!toUpdate) {
        throw new Error("An error occurred");
      }
      const merchToUpdate = toUpdate.merch.find(
        (merch) => merch.id === merchId,
      );
      // Unreachable code but necessary for type safety
      if (!merchToUpdate) {
        throw new Error("An error occurred");
      }
      merchToUpdate.variation = variation;
      return clone;
    });
  }

  return (
    <section
      className={cn(
        "w-full flex flex-col basis-72 gap-4 border text-gtd-secondary-30 border-zinc-300 rounded-lg py-3",
        className,
      )}
    >
      <MerchBundleCardCarousel images={images} />
      <hgroup className="flex justify-between gap-4 text-gtd-secondary-20 font-medium text-xl px-3">
        <h2>
          {name}{" "}
          {merchNames !== name && (
            <span className="whitespace-nowrap">({merchNames})</span>
          )}
        </h2>
        <p>
          <span className="text-sm font-normal">$</span>
          {price}
        </p>
      </hgroup>
      <div className="flex justify-between gap-4 px-3">
        <div className="space-y-4">
          {merchBundle.bundleItems.map((item) => (
            <div key={`${item.merchId}-${item.merchBundleId}`}>
              {merchBundle.bundleItems.length > 1 && (
                <p className="text-sm mb-1.5">{item.merch.name}</p>
              )}
              {!hasMounted ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <Select
                  onValueChange={(value) =>
                    handleChangeVariation(item.merchId, value)
                  }
                  defaultValue={
                    merchCart
                      .find(
                        (cartItem) => cartItem.merchBundleId === merchBundle.id,
                      )
                      ?.merch.find((merchItem) => merchItem.id === item.merchId)
                      ?.variation
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a variation" />
                  </SelectTrigger>
                  <SelectContent>
                    {item.merch.variations.map((variation) => (
                      <SelectItem
                        key={`${item.merchId}-${item.merchBundleId}-${variation}`}
                        value={variation}
                      >
                        {variation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
        {available ? (
          <QuantitySelect
            value={
              merchCart.find((item) => item.merchBundleId === merchBundle.id)
                ?.quantity
            }
            onChange={handleChangeAmount}
            max={Math.min(20, merchBundle.stock)}
          />
        ) : (
          <p className="text-red-800 text-sm">Sold Out</p>
        )}
      </div>
    </section>
  );
}
