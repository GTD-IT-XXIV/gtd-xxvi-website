"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import anthemScroll from "../_assets/anthem-scroll.webp";
import DvDPole from "../_assets/tiang untuk cd.svg?url";
import Vinyl from "../_assets/vinyl.webp";
import VinylPlayer from "./vinyl-player";

export default function Anthem() {
  const [showControls, setShowControls] = useState(false);
  const [spin, setSpin] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleClick() {
    if (spin) {
      audioRef.current?.pause();
    } else {
      void audioRef.current?.play();
    }
    setShowControls(true);
    setSpin(!spin);
  }

  return (
    <div className="bg-[#0F172A]">
      <h1 className="text-center text-white font-bold text-2xl font-serif pt-10">
        Anthem
      </h1>
      <div className="flex flex-col gap-5 items-center justify-center md:flex md:flex-row md:gap-10">
        <div className="m-auto max-w-[400px] sm:w-[400px] relative grid place-content-center py-10 md:m-0">
          <div>
            <Image src={anthemScroll} alt="Scroll" />
            <div className="absolute inset-0 grid place-items-center">
              <p className="mx-auto text-[0.7rem]/[1.05rem] md:text-[0.85vw]/[1.125vw] text-center font-serif text-[#402A10]">
                From different places, <br />
                different times <br /> With a common goal in our mind <br /> We
                want to enjoy this moment <br /> while it lasts <br /> Have you
                ever stopped <br /> and wonder why <br /> That now we can <br />{" "}
                share a common sky <br /> So many of us with <br /> different
                childhoods <br /> Different dreams, <br /> different lives{" "}
                <br />
                <br /> Chorus : I know now what the answer is <br /> I’m sure
                I’m gonna miss <br /> This special day when we get together{" "}
                <br /> <br /> As clouds drift and seasons flee <br /> We will
                probably not meet <br /> And different lives we’ll live <br />{" "}
                No once we’ll forget <br /> this great day we have
              </p>
            </div>
          </div>
        </div>
        <div className="m-auto max-w-[400px] sm:w-[400px] relative grid place-content-center md:m-0">
          <div className="relative mb-2">
            <VinylPlayer onPlay={handleClick} className="w-full" />
            <Image
              src={Vinyl}
              alt="Vinyl"
              className="animate-spin w-[55.6%] absolute top-[11%] left-[9%] z-10"
              style={{ animationPlayState: spin ? "running" : "paused" }}
            />
            <Image
              src={DvDPole}
              alt="DvD Pole"
              className={cn(
                "w-[57%] z-10 absolute top-[-20%] right-[8%] transition-transform duration-500",
                spin ? "-rotate-45" : "",
              )}
            />
          </div>
          <audio
            ref={audioRef}
            controls={showControls}
            preload="none"
            onPlay={() => setSpin(true)}
            onPause={() => setSpin(false)}
            className="mb-0.5"
          >
            <source src="/gtd-theme-song-aac.mp4" type="audio/mp4" />
            <source src="/gtd-theme-song-mp3.mp3" type="audio/mpeg" />
            <p>
              Your browser does not support HTML audio. Access the song{" "}
              <Link
                href="https://soundcloud.com/steveprat/get-together-day-anthem"
                rel="noopener noreferrer"
                target="_blank"
              >
                here
              </Link>{" "}
              instead.
            </p>
          </audio>
          <Link
            href="https://soundcloud.com/steveprat/get-together-day-anthem"
            title="Get Together Day Anthem"
            rel="noopener noreferrer"
            className="text-[10px] text-neutral-300 hover:underline underline-offset-2 overflow-hidden whitespace-nowrap overflow-ellipsis"
            target="_blank"
          >
            Get Together Day Anthem · SoundCloud
          </Link>
        </div>
      </div>
    </div>
  );
}
