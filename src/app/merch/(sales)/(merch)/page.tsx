import { api } from "@/server/trpc";

import MerchBundleCard from "./_components/merch-bundle-card";

export default async function MerchPage() {
  const merchBundles = await api.merchBundle.getAll.query();
  return (
    <section className="grow flex flex-col md:px-10 lg:px-24">
      <article className="flex-1 p-5 pt-10 space-y-10">
        <hgroup className="space-y-1">
          <h1 className="text-gtd-primary-30 font-semibold text-3xl">
            Merchandise Sales
          </h1>
          <p className="text-sm font-light">
            Choose merchandise you wish to purchase
          </p>
        </hgroup>
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
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
      </article>
    </section>
  );
}
