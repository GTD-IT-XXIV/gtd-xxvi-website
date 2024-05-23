"use client";

import Image from "next/image";
import React, { useState } from "react";

import blueflag from "../_assets/blueflag.png";
import glclose from "../_assets/glclose.png";
import glopen from "../_assets/glopen.png";
import greenflag from "../_assets/greenflag.png";
import redflag from "../_assets/redflag.png";
import topborderhouse from "../_assets/topborderhouse.png";
import yellowflag from "../_assets/yellowflag.png";
import style from "./house-section.module.css";

const Housesection = () => {
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
      <div className="justify-center self-center flex pt-10 lg:pt-20 z-20">
        <Image
          src={topborderhouse}
          width={800}
          height={200}
          alt="top border house"
        />
      </div>
      <div className="flex px-10 mb-1 lg:px-20 relative">
        <Image
          onClick={() => handleClick(1)}
          src={redflag}
          width={800}
          height={200}
          alt="redflag"
          className={`${style.flag} pt-3 z-10 pr-1.5 cursor-pointer ${toggle[0] && style.onflag}`}
        />
        <Image
          onClick={() => handleClick(2)}
          src={greenflag}
          width={800}
          height={200}
          alt="greenflag"
          className={`${style.flag} pt-3 z-10 px-1.5 cursor-pointer ${toggle[1] && style.onflag}`}
        />
        <Image
          onClick={() => handleClick(3)}
          src={blueflag}
          width={800}
          height={200}
          alt="blueflag"
          className={`${style.flag} pt-3 z-10 px-1.5 cursor-pointer ${toggle[2] && style.onflag}`}
        />
        <Image
          onClick={() => handleClick(4)}
          src={yellowflag}
          width={800}
          height={200}
          alt="yellowflag"
          className={`${style.flag} pt-3 z-10 pl-1.5 cursor-pointer ${toggle[3] && style.onflag}`}
        />
      </div>
      <div className="flex px-10 mb-1 lg:px-20 absolute">
        <Image
          src={redflag}
          width={800}
          height={200}
          alt="redflag"
          className={`pt-24 z-0 pr-1.5`}
        />
        <Image
          src={greenflag}
          width={800}
          height={200}
          alt="greenflag"
          className={`pt-24 z-0 px-1.5`}
        />
        <Image
          src={blueflag}
          width={800}
          height={200}
          alt="blueflag"
          className={`pt-24 z-0 px-1.5`}
        />
        <Image
          src={yellowflag}
          width={800}
          height={200}
          alt="yellowflag"
          className={`pt-24 z-0 pl-1.5`}
        />
      </div>
      <div className="flex text-white justify-between mb-10 px-10">
        <p>House A</p>
        <p>House B</p>
        <p>House C</p>
        <p>House D</p>
      </div>
      <div className="justify-center self-center pb-10 lg:pb-20">
        {housetoggle === 0 && (
          <Image
            className=""
            src={glclose}
            width={800}
            height={200}
            alt="paper frame"
          />
        )}
        {housetoggle === 1 && (
          <Image
            className=""
            src={glopen}
            width={800}
            height={200}
            alt="paper frame"
          />
        )}
        {housetoggle === 2 && (
          <Image
            className=""
            src={glopen}
            width={800}
            height={200}
            alt="paper frame"
          />
        )}
        {housetoggle === 3 && (
          <Image
            className=""
            src={glopen}
            width={800}
            height={200}
            alt="paper frame"
          />
        )}
        {housetoggle === 4 && (
          <Image
            className=""
            src={glopen}
            width={800}
            height={200}
            alt="paper frame"
          />
        )}
      </div>
    </div>
  );
};

export default Housesection;
