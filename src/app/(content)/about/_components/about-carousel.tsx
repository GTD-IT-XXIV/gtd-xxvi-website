"use client";

import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight, HiLightningBolt } from "react-icons/hi";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

import { animationName, colors, textColors, texts } from "../_constants/const";
import "../_styles/carousel.css";

const AboutCarousel = () => {
  const slides = [0, 1, 2, 3, 4, 5];
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [animationIndex, setAnimationIndex] = useState(0);

  const onPrev = (index: number) => {
    if (index === 1) {
      return;
    }
    api?.scrollPrev();
    setSelectedIndex(selectedIndex - 1);
    setAnimationIndex(1);
  };

  const onNext = (index: number) => {
    if (index === 4) {
      return;
    }
    api?.scrollNext();
    setSelectedIndex(selectedIndex + 1);
    setAnimationIndex(0);
  };

  return (
    <div className="w-full h-full mb-6">
      <Carousel
        className="w-full h-full"
        setApi={setApi}
        opts={{ startIndex: 1, slidesToScroll: 1 }}
      >
        <CarouselContent className="w-full h-full ml-0">
          {slides.map((index) => (
            <CarouselItem
              key={index}
              className={cn(colors[index], "basis-[85%] pl-0 aspect-video")}
            >
              {/* Content */}
              {/* TODO: add content images */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-full h-6 px-[7.5%] flex mt-2 justify-between">
          <div className="flex items-center">
            {slides.slice(1, 5).map((index) =>
              index === selectedIndex ? (
                <div
                  key={index}
                  className={cn(
                    "rounded-full w-5 h-5 flex items-center justify-center",
                    animationName[animationIndex],
                    "lightning-left",
                    "md:w-6 md:h-6 md:mx-1"
                  )}
                >
                  <HiLightningBolt
                    className={cn(textColors[index - 1], "h-6 w-6")}
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className={cn(
                    "px-1 mx-1 rounded-full w-3 h-3",
                    colors[index],
                    "md:w-4 md:h-4"
                  )}
                ></div>
              ),
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              className="embla__button embla__button--next hover:bg-slate-600 rounded-full p-1 text-white transition grid place-items-center"
              type="button"
              onClick={() => onPrev(selectedIndex)}
            >
              <HiChevronLeft className="size-6" />
            </button>
            <button
              className="embla__button embla__button--next hover:bg-slate-600 rounded-full p-1 text-white transition grid place-items-center"
              type="button"
              onClick={() => onNext(selectedIndex)}
            >
              <HiChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </Carousel>

      <div className="px-[7.5%] md:w-[50vw] md:mx-auto md:mt-6">
        {texts.map((text, index) => (
          <div
            key={index}
            className="test text-xs font-light text-white md:text-lg"
            hidden={selectedIndex - 1 !== index}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AboutCarousel;
