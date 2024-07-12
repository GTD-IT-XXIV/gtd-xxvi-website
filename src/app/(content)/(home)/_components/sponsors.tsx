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
      className="relative w-full h-[336px] content-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center text-white mb-6">
        <h2 className="text-2xl font-serif">Sponsored by</h2>
      </div>
      <div ref={scrollerRef} className="scroller">
        <div className="w-max flex flex-nowrap gap-3 sm:gap-5 md:gap-10 animate-infinite-scroll hover:animation-pause">
          {logos.map((logo, index) => {
            return (
              <Link key={index} href={logo.url} className=" p-1">
                <Image
                  src={logo.src}
                  alt={`logo ${index + 1}`}
                  height={100}
                  width={100}
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 325px, 400px"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
