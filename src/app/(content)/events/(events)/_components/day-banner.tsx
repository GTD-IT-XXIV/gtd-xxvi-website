import Image from "next/image";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import dayBanner from "../_assets/day-banner.webp";

export type DayBannerProps = {
  text: string;
  textClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export default function DayBanner({
  text,
  textClassName,
  className,
  ...props
}: DayBannerProps) {
  return (
    <div className={cn("relative z-0 aspect-[410/133]", className)} {...props}>
      <Image
        src={dayBanner}
        alt="Event day ribbon banner"
        sizes="(max-width: 640px) 100vw, 50vw"
        fill
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 410 133"
        className="absolute inset-0"
      >
        <path
          id="day-banner-text-path"
          d="M74 47.007c48.4-10.8 79.167-2.5 96 2 16.167 3.5 55.5 8.4 87.5 0s62.667-19.333 67.5-19"
        />
        <text filter="drop-shadow(0 0 4px rgb(0 0 0 / 25%))">
          <textPath
            href="#day-banner-text-path"
            className={cn("text-[32px] font-reggae-one", textClassName)}
            fill="#563E2F"
            textAnchor="middle"
            dominantBaseline="middle"
            startOffset="50%"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
