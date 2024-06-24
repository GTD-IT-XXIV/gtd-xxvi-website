"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, useState } from "react";

import { cn } from "@/lib/utils";

import GTDButtonBackground from "./gtd-button-background";

const buttonVariants = cva(
  "relative z-0 font-serif text-[#402A10] transition hover:scale-105",
  {
    variants: {
      size: {
        default:
          "py-2 px-6 text-sm sm:py-2.5 sm:px-10 sm:text-lg md:py-3 md:px-12 md:text-xl lg:py-4 lg:px-16 lg:text-2xl",
        lg: "py-2.5 px-10 text-lg sm:py-3 sm:px-12 sm:text-xl md:py-4 md:px-16 md:text-2xl lg:py-5 lg:px-20 lg:text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export default function GTDButton({
  children,
  size,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: HTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={cn(buttonVariants({ size, className }))}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter && onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave && onMouseLeave(e);
      }}
      {...props}
    >
      <div className="absolute h-full inset-0 -z-10 grid place-items-center">
        <GTDButtonBackground
          isHovered={isHovered}
          className="drop-shadow-lg -z-10"
        />
        <GTDButtonBackground
          isHovered={isHovered}
          className="absolute top-[7px] -z-20"
        />
      </div>
      <span>{children}</span>
    </button>
  );
}
