import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export type TextParallaxContentProps = {
  imgUrl: string;
  heading: string;
  date: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
  buttonDisabled?: boolean;
  children: React.ReactNode;
  alignLeft: boolean;
};

export default function TextParallaxContent({
  imgUrl,
  heading,
  date,
  description,
  buttonLink,
  buttonText,
  buttonDisabled,
  children,
  alignLeft,
}: TextParallaxContentProps) {
  return (
    <div style={{ position: "relative", height: "600px" }}>
      <div className="relative h-full">
        <div className="absolute inset-0 brightness-50">
          <Image
            src={imgUrl}
            alt="background-1"
            layout="fill"
            className="z-0 object-cover"
          />
        </div>
        <div
          className={`absolute bottom-16 flex flex-col justify-center px-12 text-left md:text-${
            alignLeft ? "left" : "right"
          } md:${alignLeft ? "items-start" : "items-end"}`}
        >
          <div
            className={`w-full md:w-1/2 md:${alignLeft ? "" : "text-right"}`}
          >
            <h1 className="text-[1.875rem] px-6 text-white font-semibold md:text-[3rem] md:font-extrabold md:px-8">
              {heading}
            </h1>
            <h2 className="text-[1rem] px-6 text-white py-2 font-normal md:font-semibold md:text-[1.5rem] md:px-8">
              {date}
            </h2>
            <p className="text-[0.8rem] px-6 text-white font-extralight py-1 pb-2 md:font-normal md:text-[1rem] md:px-8">
              {description}
            </p>
            {!buttonDisabled && buttonLink && (
              <Link href={buttonLink} passHref>
                <Button className="text-black mx-6 bg-white my-4 rounded-md hover:bg-slate-100 transition duration-300 ease-in-out md:mx-8 md:my-4 md:pl-4 md:py-4">
                  {buttonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
