"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";

import logogtd from "@/assets/images/logo-gtd-white-transparent.png";

import registerbutton from "../_assets/registerbutton.png";
import registerbuttonhover from "../_assets/registerbuttonhover.png";
import topbackground from "../_assets/topbackground.png";

const TopSection = () => {
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };
  return (
    <div className="relative">
      <Image
        src={topbackground}
        alt="background"
        width={440}
        height={494}
        className="w-full bg-cover bg-center md:h-[600px] xl:h-[1000px] 2xl:h-[1200]"
      />
      <div className="absolute top-0 inset-12 flex flex-col items-center justify-center">
        <Image
          src={logogtd}
          alt="logo gtd"
          width={350}
          height={100}
          className="justify-center self-center md:w-[450px] xl:w-[600px] 2xl:w-[800px]"
        />
        <Link
          href="/"
          className=""
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <div className="relative flex flex-col">
            <Image
              src={hover ? registerbutton : registerbuttonhover}
              alt="register button"
              width={400}
              height={100}
              className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 justify-center items-center transition-all 
              ease-out duration-200 transform"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="sm:text-md md:text-lg lg:text-xl xl:text-2xl text-center font-serif">
                Register
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopSection;
