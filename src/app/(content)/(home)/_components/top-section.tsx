"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import GTDButton from "@/app/_components/gtd-button";

import logogtd from "@/assets/images/logo-gtd-vaelora.webp";

import topbgdesktop from "../_assets/top-section-bg-desktop.webp";
import topbg from "../_assets/top-section-bg.webp";

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
        className="object-bottom md:h-[92dvh] xl:h-auto"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div>
            <Image
              src={logogtd}
              alt="logo gtd"
              className="justify-center self-center w-[250px] sm:w-[300px] md:w-[350px] xl:w-[350px] 2xl:w-[400px] mb-10"
            />
          </div>
          <Link
            href="https://forms.gle/pjoyrjRkwwJayBw68"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="relative flex flex-col">
              <GTDButton>Register</GTDButton>
            </div>
          </Link>
        </div>
        <LuChevronDown className="size-8 animate-bounce text-white" />
      </div>
    </div>
  );
};

export default TopSection;
