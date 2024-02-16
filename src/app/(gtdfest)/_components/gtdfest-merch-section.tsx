"use client";

import Image from "next/image";

import { api } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export default function GTDFestMerchSection() {
  const {
    data: merchs,
    isLoading,
    isError,
  } = api.merchBundle.getAll.useQuery();

  if (isLoading) {
    return null;
  }
  if (isError) {
    return null;
  }

  return (
    <section className="relative p-12 space-y-4 bg-repeat bg-[url('/merch-background.png')] bg-[length:200px_200px]">
      <h2 className="font-serif text-center text-4xl mb-6">
        Enchantium Merchandise
      </h2>
      <div className="flex justify-center items-center backdrop-blur flex-wrap rounded-lg">
        {merchs.map((merch) => (
          <div className="relative basis-64 shrink">
            <Image
              src={merch.images[0]!}
              width={1080}
              height={1080}
              alt={merch.name}
              className={cn(
                "aspect-square object-contain",
                merch.name === "Reversible Lanyard"
                  ? "scale-75"
                  : merch.name === "Shirt"
                    ? "bg-white rounded-lg"
                    : "",
              )}
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
