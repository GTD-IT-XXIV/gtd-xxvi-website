import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/legacy/image";
import React from "react";
import { LuX as X } from "react-icons/lu";

import { cn } from "@/lib/utils";

import nameframe from "../_assets/NameFrame.webp";
import photoframe from "../_assets/PhotoFrame.webp";
import "./index.css";

export type Imageprops = {
  name: string;
  src: string;
  major: string;
  year: string;
  portfolio: string;
  OG: string;
  className: string;
  size: "small" | "large";
};

export default function FrameImage({
  name,
  src,
  major,
  year,
  portfolio,
  OG,
  className,
  size,
}: Imageprops) {
  const large = size === "large";

  return (
    <div
      className={cn(
        "relative hover:cursor-pointer",
        className,
        large ? "w-[414px] h-[552px]" : "w-[138px] h-[184px]",
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
          layout="fill"
          className="object-cover shadow-lg rounded-md"
        />
        {/* Photo */}
        <div
          className={cn(
            "absolute",
            large
              ? "w-[342px] h-[456px] ml-[36px] mt-[33px]"
              : "w-[114px] h-[152px] ml-[12px] mt-[11px]",
          )}
        >
          <Image src={src} alt={name} layout="fill" className="object-cover" />
          {large && <div className="absolute inset-0 bg-black opacity-80" />}
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30",
          large ? "mb-[9px] w-[270px] h-[75px]" : "mb-[3px] w-[90px] h-[25px]",
        )}
      >
        <Image
          src={nameframe}
          alt="Name Frame"
          layout="fill"
          className="object-cover"
        />
        {/* Name */}
        <div
          className={cn(
            "absolute w-full h-full transform left-0 flex items-center justify-center",
            large ? "pt-[60px] bottom-9" : "pt-[20px] bottom-0",
          )}
        >
          <p
            className={cn(
              "antialiased font-serif text-center name-shadow",
              large ? "text-[36px]" : "text-[12px] bottom-3",
              "text-[rgba(107,56,18,0.66)]",
            )}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
