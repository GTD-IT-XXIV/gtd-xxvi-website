import Image, { type StaticImageData } from "next/image";
import React, { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import nameFrame from "../_assets/name-frame.png";
import nameFrameSvg from "../_assets/name-frame.svg?url";
import photoFrame from "../_assets/photo-frame.png";
import PhotoFrame from "./photo-frame";

export type Imageprops = {
  nickname: string;
  src: StaticImageData;
  size: "small" | "large";
  animated?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function FrameImage({
  nickname,
  src,
  className,
  size,
  animated = false,
  ...props
}: Imageprops) {
  const large = size === "large";

  return (
    <div
      className={cn(
        "relative hover:cursor-pointer h-auto aspect-[3/4] transition",
        large ? "w-full" : "min-w-[138px] hover:scale-105 my-4",
        className,
      )}
      {...props}
    >
      {/* Photo Frame */}
      <div className="relative h-auto w-full aspect-[3/4]">
        {large ? <PhotoFrame /> : <Image src={photoFrame} alt="Photo frame" />}
        {/* Photo */}
        <div className="absolute top-[5%] left-[6.5%] w-[87%] h-auto aspect-[3/4]">
          <Image
            src={src}
            alt={nickname}
            className="object-cover"
            unoptimized={animated}
            sizes="(max-width: 540px) 40vw, (max-width: 768px) 25vw, 18vw"
            fill
          />
          {large && (
            <div className="w-full absolute inset-0 bg-black opacity-80" />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[14%] inset-x-0 z-10 -mb-2">
        {large ? (
          <Image
            src={nameFrameSvg}
            alt="Name Frame"
            className="object-contain -z-10"
            fill
          />
        ) : (
          <Image
            src={nameFrame}
            alt="Name Frame"
            className="object-contain -z-10"
            sizes="(max-width: 540px) 40vw, (max-width: 768px) 25vw, 18vw"
            fill
          />
        )}
        {/* Name */}
        <div className="size-full flex justify-center items-center">
          {large ? (
            <p className="text-3xl sm:text-5xl font-serif text-center bg-black/80 text-transparent text-shadow-[1px_2px_3px_#9C7A61] bg-clip-text">
              {nickname}
            </p>
          ) : (
            <p className="text-sm lg:text-base xl:text-xl 2xl:text-2xl font-serif text-center bg-black/80 text-transparent text-shadow-[0.5px_1px_2px_#9C7A61] bg-clip-text">
              {nickname}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
