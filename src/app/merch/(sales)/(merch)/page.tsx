import { type Metadata } from "next";

import MerchGenericLayout from "@/app/merch/_components/merch-generic-layout";

import { api } from "@/server/trpc";

import MerchBundleCard from "./_components/merch-bundle-card";
import MerchPageFooter from "./_components/merch-page-footer";

export const metadata: Metadata = {
  title: "Merchandise Sales",
};

export default async function MerchPage() {
  const merchBundles = await api.merchBundle.getAll();
  return (
    <MerchGenericLayout
      title="Merchandise Sales"
      subtitle="Choose merchandise you wish to purchase"
      body={
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start mt-6">
          {merchBundles.map((merchBundle) => (
            <MerchBundleCard
              key={merchBundle.id}
              merchBundle={{
                ...merchBundle,
                price: merchBundle.price.toNumber(),
              }}
            />
          ))}
        </div>
      }
      footer={<MerchPageFooter className="sticky bottom-0" />}
    />
  );
}
