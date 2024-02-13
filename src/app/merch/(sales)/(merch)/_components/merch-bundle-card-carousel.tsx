"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

export type MerchBundleCardCarouselProps = {
  images: string[];
  className?: string;
};

export default function MerchBundleCardCarousel({
  images,
  className = "",
}: MerchBundleCardCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <Carousel setApi={setApi} className={cn("w-full", className)}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={idx}>
            <Image
              src={image}
              alt="Merchandise preview photo"
              width={1080}
              height={1080}
              className="w-full object-contain aspect-[4/3]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="translate-x-14 border-0 bg-transparent" />
      <CarouselNext className="-translate-x-14 border-0 bg-transparent" />
    </Carousel>
  );
}
