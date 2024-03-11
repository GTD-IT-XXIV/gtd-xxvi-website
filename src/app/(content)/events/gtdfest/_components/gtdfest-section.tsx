import { type VariantProps, cva } from "class-variance-authority";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import { cn } from "@/lib/utils";

const sectionVariants = cva(
  "absolute inset-0 p-12 flex gap-2 flex-col justify-end",
  {
    variants: {
      variant: {
        left: "items-start text-left",
        right: "items-end text-right",
      },
    },
    defaultVariants: {
      variant: "left",
    },
  },
);

export type GTDFestSectionProps = {
  className?: string;
  title: string;
  description: string;
  image: { src: string | StaticImport; alt: string };
} & VariantProps<typeof sectionVariants>;

export default function GTDFestSection({
  className = "",
  title,
  description,
  image,
  variant,
}: GTDFestSectionProps) {
  return (
    <section className={cn("w-full relative", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        className="h-auto w-full aspect-[3/4] md:aspect-video object-cover"
      />
      <div className={sectionVariants({ variant })}>
        <h2 className="font-serif text-4xl">{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}
