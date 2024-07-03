"use client";

import Image from "next/image";
import React, { useState } from "react";

import BannerChangeling from "../_assets/banner-changeling.svg";
import BannerHealer from "../_assets/banner-healer.svg";
import BannerTimeturner from "../_assets/banner-timeturner.svg";
import BannerWanderer from "../_assets/banner-wanderer.svg";
import chooseyourhouse from "../_assets/chooseyourhouse.png";
import glclose from "../_assets/glclose.png";
import glphoto from "../_assets/glphoto.png";
import HouseGl from "./housegl";

const HouseSection = () => {
  const [og, setOg] = useState([1, 2]);
  const [houseName, setHouseName] = useState("");
  const [glphoto1, setGlphoto1] = useState(glphoto);
  const [glphoto2, setGlphoto2] = useState(glphoto);
  const [housetoggle, setHousetoggle] = useState(0);
  const [toggle, setToggle] = useState([0, 0, 0, 0]);

  const handleClick = (toggleValue: number) => {
    if (housetoggle === 0 && toggleValue === 1) {
      setGlphoto1(glphoto);
      setGlphoto2(glphoto);
      setHouseName("Wanderer");
      setOg([1, 2]);
    } else if (housetoggle === 0 && toggleValue === 2) {
      setGlphoto1(glphoto);
      setGlphoto2(glphoto);
      setHouseName("Healer");
      setOg([3, 4]);
    } else if (housetoggle === 0 && toggleValue === 3) {
      setGlphoto1(glphoto);
      setGlphoto2(glphoto);
      setHouseName("Changeling");
      setOg([5, 6]);
    } else if (housetoggle === 0 && toggleValue === 4) {
      setGlphoto1(glphoto);
      setGlphoto2(glphoto);
      setHouseName("Timeturner");
      setOg([7, 8]);
    }

    if (toggle[toggleValue - 1] === 1) {
      setToggle([0, 0, 0, 0]);
      setHousetoggle(0);
    } else {
      if (housetoggle === 0 && toggleValue === 1) {
        setToggle([1, 0, 0, 0]);
      } else if (housetoggle === 0 && toggleValue === 2) {
        setToggle([0, 1, 0, 0]);
      } else if (housetoggle === 0 && toggleValue === 3) {
        setToggle([0, 0, 1, 0]);
      } else if (housetoggle === 0 && toggleValue === 4) {
        setToggle([0, 0, 0, 1]);
      }
      setHousetoggle(toggleValue);
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col xl:flex-row xl:content-between mx-5 mt-5">
      <div className="xl:flex-1 xl:px-5">
        <div className="relative">
          <Image
            className="w-full"
            src={chooseyourhouse}
            alt="choose your house"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-white font-serif sm:text-lg md:text-xl lg:text-2xl xl:text-xl">
              Choose your house
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 pb-5 pt-2">
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerWanderer
              onClick={() => handleClick(1)}
              className={`${toggle[0] ? "translate-y-0" : "-translate-y-1/4"} z-10 transform transition-transform duration-500 ease-in-out ${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "hover:translate-y-0" : ""} ${toggle[0] ? "cursor-pointer" : !toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "cursor-pointer" : ""}`}
            ></BannerWanderer>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-xl">
              Wanderer
            </p>
          </div>
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerHealer
              onClick={() => handleClick(2)}
              className={`${toggle[1] ? "translate-y-0" : "-translate-y-1/4"} z-10 transform transition-transform duration-500 ease-in-out ${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "hover:translate-y-0" : ""} ${toggle[1] ? "cursor-pointer" : !toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "cursor-pointer" : ""}`}
            ></BannerHealer>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-xl">
              Healer
            </p>
          </div>
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerChangeling
              onClick={() => handleClick(3)}
              className={`${toggle[2] ? "translate-y-0" : "-translate-y-1/4"} z-10 transform transition-transform duration-500 ease-in-out ${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "hover:translate-y-0" : ""} ${toggle[2] ? "cursor-pointer" : !toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "cursor-pointer" : ""}`}
            ></BannerChangeling>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-xl">
              Changeling
            </p>
          </div>
          <div className="flex flex-col overflow-hidden relative px-1">
            <BannerTimeturner
              onClick={() => handleClick(4)}
              className={`${toggle[3] ? "translate-y-0" : "-translate-y-1/4"} z-10 transform transition-transform duration-500 ease-in-out ${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "hover:translate-y-0" : ""} ${toggle[3] ? "cursor-pointer" : !toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] ? "cursor-pointer" : ""}`}
            ></BannerTimeturner>
            <p className="text-white self-center pt-3 font-serif absolute bottom-[15%] text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-xl">
              Timeturner
            </p>
          </div>
        </div>
      </div>

      <div className="relative xl:flex-1 xl:px-5 justify-center overflow-hidden h-[45vh] sm:h-[60vh] md:h-[65vh] lg:h-[60vh] xl:h-[60vh] 2xl:h-[70vh] w-full">
        <div className="relative overflow-hidden h-full w-full">
          <div className="absolute z-10 top-0 left-0">
            <Image className="w-full h-auto" src={glclose} alt="paper frame" />
          </div>
          <div
            className={`absolute z-0 top-0 left-0 transition duration-500 ease-in-out ${housetoggle !== 0 ? "-translate-y-[0%]" : "-translate-y-[69%]"}`}
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
