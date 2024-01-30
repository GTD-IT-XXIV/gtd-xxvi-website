"use client";

import { type Variants, motion } from "framer-motion";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const buttonVariants: Variants = {
  open: { opacity: 1 },
  close: { opacity: 0, height: 0 },
};

export type MerchCarouselProps = {
  merchs: (Merch & { icon: string | StaticImport })[];
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
      <div className="w-full flex justify-center gap-4 h-28 overflow-scroll">
        {merchs.map((merch, idx) => (
          <motion.button
            layout
            key={merch.name}
            type="button"
            onClick={() => handleClick(idx)}
            className="block h-fit bg-slate-800 py-3 px-4 rounded-lg"
          >
            <motion.div
              animate={idx === selected ? "open" : "close"}
              variants={buttonVariants}
            >
              <Image src={merch.icon} alt={`${merch.name} Icon`} />
            </motion.div>
            <motion.p
              layout
              transition={{ delay: 0.2 }}
              className={cn(
                "font-serif text-nowrap",
                idx === selected ? "mt-2" : "",
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
                  className="aspect-[1/1.2] object-cover"
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
