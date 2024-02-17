"use client";

import { api } from "@/lib/trpc/client";
import { type MerchCartItem } from "@/lib/types";

import MerchItemLoading from "./loading";

export type MerchItemProps = MerchCartItem;

export default function MerchItem({
  quantity,
  merchBundleId,
  merch,
}: MerchItemProps) {
  const {
    data: merchBundle,
    isLoading,
    isError,
  } = api.merchBundle.getById.useQuery({ id: merchBundleId });

  if (isLoading) {
    return <MerchItemLoading />;
  }
  if (isError || !merchBundle) {
    return null;
  }

  const merchFromQuery = merchBundle.bundleItems.map((item) => item.merch);

  const merchNames = merchFromQuery.map((item) => item.name).join(", ");

  const merchWithName = merch.map((merchItem) => {
    const merchData = merchFromQuery.find((merch) => merch.id === merchItem.id);
    return {
      ...merchItem,
      name: merchData?.name,
    };
  });

  return (
    <div className="flex text-gtd-secondary-20 font-medium">
      <div className="my-1.5 w-5/6">
        <div className="my-1">
          {quantity} x {merchBundle.name}{" "}
          {merchNames !== merchBundle.name && `(${merchNames})`}
        </div>
        <div className="text-sm my-1 text-gtd-secondary-10 font-light">
          {merchWithName.map((merch) => (
            <p key={merch.id}>
              {merch.name ?? (
                <span className="text-red-600">Item not found</span>
              )}{" "}
              Variation:{" "}
              {merch.variation ?? (
                <span className="text-red-600">No variation selected</span>
              )}
            </p>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end my-2 w-1/6">
        ${merchBundle.price.toString()}
      </div>
    </div>
  );
}
