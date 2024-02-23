"use client";

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

export type MerchBundleCardCarouselProps = {
  images: string[];
  className?: string;
};

export default function MerchBundleCardCarousel({
  images,
  className = "",
}: MerchBundleCardCarouselProps) {
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
                  className="w-full object-contain aspect-[4/3] hover:cursor-pointer"
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
