"use client";

import clsx from "clsx";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";

import backgroundgl from "../_assets/backgroundgl.png";

type Props = {
  glphoto1: StaticImageData;
  glphoto2: StaticImageData;
  house: string;
  og: number[];
};

const Housegl: React.FC<Props> = (props) => {
  const [hover, setHover] = useState([0, 0]);
  return (
    <div className="relative">
      <Image src={backgroundgl} width={800} height={200} alt="background gl" />
      <div className="absolute top-0 flex flex-col items-center pt-[16%] px-[20%]">
        <p className="font-serif text-red-500 text-md sm:text-xl md:text-3xl">
          House {props.house}
        </p>
        <p className="font-serif text-2xl sm:text-3xl mb-[5%] md:text-5xl">
          Group Leaders
        </p>
        <div className="flex">
          <Link
            href={"/"}
            className="flex flex-col items-center pr-[5%] cursor-pointer"
            onMouseEnter={() => setHover([1, 0])}
            onMouseLeave={() => setHover([0, 0])}
          >
            <Image
              src={props.glphoto1}
              alt="GL photo 1"
              width={800}
              height={200}
              className={clsx(
                hover[0] &&
                  `transform transition-transform duration-300 ease-in-out scale-105 shadow-lg brightness-75`,
              )}
            />
            {hover[0] ? (
              <p className="font-serif pt-[5%] md:text-xl sm:text-lg text-sm transition-transform duration-500 ease-in-out">
                OG {props.og[0]} &gt;
              </p>
            ) : (
              <p className="font-serif pt-[5%] md:text-xl sm:text-lg text-sm transition-transform duration-500 ease-in-out">
                OG {props.og[0]}
              </p>
            )}
          </Link>
          <Link
            href={"/"}
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setHover([0, 1])}
            onMouseLeave={() => setHover([0, 0])}
          >
            <Image
              src={props.glphoto2}
              alt="GL photo 2"
              width={800}
              height={200}
              className={clsx(
                hover[1] &&
                  `transform transition-transform duration-300 ease-in-out scale-105 shadow-lg brightness-75`,
              )}
            />
            {hover[1] ? (
              <p className="font-serif pt-[5%] md:text-xl sm:text-lg text-sm transition-transform duration-500 ease-in-out">
                OG {props.og[1]} &gt;
              </p>
            ) : (
              <p className="font-serif pt-[5%] md:text-xl sm:text-lg text-sm transition-transform duration-500 ease-in-out">
                OG {props.og[1]}
              </p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Housegl;