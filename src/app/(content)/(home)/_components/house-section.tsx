"use client";

import Image from "next/image";
import React, { useState } from "react";

import blueflag from "../_assets/blueflag.png";
import chooseyourhouse from "../_assets/chooseyourhouse.png";
import glclose from "../_assets/glclose.png";
import glphoto from "../_assets/glphoto.png";
import greenflag from "../_assets/greenflag.png";
import redflag from "../_assets/redflag.png";
import yellowflag from "../_assets/yellowflag.png";
import style from "./house-section.module.css";
import HouseGl from "./housegl";

const HouseSection = () => {
  const [housetoggle, setHousetoggle] = useState(0);
  const [toggle, setToggle] = useState([0, 0, 0, 0]);

  const handleClick = (toggleValue: number) => {
    if (toggle[toggleValue - 1] === 1) {
      setToggle([0, 0, 0, 0]);
      setHousetoggle(0);
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
      setHousetoggle(toggleValue);
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col">
      <div className="relative mt-20">
        <Image
          className="w-full"
          src={chooseyourhouse}
          alt="choose your house"
          width={400}
          height={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-white font-serif sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Choose your house
          </p>
        </div>
      </div>

      {/* <div
        className="mb-1 justify-center px-7 py-2 bg-slate-900 rounded-full 
          border border-sky-500 font-serif text-white self-center flex mt-10 xl:mt-20
          sm:py-2 sm:px-7 sm:text-lg 
          md:py-3 md:px-8 md:text-xl 
          lg:py-4 lg:px-10 lg:text-2xl 
          xl:py-5 xl:px-12 xl:text-3xl"
      >
        Choose your house
      </div> */}
      <div className="flex px-10 mb-16 sm:mb-24 md:mb-36 lg:mb-44 xl:mb-44 md:px-16 lg:px-32 xl:px-52 relative">
        <div className="flex flex-col">
          <div className="relative">
            <Image
              onClick={() => handleClick(1)}
              src={redflag}
              width={800}
              height={200}
              alt="redflag"
              className={`${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] && style.flag} pt-3 absolute px-1.5 
              ${toggle[0] ? style.onflag : style.offflag} `}
            />
            <Image
              src={redflag}
              width={800}
              height={200}
              alt="redflag"
              className={`pt-3 px-1.5`}
            />
          </div>
          <p className="text-white font-serif pt-2 lg:pt-3 self-center md:text-xl lg:text-2xl xl:text-3xl">
            House A
          </p>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <Image
              onClick={() => handleClick(2)}
              src={greenflag}
              width={800}
              height={200}
              alt="redflag"
              className={`${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] && style.flag} pt-3 absolute px-1.5 
              ${toggle[1] ? style.onflag : style.offflag} `}
            />
            <Image
              src={greenflag}
              width={800}
              height={200}
              alt="redflag"
              className={`pt-3 px-1.5`}
            />
          </div>
          <p className="text-white font-serif pt-2 lg:pt-3 self-center md:text-xl lg:text-2xl xl:text-3xl">
            House B
          </p>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <Image
              onClick={() => handleClick(3)}
              src={blueflag}
              width={800}
              height={200}
              alt="redflag"
              className={`${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] && style.flag} pt-3 absolute px-1.5 
              ${toggle[2] ? style.onflag : style.offflag} `}
            />
            <Image
              src={blueflag}
              width={800}
              height={200}
              alt="redflag"
              className={`pt-3 px-1.5`}
            />
          </div>
          <p className="text-white font-serif pt-2 lg:pt-3 self-center md:text-xl lg:text-2xl xl:text-3xl">
            House C
          </p>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <Image
              onClick={() => handleClick(4)}
              src={yellowflag}
              width={800}
              height={200}
              alt="redflag"
              className={`${!toggle[0] && !toggle[1] && !toggle[2] && !toggle[3] && style.flag} pt-3 absolute px-1.5 
              ${toggle[3] ? style.onflag : style.offflag} `}
            />
            <Image
              src={yellowflag}
              width={800}
              height={200}
              alt="redflag"
              className={`pt-3 px-1.5`}
            />
          </div>
          <p className="text-white font-serif pt-2 lg:pt-3 self-center md:text-xl lg:text-2xl xl:text-3xl">
            House D
          </p>
        </div>
      </div>
      <div className="justify-center self-center pb-10 lg:pb-20 transition-opacity duration-1000 ease-in-out">
        {housetoggle === 0 ? (
          <div>
            <Image
              className={`transition-opacity duration-1000 ease-in-out ${housetoggle === 0 ? "opacity-100" : "opacity-0"}`}
              src={glclose}
              width={800}
              height={200}
              alt="paper frame"
            />
          </div>
        ) : housetoggle === 1 ? (
          <div
            className={`transition duration-1000 ease-in-out ${housetoggle === 1 ? "opacity-100" : "opacity-0"}`}
          >
            <HouseGl
              glphoto1={glphoto}
              glphoto2={glphoto}
              house={"A"}
              og={[1, 2]}
            />
          </div>
        ) : housetoggle === 2 ? (
          <div
            className={`transition-opacity duration-1000 ease-in-out ${housetoggle === 2 ? "opacity-100" : "opacity-0"}`}
          >
            <HouseGl
              glphoto1={glphoto}
              glphoto2={glphoto}
              house={"B"}
              og={[3, 4]}
            />
          </div>
        ) : housetoggle === 3 ? (
          <div
            className={`transition-opacity duration-1000 ease-in-out ${housetoggle === 3 ? "opacity-100" : "opacity-0"}`}
          >
            <HouseGl
              glphoto1={glphoto}
              glphoto2={glphoto}
              house={"C"}
              og={[5, 6]}
            />
          </div>
        ) : (
          <div>
            <HouseGl
              glphoto1={glphoto}
              glphoto2={glphoto}
              house={"D"}
              og={[7, 8]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseSection;
