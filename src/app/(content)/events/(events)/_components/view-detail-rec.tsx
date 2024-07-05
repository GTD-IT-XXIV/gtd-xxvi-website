import * as React from "react";
import { type SVGProps } from "react";

import recImg from "../_assets/rec-img.webp";

const ViewDetailRec = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={368}
    height={210}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#727272"
        d="M5 2a2 2 0 0 1 2-2h354a2 2 0 0 1 2 2v198a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="url(#b)"
        fillOpacity={0.8}
        d="M5 2a2 2 0 0 1 2-2h354a2 2 0 0 1 2 2v198a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="url(#c)"
        fillOpacity={0.8}
        d="M5 2a2 2 0 0 1 2-2h354a2 2 0 0 1 2 2v198a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="#5C3F3F"
        fillOpacity={0.74}
        d="M5 0h358H5Zm358 202H5h358ZM7 202a2.5 2.5 0 0 1-2.5-2.5V2.5A2.5 2.5 0 0 1 7 0c-.828 0-1.5.895-1.5 2v198c0 1.105.672 2 1.5 2ZM361 0a2.5 2.5 0 0 1 2.5 2.5v197a2.5 2.5 0 0 1-2.5 2.5c.828 0 1.5-.895 1.5-2V2c0-1.105-.672-2-1.5-2Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={-577.564}
        x2={403.192}
        y1={154.471}
        y2={232.091}
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
      <pattern
        id="c"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#d" transform="matrix(.00136 0 0 .0024 0 -.386)" />
      </pattern>
      <filter
        id="a"
        width={367}
        height={210}
        x={0.5}
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
          result="effect1_dropShadow_2789_4299"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2789_4299"
          result="shape"
        />
      </filter>
      <image id="d" xlinkHref={recImg.src} width={736} height={736} />
    </defs>
  </svg>
);
export default ViewDetailRec;
