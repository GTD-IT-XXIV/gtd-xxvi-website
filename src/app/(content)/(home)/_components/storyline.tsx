import Image from "next/image";
import Link from "next/link";
import React from "react";

import learnmorebtn from "../_assets/learnmorebtn.png";
import storylinebg from "../_assets/storylinebg.png";
import Framevideo from "./framevideo";

const Storyline = () => {
  return (
    <>
      <div className="relative">
        <Image
          src={storylinebg}
          width={800}
          height={200}
          alt="storyline backround"
          className="w-full bg-cover bg-center md:h-[600px] xl:h-[1000px] 2xl:h-[1200]"
        />
        <div className="absolute top-1/2 px-12">
          <Framevideo />
        </div>
        <div className="absolute left-1/3 bottom-5">
          <Link href="/" className="">
            <Image
              src={learnmorebtn}
              width={150}
              height={100}
              alt="register button"
              className="justify-center transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg md:w-[200px] xl:w-[300px] 2xl:w-[400px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Storyline;
