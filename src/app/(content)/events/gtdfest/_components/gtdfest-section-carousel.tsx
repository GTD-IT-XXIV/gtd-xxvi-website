"use client";

import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";

import { cn } from "@/lib/utils";

export type GTDFestSectionCarouselProps = {
  images: { src: StaticImport; alt: string }[];
  className?: string;
};

export default function GTDFestSectionCarousel({
  images,
  className = "",
}: GTDFestSectionCarouselProps) {
  const [_, setApi] = useState<CarouselApi>();

  return (
    <Carousel setApi={setApi} className={cn("", className)}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={idx}>
            <Image
              src={image.src}
              alt={image.alt}
              placeholder="blur"
              className="object-contain rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="translate-x-14 border-0 bg-transparent" />
      <CarouselNext className="-translate-x-14 border-0 bg-transparent" />
    </Carousel>
  );
}
