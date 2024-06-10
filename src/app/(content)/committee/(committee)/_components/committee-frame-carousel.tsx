"use client";

import Image from "next/image";
import { LuX as X } from "react-icons/lu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";

import { data } from "../const";
import FrameImage from "./FrameImage";

// The real component function
export default function CommFrameImage() {
  return (
    <div className={cn("w-full")}>
      {data.map((item, idx) => (
        <AlertDialog key={idx}>
          <AlertDialogTrigger asChild>
            <div className="cursor-pointer">
              <FrameImage
                src={item.src}
                name={item.name}
                major={item.major}
                year={item.year}
                portfolio={item.portfolio}
                OG={item.OG}
                size="small"
                className=""
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex items-center justify-center h-[450px] w-[364px]">
            <FrameImage
              src={item.src}
              name={item.name}
              major={item.major}
              year={item.year}
              portfolio={item.portfolio}
              OG={item.OG}
              size="large"
              className="inset-0 z-10"
            />
            <div className="absolute inset-0 bg-black opacity-80"></div>{" "}
            {/* Overlay div */}
            <div className="absolute flex flex-col items-center justify-center text-center text-white p-6 rounded-lg h-full w-full z-20">
              <div className="pb-5 mb-5">
                <p className="font-serif text-[24px] mb-0">
                  <strong>Full Name:</strong>
                </p>
                <p className="italic text-[26px] mt-0">{item.name}</p>
              </div>
              <div className="pb-5 mb-5">
                <p className="font-serif text-[24px]">
                  <strong>Course:</strong>
                </p>
                <p className="italic text-[26px]">
                  {item.year} - {item.major}
                </p>
              </div>
              <div className="mb-4">
                <p className="font-serif text-[36px]">
                  <strong>{item.OG}</strong>
                </p>
                <p className="text-[20px]">{item.portfolio}</p>
              </div>
            </div>
            <AlertDialogCancel asChild>
              <button
                type="button"
                className="absolute top-0 right-2 p-2 rounded-full bg-transparent text-brown-700 hover:bg-transparent border-none z-40"
              >
                <X className="w-8 h-8" color="#D2B48C" />
                <span className="sr-only">Close</span>
              </button>
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  );
}
