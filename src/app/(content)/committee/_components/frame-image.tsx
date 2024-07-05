import Image, { type StaticImageData } from "next/image";
import React, { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

import nameFrame from "../_assets/name-frame.webp";
import photoFrame from "../_assets/photo-frame.webp";
import NameFrame from "./name-frame";
import PhotoFrame from "./photo-frame";

export type FrameImageProps = {
  nickname: string;
  src: StaticImageData;
  size: "small" | "large";
  animated?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const FrameImage = forwardRef<HTMLDivElement, FrameImageProps>(
  (
    {
      nickname,
      src,
      className,
      size,
      animated = false,
      ...props
    }: FrameImageProps,
    ref,
  ) => {
    const large = size === "large";

    return (
      <div
        ref={ref}
        className={cn(
          "relative hover:cursor-pointer h-auto aspect-[3/4] transition",
          large ? "w-full" : "min-w-[138px] hover:scale-105 my-4",
          className,
        )}
        {...props}
      >
        {/* Photo Frame */}
        <div className="relative h-auto w-full aspect-[3/4] grid place-items-center">
          {large ? (
            <PhotoFrame className="drop-shadow-lg" />
          ) : (
            <Image src={photoFrame} alt="Photo frame" />
          )}
          {/* Photo */}
          <div className="absolute w-[88.5%] h-auto aspect-[3/4]">
            <Image
              src={src}
              alt={nickname}
              className={cn("object-cover", large && "brightness-[0.2]")}
              unoptimized={animated}
              sizes="(max-width: 540px) 40vw, (max-width: 768px) 25vw, 18vw"
              fill
            />
          </div>
        </div>
        <div
          className={cn(
            "absolute bottom-0 w-full h-[14%] inset-x-0 z-10",
            large ? "-mb-4" : "-mb-2",
          )}
        >
          {large ? (
            <NameFrame className="absolute h-full left-[17.5%] -z-10" />
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
              <p className="text-3xl sm:text-5xl font-serif text-center bg-black text-transparent text-shadow-[1px_2px_4px_#9C7A61] bg-clip-text">
                {nickname}
              </p>
            ) : (
              <p className="text-sm md:text-base xl:text-xl 2xl:text-2xl font-serif text-center bg-black/80 text-transparent text-shadow-[0.5px_1px_2px_#9C7A61] bg-clip-text">
                {nickname}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },
);

FrameImage.displayName = "FrameImage";

export default FrameImage;
