import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const paragraphVariants = cva("font-light md:font-normal", {
  variants: {
    size: {
      default: "tedx-base",
      sm: "text-sm/6 md:text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ParagraphProps = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraphVariants>;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export function P({ size, className, children, ...props }: ParagraphProps) {
  return (
    <p className={cn(paragraphVariants({ size }), className)} {...props}>
      {children}
    </p>
  );
}

export function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ className, children, ...props }: HeadingProps) {
  return (
    <h2
      className={cn("scroll-m-20 text-3xl font-semibold", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ className, children, ...props }: HeadingProps) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold", className)}
      {...props}
    >
      {children}
    </h4>
  );
}
