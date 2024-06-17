"use client";

import { type EmblaOptionsType } from "embla-carousel";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { indexAtom } from "@/lib/atoms/committee";
import { DEFAULT_COMMITTEE_COLS, PORTFOLIOS } from "@/lib/constants";
import { type Committee } from "@/lib/types";
import { cn } from "@/lib/utils";

import CommiteeCard from "./committee-card";

export default function CommitteesCarousel({
  committees,
  row,
  cols = DEFAULT_COMMITTEE_COLS,
}: CommitteesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const direction: Required<EmblaOptionsType>["direction"] =
    row % 2 === 0 ? "ltr" : "rtl";
  const currentIndex = useAtomValue(indexAtom);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry?.isIntersecting ?? false);
        },
        { rootMargin: "128px" },
      ),
    [],
  );

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }
    observer.observe(carouselRef.current);
    return () => {
      observer.disconnect();
    };
  }, [carouselRef, observer]);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollTo(currentIndex);
  }, [api, currentIndex]);

  const prevIndex = (currentIndex - 1 + PORTFOLIOS.length) % PORTFOLIOS.length;
  const nextIndex = (currentIndex + 1) % PORTFOLIOS.length;

  return (
    <Carousel
      ref={carouselRef}
      opts={{
        align: "start",
        direction,
        loop: true,
        watchDrag: false,
        duration: 40,
      }}
      dir={direction}
      setApi={setApi}
      className={cn(isIntersecting ? "visibile" : "invisible")}
    >
      <CarouselContent>
        {committees.map((portfolioCommittees, index) => (
          // we want to for full + 2 halves in a row
          <CarouselItem
            key={PORTFOLIOS[index]}
            className={cn(
              "flex justify-around h-full",
              direction === "ltr" ? "flex-row" : "flex-row-reverse",
              [prevIndex, currentIndex, nextIndex].includes(index)
                ? "visible"
                : "invisible",
            )}
          >
            {portfolioCommittees.map((committee) => (
              <CommiteeCard
                key={committee.name}
                committee={committee}
                className="mx-3 sm:mx-5 md:mx-6 lg:mx-7 xl:mx-10"
                style={{
                  width: `${100 / cols}%`,
                }}
              />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export type CommitteesCarouselProps = {
  committees: Committee[][];
  row: number;
  cols: number;
};
