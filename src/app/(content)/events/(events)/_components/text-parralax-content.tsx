import Image from "next/image";
import Link from "next/link";
import React from "react";

import { H2, P } from "@/app/_components/typography";

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
            className="z-0 object-cover"
            fill
            priority
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
            <H2 className="text-white md:text-5xl md:font-extrabold mb-5">
              {heading}
            </H2>
            <time className="block text-base text-white mb-3 font-normal md:font-semibold md:text-2xl">
              {date}
            </time>
            <P className="text-white py-1 pb-2" size="sm">
              {description}
            </P>
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
