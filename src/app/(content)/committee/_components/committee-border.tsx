import { type SVGProps } from "react";

import texture from "../_assets/brass-texture.webp";

const CommitteeBorder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 431 11"
    fill="none"
    {...props}
  >
    <path fill="#692424" d="M0 0h431v11H0z" />
    <path fill="#E5C181" d="M0 0h431v11H0z" />
    <path fill="#8E716B" d="M0 0h431v11H0z" />
    <path fill="url(#committee-bordera)" fillOpacity={0.7} d="M0 0h431v11H0z" />
    <path fill="url(#committee-borderb)" fillOpacity={0.4} d="M0 0h431v11H0z" />
    <defs>
      <linearGradient
        id="committee-borderb"
        x1={418.44}
        x2={418.657}
        y1={-20.429}
        y2={13.033}
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
        id="committee-bordera"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          href="#committee-borderc"
          transform="matrix(.00136 0 0 .05324 0 -19.09)"
        />
      </pattern>
      <image
        id="committee-borderc"
        width={736}
        height={736}
        data-name="Brass - Weathered(edit).jpg"
        href={texture.src}
      />
    </defs>
  </svg>
);
export default CommitteeBorder;
