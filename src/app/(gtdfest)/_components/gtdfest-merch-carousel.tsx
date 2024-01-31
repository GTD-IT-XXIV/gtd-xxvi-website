"use client";

import { type Variants, motion } from "framer-motion";
import Image from "next/image";
import React, { type ReactElement, useEffect, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type Merch } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconVariants: Variants = {
  open: { opacity: 1 },
  close: { opacity: 0, height: 0 },
};

export type MerchCarouselProps = {
  merchs: (Merch & { icon: string })[];
};

export default function GTDFestMerchCarousel({ merchs }: MerchCarouselProps) {
  const [selected, setSelected] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  function handleClick(index: number) {
    setSelected(index);
    if (!api) {
      return;
    }
    api.scrollTo(index);
  }

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", (api) => {
      setSelected(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="px-12 py-6 space-y-4 bg-repeat bg-[url('/merch-background.png')] bg-[length:200px_200px]">
      {/* Button Groups */}
      <div className="w-full flex justify-center gap-4 md:gap-16 h-28 md:h-56">
        {merchs.map((merch, idx) => (
          <motion.button
            key={merch.name}
            type="button"
            onClick={() => handleClick(idx)}
            className="block h-fit bg-slate-800 py-3 md:py-8 px-4 md:px-10 rounded-lg"
          >
            <motion.div
              animate={idx === selected ? "open" : "close"}
              variants={iconVariants}
            >
              <Image
                src={merch.icon}
                alt="Merch Logo"
                className="w-full object-cover"
              />
            </motion.div>
            <motion.p
              layout
              transition={{ delay: 0.2 }}
              className={cn(
                "font-serif text-nowrap md:text-3xl",
                idx === selected ? "mt-2 md:mt-6" : "",
              )}
            >
              {merch.name}
            </motion.p>
          </motion.button>
        ))}
      </div>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {merchs.map((merch) => (
            <CarouselItem key={merch.name}>
              <section className="relative">
                <Image
                  src={merch.image}
                  alt="Merch 1"
                  className="h-auto w-full aspect-[1/1.2] md:aspect-[2/1] object-cover"
                />
                <hgroup className="absolute inset-0 p-12 flex flex-col justify-end gap-2">
                  <h2 className="font-serif text-4xl">{merch.name}</h2>
                  <p className="font-light">{merch.description}</p>
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
