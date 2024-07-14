"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";

import { cn } from "@/lib/utils";

import backgroundgl from "../_assets/backgroundgl.webp";

type Props = {
  glphoto1: StaticImageData;
  glphoto2: StaticImageData;
  house: string;
  og: string[];
};

const Housegl: React.FC<Props> = (props) => {
  const [hover, setHover] = useState([0, 0]);
  return (
    <div className={`relative`}>
      <Image src={backgroundgl} alt="background gl" className="w-full" />
      <div className="absolute flex flex-col items-center top-[20%] right-[18%] left-[19%] ">
        <p className="font-serif text-red-500 text-sm sm:text-lg md:text-2xl lg:text-xl">
          House {props.house}
        </p>
        <p className="font-serif text-sm sm:text-lg mb-[5%] md:text-2xl lg:text-2xl">
          Orientation Groups
        </p>
        <div className="flex w-full">
          <Link
            href="/committee"
            className="flex flex-col items-center pr-[5%] cursor-pointer flex-1 w-full"
            onMouseEnter={() => setHover([1, 0])}
            onMouseLeave={() => setHover([0, 0])}
          >
            <Image
              key={props.glphoto1.src}
              src={props.glphoto1}
              placeholder="blur"
              alt="GL photo 1"
              className={cn(
                hover[0] &&
                  "transform transition-transform duration-300 ease-in-out scale-105 shadow-lg brightness-75",
                "w-full rounded-lg",
              )}
            />
            {hover[0] ? (
              <p className="font-serif pt-[5%] md:text-lg lg:text-md xl:text-md sm:text-md text-xs transition-transform duration-500 ease-in-out">
                {props.og[0]} &gt;
              </p>
            ) : (
              <p className="font-serif pt-[5%] md:text-lg lg:text-md xl:text-md sm:text-md text-xs transition-transform duration-500 ease-in-out">
                {props.og[0]}
              </p>
            )}
          </Link>
          <Link
            href="/committee"
            className="flex flex-col items-center cursor-pointer flex-1 w-full"
            onMouseEnter={() => setHover([0, 1])}
            onMouseLeave={() => setHover([0, 0])}
          >
            <Image
              key={props.glphoto2.src}
              src={props.glphoto2}
              alt="GL photo 2"
              className={cn(
                hover[1] &&
                  "transform transition-transform duration-300 ease-in-out scale-105 shadow-lg brightness-75",
                "w-full rounded-lg",
              )}
            />
            {hover[1] ? (
              <p className="font-serif pt-[5%] md:text-lg lg:text-md xl:text-md sm:text-md text-xs transition-transform duration-500 ease-in-out">
                {props.og[1]} &gt;
              </p>
            ) : (
              <p className="font-serif pt-[5%] md:text-lg lg:text-md xl:text-md sm:text-md text-xs transition-transform duration-500 ease-in-out">
                {props.og[1]}
              </p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Housegl;
