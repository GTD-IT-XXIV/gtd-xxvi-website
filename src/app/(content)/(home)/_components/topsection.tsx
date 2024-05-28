import Image from "next/image";
import Link from "next/link";
import React from "react";

import logogtd from "@/assets/images/logo-gtd-white-transparent.png";

import topbackground from "../_assets/topbackground.png";

const Topsection = () => {
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
        <Link href="/" className="">
          <button
            className="bg-yellow-700 font-serif py-2 px-7 rounded-full justify-center transform transition-transform 
          duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:bg-yellow-800
          sm:py-2 sm:px-7 sm:text-lg 
          md:py-3 md:px-8 md:text-xl 
          lg:py-4 lg:px-10 lg:text-2xl 
          xl:py-5 xl:px-12 xl:text-3xl"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Topsection;
