import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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
    <div className="relative h-[600px]">
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
          className={cn(
            "absolute bottom-16 flex flex-col justify-center px-12",
            {
              "md:text-left md:items-start": alignLeft,
              "md:text-right md:items-end": !alignLeft,
            },
          )}
        >
          <div className="w-full md:w-1/2">
            <h1 className="text-[1.875rem] text-white font-semibold md:text-[3rem] md:font-extrabold">
              {heading}
            </h1>
            <h2 className="text-[1rem] text-white py-2 font-normal md:font-semibold md:text-[1.5rem]">
              {date}
            </h2>
            <p className="text-[0.8rem] text-white font-extralight py-1 pb-2 md:font-normal md:text-[1rem]">
              {description}
            </p>
            {!buttonDisabled && buttonLink && (
              <Link href={buttonLink} passHref>
                <Button className="text-black bg-white my-4 rounded-md hover:bg-slate-100 transition duration-300 ease-in-out md:py-4">
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
