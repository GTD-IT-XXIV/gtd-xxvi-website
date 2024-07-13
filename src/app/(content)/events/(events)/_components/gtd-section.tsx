"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type HTMLAttributes, useRef } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

import { Table, TableBody, TableCell } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";

import { cn } from "@/lib/utils";

import eventsPageMap from "../_assets/events-page-map.webp";
import terrain1 from "../_assets/terrain-1.webp";
import terrain2 from "../_assets/terrain-2.webp";
import terrain3 from "../_assets/terrain-3.webp";
import terrain4 from "../_assets/terrain-4.webp";
import { gtdData } from "../_constants/gtd-data";
import DayBanner from "./day-banner";

const MotionImage = motion(Image);

export default function GTDSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { day1, day2, day3, day4 } = gtdData;

  const terrain1Ref = useRef<HTMLImageElement>(null);
  const terrain1IsInView = useInView(terrain1Ref, {
    amount: 0.75,
  });

  const terrain2Ref = useRef<HTMLImageElement>(null);
  const terrain2IsInView = useInView(terrain2Ref, {
    amount: 0.75,
  });

  const terrain3Ref = useRef<HTMLImageElement>(null);
  const terrain3IsInView = useInView(terrain3Ref, {
    amount: 0.75,
  });

  const terrain4Ref = useRef<HTMLImageElement>(null);
  const terrain4IsInView = useInView(terrain4Ref, {
    amount: 0.25,
  });

  return (
    <div
      className={cn(
        "relative z-0 font-reggae-one drop-shadow-[0_4px_3px_rgba(163,103,103,0.5)]",
        className,
      )}
      {...props}
    >
      <Image
        src={eventsPageMap}
        alt="Events map scroll"
        sizes="(max-width: 640px) 100vw, 50vw"
        className="w-full"
      />

      {/* Day Banners */}
      <DayBanner
        text={day1.title}
        className="absolute inset-x-0 top-[5%] z-20 mx-auto w-[96%]"
      />
      <DayBanner
        text={day2.title}
        className="absolute inset-x-0 top-[28%] z-20 mx-auto w-[96%]"
      />
      <DayBanner
        text={day3.title}
        className="absolute inset-x-0 top-[50%] z-20 mx-auto w-[96%]"
      />
      <DayBanner
        text={day4.title}
        className="absolute inset-x-0 top-[71%] z-20 mx-auto w-[96%]"
        textClassName="text-[28px]"
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 w-4/5 mx-auto overflow-y-hidden">
        <div className="relative w-full">
          <MotionImage
            ref={terrain1Ref}
            src={terrain1}
            alt="Map terrain"
            className="w-full"
            sizes="(max-width: 640px) 100vw, 50vw"
            animate={{
              maskImage: `radial-gradient(72.91% 70.45% at 30.7% 58.39%, rgba(153, 153, 153, 0.25) ${terrain1IsInView ? 15 : 0}%, #999 ${terrain1IsInView ? 100 : 0}%)`,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: terrain1IsInView ? 1 : 0,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <dl className="relative top-[40%] left-[15%] space-y-2.5 w-3/5">
              <div>
                <dt className="text-[3vw] sm:text-[1.5vw]">Location</dt>
                <dl className="text-[5vw] sm:text-[2.7vw]">{day1.location}</dl>
              </div>
              <div>
                <dt className="text-[3vw] sm:text-[1.5vw]">Time</dt>
                <dl className="text-[5vw] sm:text-[2.7vw]">
                  {day1.date},<br />
                  {day1.time}
                </dl>
              </div>
              <div>
                <dt className="text-[3vw] sm:text-[1.5vw]">Dresscode</dt>
                <dl className="text-[5vw] sm:text-[2.7vw]">{day1.dresscode}</dl>
              </div>
            </dl>
          </motion.div>
        </div>
        <div className="relative w-full">
          <MotionImage
            ref={terrain2Ref}
            src={terrain2}
            alt="Map terrain"
            className="w-full"
            sizes="(max-width: 640px) 100vw, 50vw"
            animate={{
              maskImage: `radial-gradient(107.23% 136.74% at 66.47% 55.19%, rgba(153, 153, 153, 0.25) ${terrain2IsInView ? 15 : 0}%, #999 ${terrain2IsInView ? 100 : 0}%)`,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: terrain2IsInView ? 1 : 0,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <dl className="relative top-[4.5%] left-[30%] space-y-2.5 w-3/5 text-right">
              <div>
                <dt className="text-[3vw] sm:text-[1.5vw]">Location</dt>
                <dl className="text-[5vw] sm:text-[2.7vw]">{day2.location}</dl>
              </div>
              <div>
                <dt className="text-[3vw] sm:text-[1.5vw]">Time</dt>
                <dl className="text-[5vw] sm:text-[2.7vw]">
                  {day2.date},<br />
                  {day2.time}
                </dl>
              </div>
              <div>
                <dt className="text-[3vw] sm:text-[1.5vw]">Dresscode</dt>
                <dl className="text-[5vw] sm:text-[2.7vw]">{day2.dresscode}</dl>
              </div>
            </dl>
          </motion.div>
          <div className="relative w-full">
            <MotionImage
              ref={terrain3Ref}
              src={terrain3}
              alt="Map terrain"
              className="w-full"
              sizes="(max-width: 640px) 100vw, 50vw"
              animate={{
                maskImage: `radial-gradient(93.5% 112.4% at 31.78% 54.28%, rgba(153, 153, 153, 0.25) ${terrain3IsInView ? 25 : 0}%, #999 ${terrain3IsInView ? 100 : 0}%)`,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: terrain3IsInView ? 1 : 0,
              }}
              initial={{
                opacity: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <dl className="relative top-[23%] left-[10%] space-y-2.5 w-3/5">
                <div>
                  <dt className="text-[3vw] sm:text-[1.5vw]">Location</dt>
                  <dl className="text-[5vw] sm:text-[2.7vw]">
                    {day3.location}
                  </dl>
                </div>
                <div>
                  <dt className="text-[3vw] sm:text-[1.5vw]">Time</dt>
                  <dl className="text-[5vw] sm:text-[2.7vw]">
                    {day3.date},<br />
                    {day3.time}
                  </dl>
                </div>
                <div>
                  <dt className="text-[3vw] sm:text-[1.5vw]">Dresscode</dt>
                  <dl className="text-[5vw] sm:text-[2.7vw]">
                    {day3.dresscode}
                  </dl>
                </div>
              </dl>
            </motion.div>
          </div>
          <div className="relative w-full">
            <MotionImage
              ref={terrain4Ref}
              src={terrain4}
              alt="Map terrain"
              className="w-full"
              sizes="(max-width: 640px) 100vw, 50vw"
              animate={{
                maskImage: `radial-gradient(91.27% 58.32% at 71.87% 20.35%, rgba(153, 153, 153, 0.25) ${terrain4IsInView ? 15 : 0}%, #999 ${terrain4IsInView ? 100 : 0}%)`,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: terrain4IsInView ? 1 : 0,
              }}
              initial={{
                opacity: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <dl className="relative top-[8%] left-[31%] space-y-2.5 w-3/5 text-right">
                <div>
                  <dt className="text-[3vw] sm:text-[1.5vw]">Location</dt>
                  <dl className="text-[5vw] sm:text-[2.7vw]">
                    {day4.location}
                  </dl>
                </div>
                <div>
                  <dt className="text-[3vw] sm:text-[1.5vw]">Time</dt>
                  <dl className="text-[5vw] sm:text-[2.7vw]">
                    {day4.date},<br />
                    {day4.time}
                  </dl>
                </div>
                <div>
                  <dt className="text-[3vw] sm:text-[1.5vw]">Dresscode</dt>
                  <dl className="text-[5vw] sm:text-[2.7vw]">
                    {day4.dresscode}
                  </dl>
                </div>
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
