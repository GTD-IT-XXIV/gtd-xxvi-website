"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/app/_components/ui/card";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { indexAtom } from "@/lib/atoms/committee";
import { PORTFOLIOS } from "@/lib/constants";

export default function CommiteesHeader() {
  const [index, setIndex] = useAtom(indexAtom);
  const [api, setApi] = useState<CarouselApi>();

  const handleNext = () => {
    setIndex((index + 1) % PORTFOLIOS.length);
    api?.scrollNext();
  };
  const handlePrevious = () => {
    setIndex((index - 1 + PORTFOLIOS.length) % PORTFOLIOS.length);
    api?.scrollPrev();
  };

  useEffect(() => {
    if (!api || index === api.selectedScrollSnap()) {
      return;
    }
    setIndex(api.selectedScrollSnap());
  }, [api, index, setIndex]);

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          watchDrag: false,
          duration: 40,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {PORTFOLIOS.map((portfolio) => (
            // we want to for full + 2 halves in a row
            // TODO: replace with actual component
            <CarouselItem className="basis" key={portfolio}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-[200px] items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{portfolio}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-14" onClick={handlePrevious} />
        <CarouselNext className="-translate-x-14" onClick={handleNext} />
      </Carousel>
    </>
  );
}
