"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

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

import CommitteeHeaderBg from "./committee-header-bg";

const videoSrc = {
  vp9: "https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/mctops-vp9.webm?t=2024-07-18T02%3A01%3A51.011Z",
  h264: "https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/mctops-h264.mp4?t=2024-07-18T02%3A02%3A13.339Z",
};

const videoTiming: {
  start: number;
  loopStart: number;
  loopEnd: number;
  end: number;
}[] = [
  {
    // TOPS
    start: 1.29,
    loopStart: 2.3,
    loopEnd: 4.65,
    end: 6,
  },
  {
    // BFM
    start: 6.5,
    loopStart: 7.35,
    loopEnd: 10.85,
    end: 12.1,
  },
  {
    // GL
    start: 14.5,
    loopStart: 15.45,
    loopEnd: 17.45,
    end: 18.4,
  },
  {
    // POLOG
    start: 19.4,
    loopStart: 20.7,
    loopEnd: 23.1,
    end: 25.1,
  },
  {
    // PPIT
    start: 26.8,
    loopStart: 28.1,
    loopEnd: 31.35,
    end: 32.4,
  },
  {
    // Welfare
    start: 33.4,
    loopStart: 34.9,
    loopEnd: 37.1,
    end: 38.94,
  },
];

export default function CommitteeHeader() {
  const [index, setIndex] = useAtom(indexAtom);
  const [api, setApi] = useState<CarouselApi>();
  const [videoHeight, setVideoHeight] = useState<number | "auto">("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [videoAction, setVideoAction] = useState<"loop" | "prev" | "next">(
    "loop",
  );
  const itemRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setIsLoading(true);
    setVideoAction("next");
  };
  const handlePrevious = () => {
    setIsLoading(true);
    setVideoAction("prev");
  };

  useEffect(() => {
    if (!api || index === api.selectedScrollSnap()) {
      return;
    }
    setIndex(api.selectedScrollSnap());
  }, [api, index, setIndex]);

  useEffect(() => {
    const el = itemRef.current;
    const observer = new ResizeObserver((entries) => {
      setVideoHeight(entries[0]?.contentRect.height ?? "auto");
    });
    el && observer.observe(el);
    return () => {
      el && observer.unobserve(el);
    };
  }, []);

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
        <div
          className="absolute w-full z-10 py-6 md:py-10 px-8 md:px-14 flex justify-center items-center"
          style={{ height: videoHeight }}
        >
          <video
            id="mctops-video"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="none"
            poster="/mctops-thumb.webp"
            className="w-auto h-full"
            onTimeUpdate={(ev) => {
              const el = ev.target as HTMLVideoElement;
              const currTiming = videoTiming[index]!;

              if (videoAction === "loop") {
                if (
                  el.currentTime < currTiming.start ||
                  el.currentTime > currTiming.loopEnd
                ) {
                  el.currentTime = currTiming.loopStart;
                }
                return;
              }

              if (el.currentTime < currTiming.loopEnd) {
                el.currentTime = currTiming.loopEnd + 0.15;
              }

              if (videoAction === "prev") {
                const prevTiming =
                  videoTiming[
                    (index - 1 + PORTFOLIOS.length) % PORTFOLIOS.length
                  ]!;
                if (el.currentTime > currTiming.end) {
                  el.currentTime = prevTiming.start;
                  setIndex((index - 1 + PORTFOLIOS.length) % PORTFOLIOS.length);
                  api?.scrollPrev();
                  setVideoAction("loop");
                  setIsLoading(false);
                }
              } else {
                const nextTiming =
                  videoTiming[(index + 1) % PORTFOLIOS.length]!;
                if (el.currentTime > currTiming.end) {
                  el.currentTime = nextTiming.start;
                  setIndex((index + 1) % PORTFOLIOS.length);
                  api?.scrollNext();
                  setVideoAction("loop");
                  setIsLoading(false);
                }
              }
            }}
          >
            <source src={`${videoSrc.vp9}#t=1.3`} type="video/webm" />
            <source src={`${videoSrc.h264}#t=1.3`} type="video/mp4" />
            <p>
              Your browser does not support the video tag. Access the video{" "}
              <Link href="/mctops-vp9.webm">here (WEBM)</Link> or{" "}
              <Link href="/mctops-h264.mp4">here (MP4)</Link> instead.
            </p>
          </video>
        </div>
        <CarouselContent>
          {PORTFOLIOS.map((portfolio) => (
            <CarouselItem
              className="basis max-h-[80vh] p-0"
              key={portfolio}
              ref={itemRef}
            >
              <CommitteeHeaderBg portfolio={portfolio} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          disabled={isLoading}
          className="z-20 translate-x-12 md:translate-x-14 md:size-10 bg-transparent hover:bg-slate-900/35 border-0"
          onClick={handlePrevious}
          icon={<LuChevronLeft className="text-white size-4 md:size-6" />}
        />
        <CarouselNext
          disabled={isLoading}
          className="z-20 -translate-x-12 md:-translate-x-14 md:size-10 bg-transparent hover:bg-slate-900/35 border-0"
          onClick={handleNext}
          icon={<LuChevronRight className="text-white size-4 md:size-6" />}
        />
      </Carousel>
    </>
  );
}
