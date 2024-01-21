/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/57 GitHub Issue}
 */
"use client";

import { useAtom } from "jotai";

import { priceAtom, selectedAtom } from "@/lib/atoms/events-registration";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/57 GitHub Issue}
 */

export default function TotalPrice() {
  const [price] = useAtom(priceAtom);
  const [selected] = useAtom(selectedAtom);

  return (
    <div className="w-[100%] sticky bottom-0 bg-white flex justify-between items-end pt-2 pb-2">
      <div>
        <p className="text-gtd-secondary-10 text-sm mb-[2%]">
          {selected} Selected
        </p>
        <div className="text-gtd-secondary-20 text-sm">
          $<p className="text-2xl font-medium inline">{price.toNumber()}</p>
        </div>
      </div>
      <button className="bg-gtd-primary-30 text-white rounded-lg px-4 py-3">
        Next Page
      </button>
    </div>
  );
}
