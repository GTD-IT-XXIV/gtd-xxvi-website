import { AnimatePresence, motion } from "framer-motion";
import { type SVGProps } from "react";

import type { Portfolio } from "@/lib/types";

import texture from "../_assets/brass-texture-light.png";

export type CommitteePortfolioFrameProps = {
  portfolio: Portfolio;
} & SVGProps<SVGSVGElement>;

const details: Record<Portfolio, string> = {
  "TOPS & MC": "",
  BFM: "Business & Finance Manager",
  GL: "Group Leaders",
  POLOG: "Project & Logistics Officer",
  PPIT: "Publicity, Publication & IT",
  Welfare: "",
};

const CommitteePortfolioFrame = ({
  portfolio,
  ...props
}: CommitteePortfolioFrameProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 202 50"
    fill="none"
    {...props}
  >
    <g
      clipPath="url(#committee-portfolio-framea)"
      filter="url(#committee-portfolio-frameb)"
    >
      <path
        fill="#727272"
        d="M0 2a2 2 0 0 1 2-2h198a2 2 0 0 1 2 2v46a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="url(#committee-portfolio-framec)"
        fillOpacity={0.8}
        d="M0 2a2 2 0 0 1 2-2h198a2 2 0 0 1 2 2v46a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="url(#committee-portfolio-framed)"
        fillOpacity={0.8}
        d="M0 2a2 2 0 0 1 2-2h198a2 2 0 0 1 2 2v46a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
        shapeRendering="crispEdges"
      />
      <path
        fill="#5C3F3F"
        fillOpacity={0.74}
        d="M0 0h202H0Zm202 50H0h202ZM2 50a2.5 2.5 0 0 1-2.5-2.5v-45A2.5 2.5 0 0 1 2 0C1.172 0 .5.895.5 2v46c0 1.105.672 2 1.5 2ZM200 0a2.5 2.5 0 0 1 2.5 2.5v45A2.5 2.5 0 0 1 200 50c.828 0 1.5-.895 1.5-2V2c0-1.105-.672-2-1.5-2Z"
      />
      <AnimatePresence>
        <motion.text
          key={`${portfolio}-top`}
          x={101}
          y={!details[portfolio] ? 27 : 18}
          fill="#723C15"
          filter="url(#committee-portfolio-frame-inner)"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {portfolio.toUpperCase()}
        </motion.text>
        {!!details[portfolio] && (
          <motion.text
            key={`${portfolio}-bottom`}
            x={101}
            y={38}
            fill="#723C15"
            filter="url(#committee-portfolio-frame-inner)"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {details[portfolio]}
          </motion.text>
        )}
      </AnimatePresence>
    </g>
    <defs>
      <filter id="committee-portfolio-frame-inner">
        <feFlood floodColor="rgb(39 6 6 / 70%)" />
        <feComposite operator="out" in2="SourceGraphic" />
        <feMorphology operator="dilate" radius={0} />
        <feGaussianBlur stdDeviation={2} />
        <feOffset dx={-1.5} dy={3} />
        <feComposite operator="atop" in2="SourceGraphic" />
      </filter>
      <linearGradient
        id="committee-portfolio-framec"
        x1={-328.709}
        x2={210.591}
        y1={38.235}
        y2={135.531}
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
      <clipPath id="committee-portfolio-framea">
        <path fill="#fff" d="M0 0h202v50H0z" />
      </clipPath>
      <pattern
        id="committee-portfolio-framed"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          href="#committee-portfolio-framee"
          transform="matrix(.00136 0 0 .00549 0 -1.52)"
        />
      </pattern>
      <filter
        id="committee-portfolio-frameb"
        width={211}
        height={58}
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
          result="effect1_dropShadow_2969_5058"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2969_5058"
          result="shape"
        />
      </filter>
      <image
        id="committee-portfolio-framee"
        width={736}
        height={736}
        data-name="Brass - Weathered(edit).jpg"
        href={texture.src}
      />
    </defs>
  </svg>
);
export default CommitteePortfolioFrame;
