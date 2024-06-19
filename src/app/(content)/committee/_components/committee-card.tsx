"use client";

import { type HTMLAttributes } from "react";
import { LuX as X } from "react-icons/lu";

import { Button } from "@/app/_components/ui/button";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { Committee } from "@/lib/types";
import { cn } from "@/lib/utils";

import FrameImage from "./frame-image";

export type CommitteeCardProps = {
  committee: Committee;
} & HTMLAttributes<HTMLDivElement>;

// The real component function
export default function CommiteeCard({
  committee,
  className = "",
  ...props
}: CommitteeCardProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FrameImage
          src={committee.image.animated}
          nickname={committee.nickname ?? committee.name.split(" ")[0]!}
          size="small"
          animated
          className={cn("cursor-pointer drop-shadow-lg", className)}
          {...props}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex items-center justify-center bg-transparent p-0 rounded-none sm:rounded-none border-0">
        <FrameImage
          src={committee.image.still}
          nickname={committee.nickname ?? committee.name.split(" ")[0]!}
          size="large"
          className="inset-0 z-10"
        />
        {/* Overlay div */}
        <div className="absolute flex flex-col items-center justify-center text-center text-white p-6 rounded-lg h-full w-full z-20">
          <div className="pb-5 mb-5">
            <p className="font-serif text-2xl mb-0">Full Name:</p>
            <p className="italic text-[1.375rem] mt-0">{committee.name}</p>
          </div>
          <div className="pb-5 mb-5">
            <p className="font-serif text-2xl">Course:</p>
            <p className="italic text-[1.375rem]">
              {committee.year} - {committee.major}
            </p>
          </div>
          <div className="mb-4">
            <p className="font-serif text-4xl">OG {committee.og}</p>
            <p className="text-xl font-light">
              {committee.portfolio} {committee.position}
            </p>
          </div>
        </div>
        <AlertDialogCancel asChild>
          <Button
            type="button"
            size="icon"
            className="absolute top-[6.5%] right-[6.5%] p-2 rounded-full bg-transparent text-brown-700 hover:bg-transparent border-none z-40 size-12"
          >
            <X className="size-8" color="#D2B48C" />
            <span className="sr-only">Close</span>
          </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
