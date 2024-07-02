"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

import GTDButton from "@/app/_components/gtd-button";

import logogtd from "../_assets/logo-gtd.png";
import topbgdesktop from "../_assets/top-section-bg-desktop.png";
import topbg from "../_assets/top-section-bg.png";

const TopSection = () => {
  const [imageSrc, setImageSrc] = useState(topbg);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setImageSrc(topbg);
      } else {
        setImageSrc(topbgdesktop);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <Image
        src={imageSrc}
        alt="background"
        className="object-bottom md:h-dvh xl:h-auto"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div>
          <Image
            src={logogtd}
            alt="logo gtd"
            className="justify-center self-center w-[250px] sm:w-[300px] md:w-[350px] xl:w-[350px] 2xl:w-[400px] mb-10"
          />
        </div>
        <Link href="/" className="">
          <div className="relative flex flex-col">
            <GTDButton>Register</GTDButton>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopSection;
