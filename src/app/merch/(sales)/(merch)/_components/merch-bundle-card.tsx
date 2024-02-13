"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { name, price, images, stock } = merchBundle;
  const merchNames = merchBundle.bundleItems
    .map((item) => item.merch.name)
    .join(", ");
  const available = stock > 0;

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
            <div>
              {merchBundle.bundleItems.length > 1 && (
                <p className="text-sm mb-1.5">{item.merch.name}</p>
              )}
              {
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a variation" />
                  </SelectTrigger>
                  <SelectContent>
                    {item.merch.variations.map((variation) => (
                      <SelectItem value={variation}>{variation}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              }
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          {available ? (
            <>
              <button
                className={cn(
                  "text-white rounded-full text-sm size-5 aspect-square bg-gtd-primary-30 hover:bg-gtd-primary-30/85",
                  // amount === 0 ? "opacity-60 pointer-events-none" : "",
                )}
              >
                -
              </button>
              <p>{/* amount */}0</p>
              <button
                className={cn(
                  "text-white rounded-full text-sm size-5 aspect-square bg-gtd-primary-30 hover:bg-gtd-primary-30/85",
                  // amount === bundle.maxPurchases
                  //   ? "opacity-60 pointer-events-none"
                  //   : "",
                )}
              >
                +
              </button>
            </>
          ) : (
            <p className="text-red-800 text-sm">Sold Out</p>
          )}
        </div>
      </div>
    </section>
  );
}
