import { type SVGProps } from "react";

import type { Portfolio } from "@/lib/types";

import textureMCTops from "../_assets/committee-header-bg-mctops.png";
import textureOthers from "../_assets/committee-header-bg-others.webp";

export type CommitteeHeaderBgProps = {
  portfolio: Portfolio;
} & SVGProps<SVGSVGElement>;

const colors: Record<Portfolio, [string, string]> = {
  POLOG: ["#842800", "rgb(92 13 13 / 20%)"],
  PPIT: ["#1267A4", "none"],
  BFM: ["#005127", "none"],
  Welfare: ["#CD9100", "none"],
  GL: ["#EBEAEA", "none"],
  "TOPS & MC": ["#0D1E64", "rgb(4 6 31 / 40%)"],
};

const CommitteeHeaderBg = ({ portfolio, ...props }: CommitteeHeaderBgProps) => {
  if (portfolio !== "TOPS & MC") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 430 267"
        fill="none"
        {...props}
      >
        <g filter="url(#committee-header-bg-othersa)">
          <path fill={colors[portfolio][0]} d="M0 0h430v267H0z" />
          <path
            fill="url(#committee-header-bg-othersb)"
            fillOpacity={0.45}
            d="M0 0h430v267H0z"
          />
          <path fill={colors[portfolio][1]} d="M0 0h430v267H0z" />
        </g>
        <defs>
          <pattern
            id="committee-header-bg-othersb"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox"
          >
            <use
              href="#committee-header-bg-othersc"
              transform="matrix(.00037 0 0 .00059 0 -.708)"
            />
          </pattern>
          <filter
            id="committee-header-bg-othersa"
            width={430}
            height={275}
            x={0}
            y={-8}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={-10} />
            <feGaussianBlur stdDeviation={4} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0.281384 0 0 0 0 0.0205389 0 0 0 0 0.0205389 0 0 0 0.25 0" />
            <feBlend in2="shape" result="effect1_innerShadow_1465_3516" />
          </filter>
          <image
            id="committee-header-bg-othersc"
            width={textureOthers.width}
            height={textureOthers.height}
            data-name="texture"
            href={textureOthers.src}
          />
        </defs>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 430 267"
      fill="none"
      {...props}
    >
      <g filter="url(#committee-header-bga)">
        <path fill={colors[portfolio][0]} d="M0 0h430v267H0z" />
        <path
          fill="url(#committee-header-bgb)"
          fillOpacity={0.5}
          d="M0 0h430v267H0z"
        />
        <path fill={colors[portfolio][1]} d="M0 0h430v267H0z" />
      </g>
      <defs>
        <pattern
          id="committee-header-bgb"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            href="#committee-header-bgc"
            transform="matrix(.00211 0 0 .0034 0 -1.11)"
          />
        </pattern>
        <filter
          id="committee-header-bga"
          width={430}
          height={275}
          x={0}
          y={-8}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-10} />
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.281384 0 0 0 0 0.0205389 0 0 0 0 0.0205389 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_1465_3513" />
        </filter>
        <image
          id="committee-header-bgc"
          width={textureMCTops.width}
          height={textureMCTops.height}
          data-name="texture"
          href={textureMCTops.src}
        />
      </defs>
    </svg>
  );
};
export default CommitteeHeaderBg;
