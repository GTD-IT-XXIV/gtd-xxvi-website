"use client";

import { motion } from "framer-motion";
import * as React from "react";

import brass from "./gtd-button-brass.jpeg";
import texture from "./gtd-button-texture.png";

export type GTDButtonBackgroundProps = {
  isHovered?: boolean;
} & React.SVGProps<SVGSVGElement>;

const GTDButtonBackground = ({
  isHovered = false,
  ...props
}: GTDButtonBackgroundProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 118 25"
      fill="none"
      {...props}
    >
      <g filter="url(#a)" shapeRendering="crispEdges">
        <rect width={118} height={25} fill="#E5C181" rx={12.5} />
        <rect width={118} height={25} fill="#D46729" rx={12.5} />
        <rect
          width={118}
          height={25}
          fill="url(#b)"
          fillOpacity={0.8}
          rx={12.5}
        />
        <rect
          width={118}
          height={25}
          fill="url(#c)"
          fillOpacity={0.7}
          rx={12.5}
        />
        <rect width={118} height={25} fill="url(#d)" rx={12.5} />
      </g>
      <defs>
        <pattern
          id="c"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use href="#e" transform="matrix(.00136 0 0 .00641 0 -1.86)" />
        </pattern>
        <pattern
          id="d"
          width={1.246}
          height={5.88}
          patternContentUnits="objectBoundingBox"
        >
          <use href="#f" transform="scale(.00122 .00574)" />
        </pattern>
        <image
          id="e"
          width={736}
          height={736}
          data-name="Brass - Weathered.jpg"
          href={brass.src}
        />
        <image id="f" width={1024} height={1024} href={texture.src} />
        <motion.linearGradient
          id="b"
          x1={9.221}
          x2={96.896}
          y1={-22.321}
          y2={60.447}
          gradientUnits="userSpaceOnUse"
          animate={{
            gradientTransform: "translate(40,0)",
            transition: {
              ease: "easeIn",
              duration: 2,
            },
          }}
        >
          <stop />
          <stop offset={0.111} stopColor="#6B330A" stopOpacity={0.111} />
          <stop offset={0.187} stopColor="#776B62" stopOpacity={0.187} />
          <stop offset={0.492} stopColor="#fff" stopOpacity={0.504} />
          <stop offset={0.597} stopColor="#2F1D10" stopOpacity={0.572} />
          <stop offset={0.725} stopColor="#8F7868" stopOpacity={0.73} />
          <stop offset={0.858} stopColor="#9F8877" stopOpacity={0.837} />
          <stop offset={0.941} stopColor="#693D1E" stopOpacity={0.897} />
          <stop offset={1} stopColor="#634B3A" />
        </motion.linearGradient>
        <filter
          id="a"
          width={126}
          height={33}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2423_4211"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2423_4211"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default GTDButtonBackground;
