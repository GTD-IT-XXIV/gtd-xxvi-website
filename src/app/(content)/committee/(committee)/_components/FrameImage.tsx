import Image from "next/legacy/image";
import React from "react";

import nameframe from "../_assets/NameFrame.webp";
import photoframe from "../_assets/PhotoFrame.webp";

export type Imageprops = {
  name: string;
  src: string;
  major: string;
  year: string;
  className: string;
};

export default function FrameImage({
  name,
  src,
  major,
  year,
  className,
}: Imageprops) {
  return (
    <div className="relative w-[140px] h-[190px]">
      {/* Photo Frame */}
      <div className="relative w-[138px] h-[180px]">
        <Image
          src={photoframe}
          alt="Photo Frame"
          layout="fill"
          className="object-cover shadow-lg rounded-md"
        />
        {/* Photo */}
        <div className="absolute w-[114px] h-[152px] ml-[12px] mt-[11px]">
          <Image src={src} alt={name} layout="fill" className="object-cover" />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 w-[90px] h-[25px] z-10">
        <Image
          src={nameframe}
          alt="Name Frame"
          layout="fill"
          className="object-cover"
        />
        {/* Name */}
        <div className="absolute w-full h-full bottom-1/2 transform pt-[20px] left-0 flex items-center justify-center">
          <p className="antialiased text-[12px] text-[rgba(107,56,18,0.66)] font-serif text-center text-shadow-sm">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
