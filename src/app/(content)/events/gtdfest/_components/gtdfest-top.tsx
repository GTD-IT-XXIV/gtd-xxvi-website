"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown as ChevronDown } from "react-icons/lu";

import { Button } from "@/components/ui/button";

dayjs.extend(utc);

export type GTDFestTopProps = {
  backgroundImage: StaticImport;
  logo: StaticImport;
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
  // const startDateLabel = "18 Feb";
  // const endDateLabel = "3 Mar 2024";

  return (
    <section className="relative">
      <Image
        src={backgroundImage}
        alt="Background 1"
        sizes="100vw"
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
            sizes="(max-width: 768px) 100vw, 50vw"
            className="shrink min-h-0 h-auto min-w-0 max-h-[80%] w-auto aspect-[0.87/1] object-cover"
          />
          <div className="grow md:grow-0 text-center space-y-4">
            <hgroup className="space-y-3">
              <h1 className="text-lg md:text-2xl font-serif">
                <div>{gtdFest.name}</div>
                <div className="text-4xl md:text-6xl lg:text-7xl text-amber-100 text-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-amber-100 italic tracking-wider">
                  Enchantium
                </div>
                <p className="text-lg md:text-xl opacity-65">X</p>
                <div>{escapeRoom.name}</div>
                <div className="text-4xl md:text-6xl lg:text-7xl text-red-200 text-shadow-[0px_0px_4px_var(--tw-shadow-color)] shadow-red-200 italic tracking-wider">
                  Nyctophobia
                </div>
                {/* <div className="text-4xl md:text-5xl lg:text-6xl italic tracking-wider text-amber-100">
                  Pre-order
                  <br />
                  Enchantium
                  <br />
                  Merchandise
                </div> */}
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
                <Link
                  href="https://bit.ly/FotoGTDFest"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  See Photos
                </Link>
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
          <ChevronDown className="size-8 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
