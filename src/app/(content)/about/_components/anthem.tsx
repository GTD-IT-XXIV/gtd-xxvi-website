"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import Vinyl from "../_assets/Ellipse 20.svg?url";
import baseVinyl from "../_assets/Rectangle 6.png";
import rectangle1 from "../_assets/Rectangle 8.png";
import rectangle2 from "../_assets/Rectangle 9.png";
import ScrollBottom from "../_assets/Scroll bottom.svg?url";
import Scroll from "../_assets/Scroll top.svg?url";
import bottomLeft from "../_assets/anthem-comp-bottom-left.svg?url";
import bottomRight from "../_assets/anthem-comp-bottom-right.svg?url";
import topLeft from "../_assets/anthem-comp-top-left.svg?url";
import topRight from "../_assets/anthem-comp-top-right.svg?url";
import playButton from "../_assets/play button for cd player.png";
import scrollBackground from "../_assets/scroll-background.png";
import DvDPole from "../_assets/tiang untuk cd.svg?url";

export default function Anthem() {
  const [spin, setSpin] = useState(false);

  function handleClick() {
    setSpin(!spin);
  }

  return (
    <div className="bg-[#0F172A]">
      <h1 className="text-center text-white font-bold text-2xl font-serif font-['Bluu_Next'] pt-10">
        Anthem
      </h1>
      <div className="flex flex-col gap-5 items-center justify-center md:flex md:flex-row md:gap-10">
        <div className="m-auto w-[400px] relative grid place-content-center py-10 md:m-0">
          <div>
            <div className="relative top-[-3%] left-[-1%]">
              <Image
                src={topRight}
                alt="top right scroll"
                className="absolute top-0 right-[-1%] z-[1]"
              />
              <Image src={Scroll} alt="Scroll image" className="absolute" />
              <Image
                src={topLeft}
                alt="top left scroll"
                className="absolute top-1 -left-1"
              />
            </div>
            <Image src={scrollBackground} alt="scroll Background" />
            <p className="mx-auto w-[200px] text-[9px] text-center font-serif font-['Bluu_Next'] absolute top-[15%] left-[25%] text-[#402A10]">
              From different places, <br />
              different times <br /> With a common goal in our mind <br /> We
              want to enjoy this moment <br /> while it lasts <br /> Have you
              ever stopped <br /> and wonder why <br /> That now we can <br />{" "}
              share a common sky <br /> So many of us with <br /> different
              childhoods <br /> Different dreams, <br /> different lives <br />
              <br /> Chorus : I know now what the answer is <br /> I’m sure I’m
              gonna miss <br /> This special day when we get together <br />{" "}
              <br /> As clouds drift and seasons flee <br /> We will probably
              not meet <br /> And different lives we’ll live <br /> No once
              we’ll forget <br /> this great day we have
            </p>
            <div className="relative top-[-7%] left-1">
              <Image
                src={bottomRight}
                alt="top right scroll"
                className="absolute right-[-1%] z-[1]"
              />
              <Image
                src={ScrollBottom}
                alt="Scroll image"
                className="absolute"
              />
              <Image
                src={bottomLeft}
                alt="top left scroll"
                className="absolute top-1"
              />
            </div>
          </div>
        </div>
        <div className="m-auto w-[400px] relative grid place-content-center md:m-0">
          <div>
            <Image src={baseVinyl} alt="Vinyl Base" className="-z-10" />
            <Image
              src={Vinyl}
              alt="Vinyl"
              className={`animate-spin w-[40%] absolute top-[15%] left-[17%] z-10`}
              style={{ animationPlayState: spin ? "running" : "paused" }}
            />
            <p className="text-center z-10 absolute top-[50%] right-14 font-['Slackey'] text-white">
              Click to <br /> Play
            </p>
            <button
              className="z-0 absolute top-[35%] right-[-5%] place-content-center scale-[0.25]"
              onClick={handleClick}
            >
              <Image src={playButton} alt="Vinyl Play Button" />
            </button>
            <Image
              src={rectangle1}
              alt="Rectangle 1"
              className="w-[50%] z-0 absolute top-[5%] left-[12%]"
            />
            <Image
              src={rectangle2}
              alt="Rectangle 2"
              className="z-0 absolute top-[5%] right-[17%]"
            />
            <Image
              src={DvDPole}
              alt="DvD Pole"
              className={`z-10 absolute top-[-12%] right-[18%] transition-transform duration-500 ${spin ? "-rotate-45" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
