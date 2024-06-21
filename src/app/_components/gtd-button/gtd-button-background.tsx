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
      <g shapeRendering="crispEdges">
        <rect width={118} height={25} fill="#D46729" rx={12.5} />
        <rect
          width={118}
          height={25}
          fill="url(#gradient)"
          fillOpacity={0.8}
          rx={12.5}
        />
        <rect
          width={118}
          height={25}
          fill="url(#layer-bottom)"
          fillOpacity={0.7}
          rx={12.5}
        />
        <rect width={118} height={25} fill="url(#layer-top)" rx={12.5} />
      </g>
      <defs>
        <pattern
          id="layer-bottom"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use href="#brass" transform="matrix(.00136 0 0 .00641 0 -1.86)" />
        </pattern>
        <pattern
          id="layer-top"
          width={1.246}
          height={5.88}
          patternContentUnits="objectBoundingBox"
        >
          <use href="#texture" transform="scale(.00122 .00574)" />
        </pattern>
        <image id="brass" width={736} height={736} href={brass.src} />
        <image id="texture" width={1024} height={1024} href={texture.src} />
        <motion.linearGradient
          id="gradient"
          x1={9.221}
          x2={96.896}
          y1={-22.321}
          y2={60.447}
          gradientUnits="userSpaceOnUse"
          animate={{
            gradientTransform: isHovered ? "translate(30,0)" : "translate(0,0)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <stop offset={0.111} stopColor="#6B330A" stopOpacity={0.111} />
          <stop offset={0.187} stopColor="#776B62" stopOpacity={0.187} />
          <stop offset={0.492} stopColor="#fff" stopOpacity={0.504} />
          <stop offset={0.597} stopColor="#2F1D10" stopOpacity={0.572} />
          <stop offset={0.725} stopColor="#8F7868" stopOpacity={0.73} />
          <stop offset={0.858} stopColor="#9F8877" stopOpacity={0.837} />
          <stop offset={0.941} stopColor="#693D1E" stopOpacity={0.897} />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
export default GTDButtonBackground;
