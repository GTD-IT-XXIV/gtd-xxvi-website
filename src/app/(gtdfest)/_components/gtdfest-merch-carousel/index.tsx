"use client";

import { type Variants, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { api } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

import GTDFestMerchCarouselLoading from "./loading";

const iconVariants: Variants = {
  open: { opacity: 1 },
  close: { opacity: 0, height: 0 },
};

export default function GTDFestMerchCarousel() {
  const [selected, setSelected] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const { data, isLoading, isError } = api.merchBundle.getAll.useQuery();

  function handleClick(index: number) {
    setSelected(index);
    if (!carouselApi) {
      return;
    }
    carouselApi.scrollTo(index);
  }

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    carouselApi.on("select", (api) => {
      setSelected(api.selectedScrollSnap());
    });
  }, [carouselApi]);

  if (isLoading) {
    return <GTDFestMerchCarouselLoading />;
  }

  if (isError) {
    return null;
  }

  const merchs = structuredClone(data).sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
  );

  return (
    <section className="px-12 py-6 space-y-4 bg-repeat bg-[url('/merch-background.png')] bg-[length:200px_200px]">
      {/* Button Groups */}
      <div className="w-full flex justify-center gap-4 md:gap-16 h-36 md:h-52 lg:h-[16rem]">
        {merchs.map((merch, idx) => (
          <motion.button
            key={merch.name}
            type="button"
            onClick={() => handleClick(idx)}
            className="flex flex-col items-center h-fit w-24 md:w-36 lg:w-48 bg-slate-800 py-3 md:py-5 lg:py-8 px-4 md:px-6 lg:px-10 rounded-lg"
          >
            <motion.div
              animate={idx === selected ? "open" : "close"}
              variants={iconVariants}
            >
              <Image
                src={merch.images[0]!}
                width={1080}
                height={1080}
                alt={merch.name}
                className="w-32 aspect-square object-contain"
              />
            </motion.div>
            <motion.p
              layout
              transition={{ delay: 0.2 }}
              className={cn(
                "font-serif text-center md:text-2xl lg:text-3xl",
                idx === selected ? "mt-2 md:mt-3 lg:mt-6" : "",
              )}
            >
              {merch.name}
            </motion.p>
          </motion.button>
        ))}
      </div>

      <Carousel setApi={setCarouselApi} className="w-full">
        <CarouselContent>
          {merchs.map((merch) => (
            <CarouselItem key={merch.name}>
              <section className="relative">
                <div className="flex h-auto aspect-[1/1.2] md:aspect-[2/1] object-contain bg-slate-900/65 backdrop-blur">
                  {merch.images.map((img) => (
                    <Image
                      key={img}
                      src={img}
                      width={1080}
                      height={1080}
                      alt={merch.name}
                      className="object-contain grow"
                    />
                  ))}
                </div>
                <hgroup className="absolute inset-0 p-12 flex flex-col justify-end gap-2">
                  <h2 className="font-serif text-4xl">{merch.name}</h2>
                  {/* <p className="font-light">{merch.description}</p> */}
                </hgroup>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-8 bg-slate-700/85 hover:bg-slate-700/65 hover:text-inherit border-0" />
        <CarouselNext className="-translate-x-8 bg-slate-700/85 hover:bg-slate-700/65 hover:text-inherit border-0" />
      </Carousel>
    </section>
  );
}
