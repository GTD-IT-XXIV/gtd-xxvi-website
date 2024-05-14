"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { type StaticImport } from "next/dist/shared/lib/get-img-props";

export type TextParallaxContentProps = {
  imgUrl: StaticImport;
  heading: string;
  date: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
  children: React.ReactNode;
  alignLeft: boolean;
};

const IMG_PADDING = 12;

export default function TextParallaxContent({ imgUrl, heading, date, description, buttonLink, buttonText, children, alignLeft }: TextParallaxContentProps) {
  return (
    <div>
      <div className="relative h-[150vh]">
        <Image
          src={imgUrl}
          alt="background-1"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: `calc(100vh + ${IMG_PADDING * 0.5}px)`,
            top: `-${IMG_PADDING * 0.5}px`,
            opacity: 0.8,
          }}
          className="sticky z-0 overflow-hidden w-screen"
        />
        {/* Rendering StickyImage with provided imgUrl */}
        <div className={`absolute inset-0 flex flex-col justify-center px-12 text-left md:text-${alignLeft ? 'left' : 'right'} ${alignLeft ? 'items-start' : 'items-end'}`}>
        <div className={`w-full md:w-2/5 ${alignLeft ? '' : 'text-right'}`}>
          <h1 className="text-4xl text-white font-semibold">{heading}</h1>
          <h2 className="text-l text-white py-2 font-thin">{date}</h2>
          <p className="text-l text-white font-thin pb-2">{description}</p>
          {buttonLink && (
            <Link href={buttonLink} passHref>
              <button className="text-black bg-white px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out">
                {buttonText}
              </button>
            </Link>
          )}
        </div>
        </div>
      </div>
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
