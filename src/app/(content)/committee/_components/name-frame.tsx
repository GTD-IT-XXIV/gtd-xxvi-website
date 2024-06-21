import * as React from "react";

import brass from "../_assets/name-frame-brass.png";

const NameFrame = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 25"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)" filter="url(#b)">
      <path
        fill="#727272"
        d="M0 2a2 2 0 0 1 2-2h86a2 2 0 0 1 2 2v21a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="url(#c)"
        fillOpacity={0.8}
        d="M0 2a2 2 0 0 1 2-2h86a2 2 0 0 1 2 2v21a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="url(#d)"
        fillOpacity={0.8}
        d="M0 2a2 2 0 0 1 2-2h86a2 2 0 0 1 2 2v21a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="#5C3F3F"
        fillOpacity={0.74}
        d="M0 0h90H0Zm90 25H0h90ZM2 25a2.5 2.5 0 0 1-2.5-2.5v-20A2.5 2.5 0 0 1 2 0C1.172 0 .5.895.5 2v21c0 1.105.672 2 1.5 2ZM88 0a2.5 2.5 0 0 1 2.5 2.5v20A2.5 2.5 0 0 1 88 25c.828 0 1.5-.895 1.5-2V2c0-1.105-.672-2-1.5-2Z"
      />
    </g>
    <defs>
      <linearGradient
        id="c"
        x1={-146.455}
        x2={95.398}
        y1={19.118}
        y2={57.998}
        gradientUnits="userSpaceOnUse"
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
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h90v25H0z" />
      </clipPath>
      <pattern
        id="d"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use href="#e" transform="matrix(.00136 0 0 .0049 0 -1.3)" />
      </pattern>
      <filter
        id="b"
        width={99}
        height={33}
        x={-4.5}
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
          result="effect1_dropShadow_2168_4330"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4330"
          result="shape"
        />
      </filter>
      <image
        id="e"
        width={736}
        height={736}
        data-name="Brass - Weathered(edit).jpg"
        href={brass.src}
      />
    </defs>
  </svg>
);
export default NameFrame;
