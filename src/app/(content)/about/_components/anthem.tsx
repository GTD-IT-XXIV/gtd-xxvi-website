"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import Vinyl from "../_assets/Ellipse 20.png";
import DvDPoleBefore from "../_assets/Property 1=before click.png";
import baseVinyl from "../_assets/Rectangle 6.png";
import rectangle1 from "../_assets/Rectangle 8.png";
import rectangle2 from "../_assets/Rectangle 9.png";
import Scroll from "../_assets/Scroll.png";
import playButton from "../_assets/play button for cd player.png";
import scrollBackground from "../_assets/scroll-background.png";

export default function Anthem() {
  const [spin, setSpin] = useState(false);

  const handleClick = () => {
    setSpin(!spin);
  };

  return (
    <div className="bg-[#0F172A]">
      <h1 className="text-center text-white font-bold text-3xl font-serif pt-10">
        Anthem
      </h1>
      <div>
        <div
          className="m-auto bg-no-repeat bg-auto bg-top w-[370px] h-[550px] scale-[0.9]"
          style={{
            backgroundImage: `url(${scrollBackground.src})`,
            backgroundSize: "100%",
          }}
        >
          <Image
            src={Scroll}
            alt="Scroll image"
            className="mx-auto w-[370px]"
          />
          <p className="mx-auto w-[200px] text-xs text-center font-serif text-black">
            From different places, <br />
            different times <br /> With a common goal in our mind <br /> We want
            to enjoy this moment <br /> while it lasts <br /> Have you ever
            stopped <br /> and wonder why <br /> That now we can <br /> share a
            common sky <br /> So many of us with <br /> different childhoods{" "}
            <br /> Different dreams, <br /> different lives <br />
            <br /> Chorus : I know now what the answer is <br /> I’m sure I’m
            gonna miss <br /> This special day when we get together <br />{" "}
            <br /> As clouds drift and seasons flee <br /> We will probably not
            meet <br /> And different lives we’ll live <br /> No once we’ll
            forgetbr <br /> this great day we have
          </p>
          <Image
            src={Scroll}
            alt="Scroll image"
            className="mx-auto w-[370px]"
          />
        </div>
        <div className="m-auto w-[400px] relative grid grid-col-1 place-content-center">
          <div>
            <Image src={baseVinyl} alt="Vinyl Base" className="-z-10" />
            <Image
              src={Vinyl}
              alt="Vinyl"
              className={cn(
                "w-[40%] absolute top-[15%] left-[17%] z-10",
                spin ? "animate-spin" : "animate-none",
              )}
            />
            <p className="text-center z-10 absolute top-[50%] right-14 font-slackey text-white">
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
              src={DvDPoleBefore}
              alt="DvD Pole"
              className={cn(
                "z-10 absolute top-[-10%] right-[18%] transition-transform duration-500",
                spin && "-rotate-45",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
