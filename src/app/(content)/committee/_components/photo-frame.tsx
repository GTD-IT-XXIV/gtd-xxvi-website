import * as React from "react";

import brass1 from "../_assets/photo-frame-brass-1.webp";
import brass2 from "../_assets/photo-frame-brass-2.webp";

const PhotoFrame = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 138 180"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <g filter="url(#b)">
        <mask id="f" fill="#fff">
          <path d="M0 0h138v180H0V0Z" />
        </mask>
        <path fill="#692424" d="M0 0h138v180H0V0Z" />
        <path fill="#E5C181" d="M0 0h138v180H0V0Z" />
        <path fill="#855E49" d="M0 0h138v180H0V0Z" />
        <path fill="url(#c)" fillOpacity={0.8} d="M0 0h138v180H0V0Z" />
        <path fill="url(#d)" fillOpacity={0.7} d="M0 0h138v180H0V0Z" />
        <path fill="url(#e)" fillOpacity={0.4} d="M0 0h138v180H0V0Z" />
        <path
          fill="#4D3A30"
          fillOpacity={0.82}
          d="M138 180v1h.4v-1h-.4ZM0 180h-.4v1H0v-1ZM137.6 0v180h.8V0h-.8Zm.4 179H0v2h138v-2ZM.4 180V0h-.8v180h.8Z"
          mask="url(#f)"
        />
      </g>
      <mask id="j" fill="#fff">
        <path d="M3 3h132v174H3V3Z" />
      </mask>
      <g filter="url(#g)">
        <path fill="#692424" d="M3 3h132v174H3V3Z" />
        <path fill="#E5C181" d="M3 3h132v174H3V3Z" />
        <path fill="#795B45" d="M3 3h132v174H3V3Z" />
        <path fill="url(#h)" fillOpacity={0.7} d="M3 3h132v174H3V3Z" />
        <path fill="url(#i)" fillOpacity={0.2} d="M3 3h132v174H3V3Z" />
      </g>
      <path
        fill="#4D3A30"
        fillOpacity={0.82}
        d="M135 177v1h.4v-1h-.4ZM3 177h-.4v1H3v-1ZM134.6 3v174h.8V3h-.8Zm.4 173H3v2h132v-2ZM3.4 177V3h-.8v174h.8Z"
        mask="url(#j)"
      />
      <g filter="url(#k)">
        <mask id="n" fill="#fff">
          <path d="M6 7h126v167H6V7Z" />
        </mask>
        <path fill="#692424" d="M6 7h126v167H6V7Z" />
        <path fill="#E5C181" d="M6 7h126v167H6V7Z" />
        <path fill="#8E716B" d="M6 7h126v167H6V7Z" />
        <path fill="url(#l)" fillOpacity={0.7} d="M6 7h126v167H6V7Z" />
        <path fill="url(#m)" fillOpacity={0.4} d="M6 7h126v167H6V7Z" />
        <path
          fill="#4D3A30"
          fillOpacity={0.82}
          d="M132 174v1h.4v-1h-.4ZM6 174h-.4v1H6v-1ZM131.6 7v167h.8V7h-.8Zm.4 166H6v2h126v-2ZM6.4 174V7h-.8v167h.8Z"
          mask="url(#n)"
        />
      </g>
      <path fill="#D9D9D9" d="M9 11h120v160H9z" />
      <g filter="url(#o)">
        <path
          stroke="#0F0C0C"
          strokeOpacity={0.3}
          strokeWidth={0.4}
          d="M9 10 0 0"
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#p)">
        <path
          stroke="#0F0C0C"
          strokeOpacity={0.3}
          strokeWidth={0.4}
          d="m129 10 9-10"
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#q)">
        <path
          stroke="#0F0C0C"
          strokeOpacity={0.3}
          strokeWidth={0.4}
          d="m0 180 9-10"
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#r)">
        <path
          stroke="#0F0C0C"
          strokeOpacity={0.3}
          strokeWidth={0.4}
          d="m138 180-9-10"
          shapeRendering="crispEdges"
        />
      </g>
    </g>
    <defs>
      <filter
        id="b"
        width={150}
        height={192}
        x={-6}
        y={-2}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius={2}
          result="effect1_dropShadow_2168_4317"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.187589 0 0 0 0 0.202549 0 0 0 0 0.337188 0 0 0 0.2 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2168_4317"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4317"
          result="shape"
        />
      </filter>
      <filter
        id="g"
        width={132}
        height={178}
        x={3}
        y={3}
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
        <feMorphology
          in="SourceAlpha"
          radius={2}
          result="effect1_innerShadow_2168_4317"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.187589 0 0 0 0 0.202549 0 0 0 0 0.337188 0 0 0 0.49 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2168_4317" />
      </filter>
      <filter
        id="k"
        width={138}
        height={179}
        x={0}
        y={5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius={2}
          result="effect1_dropShadow_2168_4317"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.187589 0 0 0 0 0.202549 0 0 0 0 0.337188 0 0 0 0.49 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2168_4317"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4317"
          result="shape"
        />
      </filter>
      <filter
        id="o"
        width={13.297}
        height={14.268}
        x={-2.148}
        y={-2.134}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2168_4317"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4317"
          result="shape"
        />
      </filter>
      <filter
        id="p"
        width={13.297}
        height={14.268}
        x={126.852}
        y={-2.134}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2168_4317"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4317"
          result="shape"
        />
      </filter>
      <filter
        id="q"
        width={13.297}
        height={14.268}
        x={-2.148}
        y={167.866}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2168_4317"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4317"
          result="shape"
        />
      </filter>
      <filter
        id="r"
        width={13.297}
        height={14.268}
        x={126.852}
        y={167.866}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2168_4317"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2168_4317"
          result="shape"
        />
      </filter>
      <linearGradient
        id="c"
        x1={6.106}
        x2={195.565}
        y1={-160.714}
        y2={-131.663}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.111} stopColor="#6B330A" stopOpacity={0.111} />
        <stop offset={0.303} stopColor="#776B62" stopOpacity={0.187} />
        <stop offset={0.467} stopColor="#372519" stopOpacity={0.531} />
        <stop offset={0.561} stopColor="#2F1D10" stopOpacity={0.572} />
        <stop offset={0.634} stopColor="#8F7868" stopOpacity={0.73} />
        <stop offset={0.714} stopColor="#fff" stopOpacity={0.504} />
        <stop offset={0.805} stopColor="#9F8877" stopOpacity={0.837} />
        <stop offset={0.866} stopColor="#693D1E" stopOpacity={0.897} />
        <stop offset={0.886} stopColor="#634B3A" />
      </linearGradient>
      <linearGradient
        id="e"
        x1={129.776}
        x2={186.974}
        y1={-219.073}
        y2={197.437}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.111} stopColor="#6B330A" stopOpacity={0.111} />
        <stop offset={0.44} stopColor="#776B62" stopOpacity={0.187} />
        <stop offset={0.634} stopColor="#8F7868" stopOpacity={0.73} />
        <stop offset={0.725} stopColor="#2F1D10" stopOpacity={0.572} />
        <stop offset={0.805} stopColor="#9F8877" stopOpacity={0.837} />
        <stop offset={0.923} stopColor="#FFBF90" stopOpacity={0.897} />
        <stop offset={0.986} stopColor="#fff" stopOpacity={0.504} />
      </linearGradient>
      <linearGradient
        id="i"
        x1={56.837}
        x2={159.046}
        y1={69.715}
        y2={93.384}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.15} stopColor="#6B330A" stopOpacity={0.111} />
        <stop offset={0.303} stopColor="#776B62" stopOpacity={0.187} />
        <stop offset={0.571} stopColor="#2F1D10" stopOpacity={0.572} />
        <stop offset={0.634} stopColor="#8F7868" stopOpacity={0.73} />
        <stop offset={0.714} stopColor="#fff" stopOpacity={0.504} />
        <stop offset={0.866} stopColor="#9F8877" stopOpacity={0.837} />
        <stop offset={0.866} stopColor="#693D1E" stopOpacity={0.897} />
        <stop offset={0.886} stopColor="#634B3A" />
      </linearGradient>
      <linearGradient
        id="m"
        x1={128.328}
        x2={281.741}
        y1={-303.143}
        y2={153.332}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.111} stopColor="#6B330A" stopOpacity={0.111} />
        <stop offset={0.303} stopColor="#776B62" stopOpacity={0.187} />
        <stop offset={0.561} stopColor="#2F1D10" stopOpacity={0.572} />
        <stop offset={0.634} stopColor="#8F7868" stopOpacity={0.73} />
        <stop offset={0.714} stopColor="#fff" stopOpacity={0.504} />
        <stop offset={0.805} stopColor="#9F8877" stopOpacity={0.837} />
        <stop offset={0.866} stopColor="#693D1E" stopOpacity={0.897} />
        <stop offset={0.886} stopColor="#634B3A" />
      </linearGradient>
      <pattern
        id="d"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use href="#s" transform="matrix(.00177 0 0 .00136 -.152 0)" />
      </pattern>
      <pattern
        id="h"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use href="#t" transform="matrix(.0018 0 0 .00136 -.16 0)" />
      </pattern>
      <pattern
        id="l"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use href="#t" transform="matrix(.0018 0 0 .00136 -.163 0)" />
      </pattern>
      <image
        id="s"
        width={736}
        height={736}
        data-name="Brass - Weathered(edit).jpg"
        href={brass1.src}
      />
      <image
        id="t"
        width={736}
        height={736}
        data-name="Brass - Weathered(edit).jpg"
        href={brass2.src}
      />
      <clipPath id="a">
        <path fill="#fff" d="M0 0h138v180H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default PhotoFrame;
