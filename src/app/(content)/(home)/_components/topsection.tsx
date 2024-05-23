import Image from "next/image";
import Link from "next/link";
import React from "react";

import logogtd from "@/assets/images/logo-gtd-white-transparent.png";

import registerbtn from "../_assets/registerbtn.png";
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
          <Image
            src={registerbtn}
            width={150}
            height={100}
            alt="register button"
            className="justify-center transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg md:w-[200px] xl:w-[300px] 2xl:w-[400px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topsection;
