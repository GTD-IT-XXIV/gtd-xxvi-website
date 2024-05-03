import { type VariantProps, cva } from "class-variance-authority";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import { cn } from "@/lib/utils";

import GTDFestSectionCarousel from "./gtdfest-section-carousel";

const containerVariants = cva(
  "absolute inset-0 flex items-center p-12 gap-12 flex-wrap overflow-y-auto",
  {
    variants: {
      variant: {
        left: "flex-row-reverse",
        right: "flex-row",
      },
    },
    defaultVariants: {
      variant: "left",
    },
  },
);

const sectionVariants = cva("basis-56 grow flex gap-2 flex-col justify-end", {
  variants: {
    variant: {
      left: "items-start text-left",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    variant: "left",
  },
});

export type GTDFestSectionProps = {
  className?: string;
  title: string;
  description: string;
  image: { src: StaticImport; alt: string };
  carouselImages?: { src: StaticImport; alt: string }[];
} & VariantProps<typeof containerVariants> &
  VariantProps<typeof sectionVariants>;

export default function GTDFestSection({
  className = "",
  title,
  description,
  image,
  carouselImages,
  variant,
}: GTDFestSectionProps) {
  return (
    <section className={cn("w-full relative", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        className="h-auto w-full aspect-[3/4] md:aspect-video object-cover opacity-35"
      />
      <div className={containerVariants({ variant })}>
        {!!carouselImages && (
          <GTDFestSectionCarousel
            className="basis-1/2 grow"
            images={carouselImages}
          />
        )}
        <div className={sectionVariants({ variant })}>
          <h2 className="font-serif text-4xl">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
