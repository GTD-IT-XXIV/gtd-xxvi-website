"use client";

import Image from "next/image";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import BannerChangeling from "../_assets/banner-changeling.svg";
import BannerHealer from "../_assets/banner-healer.svg";
import BannerTimeturner from "../_assets/banner-timeturner.svg";
import BannerWanderer from "../_assets/banner-wanderer.svg";
import chooseyourhouse from "../_assets/choose-your-house.svg?url";
import glclose from "../_assets/glclose.webp";
import og1Photo from "../_assets/og-1.webp";
import og2Photo from "../_assets/og-2.webp";
import og3Photo from "../_assets/og-3.webp";
import og4Photo from "../_assets/og-4.webp";
import og5Photo from "../_assets/og-5.webp";
import og6Photo from "../_assets/og-6.webp";
import og7Photo from "../_assets/og-7.webp";
import og8Photo from "../_assets/og-8.webp";
import HouseGl from "./housegl";

const HouseSection = () => {
  const [og, setOg] = useState(["Sijilink", "Nimboosh"]);
  const [houseName, setHouseName] = useState("");
  const [glphoto1, setGlphoto1] = useState(og1Photo);
  const [glphoto2, setGlphoto2] = useState(og2Photo);
  const [housetoggle, setHousetoggle] = useState(0);
  const [toggle, setToggle] = useState([0, 0, 0, 0]);
  const [isInitialPlace, setIsInitialPlace] = useState(false);
  const handleClick = (toggleValue: number) => {
    if (toggleValue === 1) {
      setGlphoto1(og1Photo);
      setGlphoto2(og2Photo);
      setHouseName("Wanderer");
      setOg(["Sijilink", "Nimboosh"]);
    } else if (toggleValue === 2) {
      setGlphoto1(og3Photo);
      setGlphoto2(og4Photo);
      setHouseName("Healer");
      setOg(["Mashark Stitch", "Sirius Duck"]);
    } else if (toggleValue === 3) {
      setGlphoto1(og5Photo);
      setGlphoto2(og6Photo);
      setHouseName("Changeling");
      setOg(["Azkapan-kapan", "Loop~ah"]);
    } else if (toggleValue === 4) {
      setGlphoto1(og7Photo);
      setGlphoto2(og8Photo);
      setHouseName("Timeturner");
      setOg(["Jaheal", "Curema"]);
    }

    if (toggle[toggleValue - 1] === 1) {
      setToggle([0, 0, 0, 0]);
      setHousetoggle(0);
      setIsInitialPlace(false);
    } else {
      if (toggleValue === 1) {
        setToggle([1, 0, 0, 0]);
      } else if (toggleValue === 2) {
        setToggle([0, 1, 0, 0]);
      } else if (toggleValue === 3) {
        setToggle([0, 0, 1, 0]);
      } else if (toggleValue === 4) {
        setToggle([0, 0, 0, 1]);
      }
      if (housetoggle !== 0) {
        setIsInitialPlace(true);
      } else {
        setIsInitialPlace(false);
      }
      setHousetoggle(toggleValue);
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col lg:flex-row lg:content-between mx-5 mt-5 lg:mt-20">
      <div className="lg:flex-1 lg:px-5">
        <div className="relative">
          <Image
            className="w-full"
            src={chooseyourhouse}
            alt="choose your house"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-white font-serif sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl">
              Choose your house
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 pb-5 pt-2">
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerWanderer
              onClick={() => handleClick(1)}
              className={cn(
                "z-10 transform transition-transform duration-500 ease-in-out hover:translate-y-0 cursor-pointer",
                toggle[0] ? "translate-y-0" : "-translate-y-1/4",
              )}
            ></BannerWanderer>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-md md:text-xl lg:text-sm xl:text-xl">
              Wanderer
            </p>
          </div>
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerHealer
              onClick={() => handleClick(2)}
              className={cn(
                "z-10 transform transition-transform duration-500 ease-in-out hover:translate-y-0 cursor-pointer",
                toggle[1] ? "translate-y-0" : "-translate-y-1/4",
              )}
            ></BannerHealer>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-md md:text-xl lg:text-sm xl:text-xl">
              Healer
            </p>
          </div>
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerChangeling
              onClick={() => handleClick(3)}
              className={cn(
                "z-10 transform transition-transform duration-500 ease-in-out hover:translate-y-0 cursor-pointer",
                toggle[2] ? "translate-y-0" : "-translate-y-1/4",
              )}
            ></BannerChangeling>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-md md:text-xl lg:text-sm xl:text-xl">
              Changeling
            </p>
          </div>
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerTimeturner
              onClick={() => handleClick(4)}
              className={cn(
                "z-10 transform transition-transform duration-500 ease-in-out hover:translate-y-0 cursor-pointer",
                toggle[3] ? "translate-y-0" : "-translate-y-1/4",
              )}
            ></BannerTimeturner>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-md md:text-xl lg:text-sm xl:text-xl">
              Timeturner
            </p>
          </div>
        </div>
      </div>

      <div className="relative lg:flex-1 lg:px-5 justify-center overflow-hidden h-[80vw] sm:h-[80vw] md:h-[80vw] lg:h-[70vh] xl:h-[75vh] 2xl:h-[80vh] w-full">
        <div className="relative overflow-hidden h-full w-full">
          <div className="absolute z-10 top-0 left-0">
            <Image className="w-full h-auto" src={glclose} alt="paper frame" />
          </div>
          <div
            className={cn(
              "absolute z-0 top-0 left-0 transition duration-500 ease-in-out",
              isInitialPlace ? "-translate-y-[69%]" : "translate-y-[0%]",
              housetoggle !== 0 ? "translate-y-[0%]" : "-translate-y-[69%]",
            )}
          >
            <HouseGl
              glphoto1={glphoto1}
              glphoto2={glphoto2}
              house={houseName}
              og={og}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseSection;
