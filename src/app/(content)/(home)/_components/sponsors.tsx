"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type SponsorsProps = {
  bgUrl: string;
  logos: {
    src: StaticImageData;
    url: string;
  }[];
};

export default function Sponsors({ bgUrl, logos }: SponsorsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;

    function addAnimation() {
      if (!scroller) {
        return;
      }

      const innerScroller = scroller.querySelector(".scroll_inner");

      if (!innerScroller) {
        return;
      }

      const innerScrollerChildren = Array.from(innerScroller.children);

      if (innerScroller.getAttribute("data-cloned") === "true") {
        return;
      }
      innerScrollerChildren.forEach((item) => {
        const extendedLogos = item.cloneNode(true) as HTMLElement;

        innerScroller.appendChild(extendedLogos);
      });

      innerScroller.setAttribute("data-cloned", "true");
    }

    addAnimation();
  }, []);
  return (
    <div
      className="relative z-0 w-full h-auto aspect-[4/3] content-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <div className="absolute -z-10 inset-0 bg-gradient-to-b from-black to-transparent to-35%" />
      <div className="mt-auto text-center text-white">
        <h2 className="text-2xl font-serif">Sponsored by</h2>
      </div>
      <div ref={scrollerRef} className="h-1/2 scroller">
        <div className="h-full w-max flex flex-nowrap items-stretch gap-3 sm:gap-5 md:gap-10 animate-infinite-scroll hover:animation-pause">
          {logos.map((logo, index) => {
            return (
              <Link
                key={index}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition"
              >
                <Image
                  src={logo.src}
                  alt={`logo ${index + 1}`}
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 125px, 150px"
                  className="h-full w-full object-contain"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
