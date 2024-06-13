"use client";

import { type EmblaOptionsType } from "embla-carousel";
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

export default function CommitteesCarousel({
  committees,
  row,
}: CommitteesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const direction: Required<EmblaOptionsType>["direction"] =
    row % 2 === 0 ? "ltr" : "rtl";
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
  }, [api, index, action]);

  return (
    <Carousel
      opts={{
        align: "start",
        direction,
        loop: true,
        watchDrag: false,
      }}
      dir={direction}
      setApi={setApi}
    >
      <CarouselContent>
        {committees.map((portfolioCommittees, index) => (
          // we want to for full + 2 halves in a row
          <CarouselItem className="transition-opacity duration-100" key={index}>
            <div className="p-1 flex flex-row justify-around h-full">
              {portfolioCommittees.map((committee) => (
                // TODO: replace placeholder with actual component
                <Card key={committee.name}>
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
    </Carousel>
  );
}

export type CommitteesCarouselProps = {
  committees: Committee[][];
  row: number;
};
