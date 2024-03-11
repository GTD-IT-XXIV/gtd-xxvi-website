"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

const merchItemCarouselImageVariants = cva(
  "w-full object-contain hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "aspect-[4/3]",
        square: "aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type MerchItemCarouselProps = {
  images: string[];
  className?: string;
} & VariantProps<typeof merchItemCarouselImageVariants>;

export default function MerchItemCarousel({
  images,
  className = "",
  variant,
}: MerchItemCarouselProps) {
  const [_, setApi] = useState<CarouselApi>();

  return (
    <Carousel setApi={setApi} className={cn("w-full", className)}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={idx}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Image
                  src={image}
                  alt="Merchandise preview photo"
                  width={1080}
                  height={1080}
                  className={merchItemCarouselImageVariants({ variant })}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Image
                  src={image}
                  alt="Merchandise preview photo"
                  width={1080}
                  height={1080}
                  className="aspect-square object-contain"
                />
                <AlertDialogCancel asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 p-0"
                  >
                    <X className="size-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </AlertDialogCancel>
              </AlertDialogContent>
            </AlertDialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="translate-x-14 border-0 bg-transparent" />
      <CarouselNext className="-translate-x-14 border-0 bg-transparent" />
    </Carousel>
  );
}
