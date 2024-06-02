"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/app/_components/ui/card";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { actionAtom, indexAtom } from "@/lib/atoms/committee";
import { type Committee } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function CommitteesCarousel({
  committees,
  row,
}: CommitteesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const direction = row % 2 === 0 ? "ltr" : "rtl";
  const [action] = useAtom(actionAtom);
  const [index] = useAtom(indexAtom);
  useEffect(() => {
    if (!api) {
      return;
    }

    if (action === "NEXT") {
      api.scrollNext();
    }
    if (action === "PREV") {
      api.scrollPrev();
    }
  }, [api, index]);
  return (
    <Carousel
      opts={{
        align: "start",
        direction,
        loop: true,
      }}
      dir={direction}
      setApi={setApi}
    >
      {/* Explore here https://www.embla-carousel.com/ for more */}
      {/* Note that loop = true can be used too to cater towards ƒigma design, yet IMO for now, this is better 
      as it does not show other committees when it is not relevant
       */}
      <CarouselContent>
        {committees.map((portfolioCommittees, index) => (
          // we want to for full + 2 halves in a row
          <CarouselItem
            className={cn(
              // startIndex === -1 ? "opacity-0" : "opacity-1",
              "transition-opacity duration-100",
            )}
            key={index}
          >
            <div className="p-1 flex flex-row justify-around h-full">
              {portfolioCommittees.map((committee) => (
                <Card key={committee.name}>
                  {/* For now it is fixed so that it is uniform 
                    Can dynamically changed but recommended to be fixed
                  */}
                  <CardContent className="flex aspect-square items-center justify-center p-6 w-40">
                    <span className="text-3xl font-semibold">
                      {committee.name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* When developing one into the real version, these next and prev buttons need to be commented so that it can only be controlled by above*/}
    </Carousel>
  );
}

type CommitteesCarouselProps = {
  committees: Committee[][];
  row: number;
};
