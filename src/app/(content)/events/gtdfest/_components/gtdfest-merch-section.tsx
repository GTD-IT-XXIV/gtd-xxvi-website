"use client";

import MerchItemCarousel from "@/app/_components/merch-item-carousel";

import { api } from "@/lib/trpc/client";

export default function GTDFestMerchSection() {
  const {
    data: merchs,
    isPending,
    isError,
  } = api.merchBundle.getAll.useQuery();

  if (isPending) {
    return null;
  }
  if (isError) {
    return null;
  }

  return (
    <section className="relative p-12 space-y-4 bg-repeat bg-[url('/merch-background.png')] bg-[length:200px_200px]">
      <h2 className="font-serif text-center text-4xl mb-10">
        Enchantium Merchandise
      </h2>
      <div className="flex gap-6 justify-center items-stretch backdrop-blur flex-wrap rounded-lg p-6">
        {merchs.map((merch) => (
          <div key={merch.id} className="basis-64 shrink">
            <MerchItemCarousel
              images={merch.images}
              variant={
                merch.name === "Reversible Lanyard" ? "default" : "square"
              }
              className="bg-white aspect-square flex items-center justify-center rounded-lg"
            />
            <h3 className="font-serif text-center text-3xl py-6 px-12">
              {merch.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
