"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ChevronDown } from "lucide-react";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

dayjs.extend(utc);

export type GTDFestTopProps = {
  backgroundImage: string | StaticImport;
  logo: string | StaticImport;
  gtdFest: {
    name: string;
    startDate: Date;
    endDate: Date;
  };
  escapeRoom: {
    name: string;
    startDate: Date;
    endDate: Date;
  };
};

export default function GTDFestTop({
  backgroundImage,
  logo,
  gtdFest,
  escapeRoom,
}: GTDFestTopProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const [center, setCenter] = useState<{ x: string; y: string }>({
    x: "50%",
    y: "50%",
  });

  useEffect(() => {
    function updateCenter() {
      if (logoRef.current) {
        const el = logoRef.current;
        setCenter({
          x: `${el.offsetLeft + el.width / 2}px`,
          y: `${el.offsetTop + el.height / 2}px`,
        });
      }
    }
    window.addEventListener("resize", updateCenter);
    updateCenter();
    return () => {
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  const startDateLabel = dayjs.utc(gtdFest.startDate).format("D MMM");
  const endDateLabel = dayjs.utc(escapeRoom.endDate).format("D MMM YYYY");

  return (
    <section className="relative">
      <Image
        src={backgroundImage}
        alt="Background 1"
        className="h-screen object-cover"
      />
      <div
        className="absolute inset-0 from-slate-900 from-25% pt-3 px-6 flex flex-col gap-2"
        style={{
          background: `radial-gradient(circle at ${center.x} ${center.y}, var(--tw-gradient-stops))`,
        }}
      >
        <div className="min-h-0 grow flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-2 md:gap-8">
          <Image
            ref={logoRef}
            src={logo}
            alt="Logo GTD Fest"
            className="shrink min-h-0 h-auto min-w-0 w-auto aspect-[0.87/1] object-cover"
          />
          <div className="grow md:grow-0 text-center space-y-4">
            <hgroup className="space-y-3">
              <h1 className="text-lg md:text-2xl font-serif">
                <div>{gtdFest.name}</div>
                <div className="text-4xl md:text-6xl lg:text-7xl text-gtd-primary-20 text-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-gtd-primary-30 italic tracking-wider">
                  Enchantium
                </div>
                <p className="text-lg md:text-xl opacity-65">X</p>
                <div>{escapeRoom.name}</div>
                <div className="text-4xl md:text-6xl lg:text-7xl text-red-600 text-shadow-[0px_0px_4px_var(--tw-shadow-color)] shadow-red-500 italic tracking-wider">
                  Nyctophobia
                </div>
              </h1>
              <p className="font-light md:text-2xl">
                {startDateLabel} - {endDateLabel}
              </p>
            </hgroup>
            <div className="flex md:flex-col justify-center items-center gap-4">
              <Button
                type="button"
                className="bg-gtd-primary-30 hover:bg-gtd-primary-20 md:px-8 md:h-12 md:text-xl font-semibold"
                asChild
              >
                <Link href="/register">Register for Events</Link>
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="hover:bg-slate-200 md:px-6"
                asChild
              >
                <Link href="#learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        <div id="learn-more" className="flex justify-center">
          <ChevronDown className="size-8 animate-pulse" />
        </div>
      </div>
    </section>
  );
}