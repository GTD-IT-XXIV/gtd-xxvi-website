"use client";

import { useAtom } from "jotai";
import { useState } from "react";

import { Card, CardContent } from "@/app/_components/ui/card";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { actionAtom, indexAtom } from "@/lib/atoms/committee";
import { PORTFOLIOS } from "@/lib/constants";

export default function CommiteesHeader() {
  const [index, setIndex] = useAtom(indexAtom);
  const [api, setApi] = useState<CarouselApi>();

  const [_, setAction] = useAtom(actionAtom);
  const handleNext = () => {
    setAction("NEXT");
    setIndex((index + 1) % PORTFOLIOS.length);
    api?.scrollNext();
  };
  const handlePrevious = () => {
    setIndex((index - 1 + PORTFOLIOS.length) % PORTFOLIOS.length);
    setAction("PREV");
    api?.scrollPrev();
  };
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
      >
        {/* Explore here https://www.embla-carousel.com/ for more */}
        {/* Note that loop = true can be used too to cater towards ƒigma design, yet IMO for now, this is better 
      as it does not show other portfolios when it is not relevant
       */}
        <CarouselContent>
          {PORTFOLIOS.map((portfolio) => (
            // we want to for full + 2 halves in a row
            <CarouselItem className="basis" key={portfolio}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{portfolio}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </Carousel>
    </>
  );
}
