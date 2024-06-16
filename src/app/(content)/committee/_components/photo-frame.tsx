import Image from "next/image";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import botBot from "../_assets/photo-frame-bottom-bottom.svg?url";
import botBrass from "../_assets/photo-frame-bottom-brass-texture.webp";
import botTop from "../_assets/photo-frame-bottom-top.svg?url";
import midBot from "../_assets/photo-frame-middle-bottom.svg?url";
import midBrass from "../_assets/photo-frame-middle-brass-texture.webp";
import midTop from "../_assets/photo-frame-middle-top.svg?url";
import topBot from "../_assets/photo-frame-top-bottom.svg?url";
import topBrass from "../_assets/photo-frame-top-brass-texture.webp";
import topTop from "../_assets/photo-frame-top-top.svg?url";

export default function PhotoFrame({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative shadow-lg w-full h-auto aspect-[138/180] flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {/* Bottom layer */}
      <Image src={botBot} alt="Bottom layer of a photo frame" fill />
      <Image
        src={botBrass}
        alt="Brass texture of a photo frame"
        fill
        unoptimized
      />
      <Image src={botTop} alt="Top layer of a photo frame" fill />
      {/* Middle layer */}
      <div className="absolute w-[95%] h-auto aspect-[132/174] flex items-center justify-center">
        <Image src={midBot} alt="Bottom layer of a photo frame" fill />
        <Image
          src={midBrass}
          alt="Brass texture of a photo frame"
          fill
          unoptimized
        />
        <Image src={midTop} alt="Top layer of a photo frame" fill />
        {/* Top layer */}
        <div className="absolute w-[95%] h-auto aspect-[126/167]">
          <Image src={topBot} alt="Bottom layer of a photo frame" fill />
          <Image
            src={topBrass}
            alt="Brass texture of a photo frame"
            fill
            unoptimized
          />
          <Image
            src={topTop}
            alt="Top layer of a photo frame"
            fill
            className="shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
