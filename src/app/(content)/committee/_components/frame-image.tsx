import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import nameframe from "../_assets/name-frame.svg?url";
import photoframe from "../_assets/photo-frame.svg?url";

export type Imageprops = {
  name: string;
  src: string;
  className: string;
  size: "small" | "large";
};

export default function FrameImage({ name, src, className, size }: Imageprops) {
  const large = size === "large";

  return (
    <div
      className={cn(
        "relative hover:cursor-pointer",
        className,
        large ? "w-[414px] h-[570px]" : "w-[138px] h-[190px]",
      )}
    >
      {/* Photo Frame */}
      <div
        className={cn(
          "relative",
          large ? "w-[414px] h-[540px]" : "w-[138px] h-[180px]",
        )}
      >
        <Image
          src={photoframe}
          alt="Photo Frame"
          className="object-cover shadow-lg"
          fill
        />
        {/* Photo */}
        <div
          className={cn(
            "absolute",
            large
              ? "w-[366px] h-[480px] ml-[24px] mt-[33px]"
              : "w-[122px] h-[160px] ml-[8px] mt-[11px]",
          )}
        >
          <Image src={src} alt={name} className="object-cover" fill />
          {large && (
            <div className="w-full absolute inset-0 bg-black opacity-80" />
          )}
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-1/2 transform -translate-x-1/2",
          large ? "mb-[9px] w-[270px] h-[75px]" : "mb-[3px] w-[90px] h-[25px]",
        )}
      >
        <Image
          src={nameframe}
          alt="Name Frame"
          className="object-cover -z-10"
          fill
        />
        {/* Name */}
        <div className="size-full flex justify-center items-center">
          {large ? (
            <p className="text-3xl font-serif text-center bg-black/80 text-transparent text-shadow-[1px_2px_3px_#9C7A61] bg-clip-text">
              {name.split(" ")[0]}
            </p>
          ) : (
            <p className="text-xs font-serif text-center bg-black/80 text-transparent text-shadow-[0.5px_1px_2px_#9C7A61] bg-clip-text">
              {name.split(" ")[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
