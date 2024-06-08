import Image from "next/legacy/image";
import React from "react";
import { LuX as X } from "react-icons/lu";

import nameframe from "../_assets/NameFrame.webp";
import photoframe from "../_assets/PhotoFrame.webp";
import './index.css';
import { DividerHorizontalIcon } from "@radix-ui/react-icons";

export type Imageprops = {
  name: string;
  src: string;
  major: string;
  year: string;
  portfolio: string;
  OG: string;
  className: string;
  size: 'small' | 'large';
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
  const scale = size === 'large' ? 3 : 1;
  
  return (
    <div className={`relative w-[${140*scale}px] h-[${180*scale}px] ${className} hover:cursor-pointer`}>
      {/* Photo Frame */}
      <div className={`relative w-[${138*scale}px] h-[${180*scale}px]`}>
        <Image
          src={photoframe}
          alt="Photo Frame"
          layout="fill"
          className={`object-cover shadow-lg rounded-md`}
        />
        {/* Photo */}
        <div className={`absolute w-[${114*scale}px] h-[${152*scale}px] ml-[${12*scale}px] mt-[${11*scale}px]`}>
          <Image src={src} alt={name} layout="fill" className="object-cover" />
          {size === 'large'  && <div className="absolute inset-0 bg-black opacity-80"/>}
        </div>
      </div>
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[${3*scale}px] w-[${90*scale}px] h-[${25*scale}px] z-30`}>
        <Image
          src={nameframe}
          alt="Name Frame"
          layout="fill"
          className="object-cover"
        />
        {/* Name */}
        <div className="absolute w-full h-full bottom-0 transform pt-[${20*scale}px] left-0 flex items-center justify-center">
          <p className={`antialiased text-[${12*scale}px] text-[rgba(107,56,18,0.66)] font-serif text-center name-shadow`}>
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
