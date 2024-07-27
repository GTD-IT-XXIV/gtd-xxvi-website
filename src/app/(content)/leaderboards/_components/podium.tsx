import { type StaticImageData } from "next/image";
import { type SVGProps } from "react";

import type { House } from "@/lib/types";

import og1Logo from "../_assets/og-1-logo.webp";
import og2Logo from "../_assets/og-2-logo.jpeg";
import og3Logo from "../_assets/og-3-logo.webp";
import og4Logo from "../_assets/og-4-logo.webp";
import og5Logo from "../_assets/og-5-logo.webp";
import og6Logo from "../_assets/og-6-logo.webp";
import og7Logo from "../_assets/og-7-logo.webp";
import og8Logo from "../_assets/og-8-logo.webp";
import podiumBg from "../_assets/podium-bg.webp";

export type Winner = {
  og: string;
  house: House;
  points: number;
};

export type PodiumProps = {
  winners: [Winner, Winner, Winner]; // 1st, 2nd, 3rd
} & SVGProps<SVGSVGElement>;

const podiumColor: Record<House, string> = {
  wanderer: "#C61010",
  healer: "#15803D",
  changeling: "#1D4ED8",
  timeturner: "#FACC15",
};

const ogNameMapping: Record<number, string> = {
  1: "Sijilink",
  2: "Nimboosh",
  3: "Mashark Stitch",
  4: "Sirius Duck",
  5: "Azkapan-kapan",
  6: "Loop~ah",
  7: "Jaheal",
  8: "Curema",
};

const ogLogoMapping: Record<number, StaticImageData> = {
  1: og1Logo,
  2: og2Logo,
  3: og3Logo,
  4: og4Logo,
  5: og5Logo,
  6: og6Logo,
  7: og7Logo,
  8: og8Logo,
};

const splitText = (text: string) => {
  const splitIndex =
    text.indexOf(" ") !== -1 ? text.indexOf(" ") : text.indexOf("-");
  if (splitIndex === -1) {
    return [text, ""]; // Return the whole text as the first line if no space or hyphen
  }
  const firstHalf = text.slice(0, splitIndex);
  const secondHalf = text.slice(splitIndex + 1);
  return [firstHalf, secondHalf];
};

const Podium = ({ winners, ...props }: PodiumProps) => {
  const [firstLine0, secondLine0] = splitText(
    ogNameMapping[parseInt(winners[0].og, 10)] ?? winners[0].og,
  );
  const [firstLine1, secondLine1] = splitText(
    ogNameMapping[parseInt(winners[1].og, 10)] ?? winners[1].og,
  );
  const [firstLine2, secondLine2] = splitText(
    ogNameMapping[parseInt(winners[2].og, 10)] ?? winners[2].og,
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 -200 369 528"
      {...props}
    >
      {/* 2nd Place */}
      <g clipPath="url(#podium-a)">
        <path
          fill={podiumColor[winners[1].house]}
          d="M10 88h120l-10 48H0l10-48Z"
        />
        <path
          fill="url(#podium-b)"
          fillOpacity={0.35}
          d="M10 88h120l-10 48H0l10-48Z"
        />
        <g clipPath="url(#podium-c)">
          <path
            fill="url(#podium-d)"
            d="M0 0h120v200H0z"
            transform="translate(0 136)"
          />
          <path
            fill="url(#podium-e)"
            fillOpacity={0.3}
            d="M130 77h245v131H130z"
            transform="rotate(90 130 77)"
          />
          <path
            fill={podiumColor[winners[1].house]}
            d="M0 136v64.438l29.992 7.781L60 216l30.008-7.781L120 200.438V136H0Z"
          />
          <path
            fill="url(#podium-f)"
            fillOpacity={0.35}
            d="M0 136h120v216H0z"
          />
          <text
            x={43}
            y={190}
            fill={winners[1].house !== "timeturner" ? "#E5C181" : "#503D2E"}
            filter={`url(${winners[1].house !== "timeturner" ? "#podium-label-inner-light" : "#podium-label-inner-dark"}) url(#podium-label-shadow)`}
            className="text-5xl font-serif"
          >
            II
          </text>
          <text
            x={60.5}
            y={252}
            fill="#CFFAFE"
            filter="url(#podium-points-inner) url(#podium-points-shadow)"
            textAnchor="middle"
            className="text-4xl font-serif"
          >
            {winners[1].points}
          </text>
          <text
            x={60.5}
            y={269}
            fill="#CFFAFE"
            filter="url(#podium-points-label-inner) url(#podium-points-label-shadow)"
            textAnchor="middle"
            className="text-sm font-serif"
          >
            points
          </text>
        </g>
      </g>
      <circle
        cx={60.5}
        cy={34}
        r={50}
        fill={`url(#podium-og${parseInt(winners[1].og, 10)})`}
        filter="url(#podium-og-glow)"
      />
      <text
        x={60.5}
        y={secondLine1 ? 100 : 110} // Adjust y if there's only one line
        fill="#FFFFFF"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xl font-serif"
      >
        {firstLine1}
      </text>
      {secondLine1 && (
        <text
          x={60.5}
          y={120}
          fill="#FFFFFF"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xl font-serif"
        >
          {secondLine1}
        </text>
      )}
      {/* 3rd Place */}
      <g clipPath="url(#podium-g)">
        <path
          fill={podiumColor[winners[2].house]}
          d="M239 130h120l10 48H249l-10-48Z"
        />
        <path
          fill="url(#podium-h)"
          fillOpacity={0.35}
          d="M239 130h120l10 48H249l-10-48Z"
        />
        <g clipPath="url(#podium-i)">
          <path
            fill="url(#podium-j)"
            d="M0 0h120v150H0z"
            transform="translate(249 178)"
          />
          <path
            fill="url(#podium-k)"
            fillOpacity={0.3}
            d="M370 83h245v131H370z"
            transform="rotate(90 370 83)"
          />
          <path
            fill={podiumColor[winners[2].house]}
            d="M249 178v64.438l29.992 7.781L309 258l30.008-7.781L369 242.438V178H249Z"
          />
          <path
            fill="url(#podium-l)"
            fillOpacity={0.35}
            d="M0 0h120v216H0z"
            transform="matrix(-1 0 0 1 369 112)"
          />
          <text
            x={282}
            y={232}
            fill={winners[2].house !== "timeturner" ? "#E5C181" : "#503D2E"}
            filter={`url(${winners[2].house !== "timeturner" ? "#podium-label-inner-light" : "#podium-label-inner-dark"}) url(#podium-label-shadow)`}
            className="text-5xl font-serif"
          >
            III
          </text>
          <text
            x={309}
            y={289}
            fill="#CFFAFE"
            filter="url(#podium-points-inner) url(#podium-points-shadow)"
            textAnchor="middle"
            className="text-[2rem] font-serif"
          >
            {winners[2].points}
          </text>
          <text
            x={309}
            y={306}
            fill="#CFFAFE"
            filter="url(#podium-points-label-inner) url(#podium-points-label-shadow)"
            textAnchor="middle"
            className="text-sm font-serif"
          >
            points
          </text>
        </g>
      </g>
      <circle
        cx={309}
        cy={76}
        r={50}
        fill={`url(#podium-og${parseInt(winners[2].og, 10)})`}
        filter="url(#podium-og-glow)"
      />
      <text
        x={309}
        y={secondLine2 ? 140 : 150} // Adjust y if there's only one line
        fill="#FFFFFF"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xl font-serif"
      >
        {firstLine2}
      </text>
      {secondLine2 && (
        <text
          x={309}
          y={160}
          fill="#FFFFFF"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xl font-serif"
        >
          {secondLine2}
        </text>
      )}

      {/* 1st Place */}
      <path
        fill={podiumColor[winners[0].house]}
        d="M130.833 0h108.334L250 48H120l10.833-48Z"
      />
      <path
        fill="url(#podium-m)"
        fillOpacity={0.35}
        d="M130.833 0h108.334L250 48H120l10.833-48Z"
      />
      <g clipPath="url(#podium-n)">
        <path
          fill="url(#podium-o)"
          d="M0 0h130v280H0z"
          transform="translate(120 48)"
        />
        <path
          fill="url(#podium-p)"
          fillOpacity={0.35}
          d="M250 83h245v131H250z"
          transform="rotate(90 250 83)"
        />
        <path
          fill={podiumColor[winners[0].house]}
          d="M120 48v64.438l32.492 7.781L185 128l32.508-7.781L250 112.438V48H120Z"
        />
        <path
          fill="url(#podium-q)"
          fillOpacity={0.35}
          d="M120 48h130v280H120z"
        />
        <text
          x={176}
          y={102}
          fill={winners[0].house !== "timeturner" ? "#E5C181" : "#503D2E"}
          filter={`url(${winners[0].house !== "timeturner" ? "#podium-label-inner-light" : "#podium-label-inner-dark"}) url(#podium-label-shadow)`}
          className="text-5xl font-serif"
        >
          I
        </text>
        <text
          x={185.5}
          y={171}
          fill="#CFFAFE"
          filter="url(#podium-points-inner) url(#podium-points-shadow)"
          textAnchor="middle"
          className="text-[2.5rem] font-serif"
        >
          {winners[0].points}
        </text>
        <text
          x={185.5}
          y={188}
          fill="#CFFAFE"
          filter="url(#podium-points-label-inner) url(#podium-points-label-shadow)"
          textAnchor="middle"
          className="text-base font-serif"
        >
          points
        </text>
      </g>
      <circle
        cx={185.5}
        cy={-54}
        r={50}
        fill={`url(#podium-og${parseInt(winners[0].og, 10)})`}
        filter="url(#podium-og-glow)"
      />
      <text
        x={185.5}
        y={secondLine0 ? 14 : 24}
        fill="#FFFFFF"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xl font-serif"
      >
        {firstLine0}
      </text>
      {secondLine0 && (
        <text
          x={185.5}
          y={34}
          fill="#FFFFFF"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xl font-serif"
        >
          {secondLine0}
        </text>
      )}

      <defs>
        <filter id="podium-og-glow">
          <feGaussianBlur stdDeviation={4} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="podium-label-shadow">
          <feDropShadow
            dx={0}
            dy={4}
            stdDeviation={0}
            floodColor="black"
            floodOpacity={0.25}
          />
        </filter>
        <filter id="podium-label-inner-light">
          <feFlood floodColor="rgb(255 242 220 / 60%)" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feMorphology operator="dilate" radius={0} />
          <feGaussianBlur stdDeviation={0.4} />
          <feOffset dx={-1} dy={-1} />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
        <filter id="podium-label-inner-dark">
          <feFlood floodColor="rgb(26 16 0 / 60%)" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feMorphology operator="dilate" radius={0} />
          <feGaussianBlur stdDeviation={0.4} />
          <feOffset dx={-1} dy={-1} />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
        <filter id="podium-points-shadow">
          <feDropShadow
            dx={0}
            dy={1.6}
            stdDeviation={0}
            floodColor="black"
            floodOpacity={0.25}
          />
        </filter>
        <filter id="podium-points-inner">
          <feFlood floodColor="rgb(22 78 99 / 50%)" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feMorphology operator="dilate" radius={0} />
          <feGaussianBlur stdDeviation={0.4} />
          <feOffset dx={-0.6} dy={-0.6} />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
        <filter id="podium-points-label-shadow">
          <feDropShadow
            dx={0}
            dy={0.6}
            stdDeviation={0}
            floodColor="black"
            floodOpacity={0.25}
          />
        </filter>
        <filter id="podium-points-label-inner">
          <feFlood floodColor="rgb(22 78 99 / 50%)" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feMorphology operator="dilate" radius={0} />
          <feGaussianBlur stdDeviation={0.4} />
          <feOffset dx={-0.4} dy={-0.4} />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
        <linearGradient
          id="podium-b"
          x1={65}
          x2={65}
          y1={88}
          y2={136}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.445} stopColor="#6366F1" />
          <stop offset={1} stopColor="#312E81" />
        </linearGradient>
        <linearGradient
          id="podium-d"
          x1={60}
          x2={60}
          y1={0}
          y2={200}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#312E81" />
          <stop offset={0.5} stopColor="#4338CA" />
        </linearGradient>
        <linearGradient
          id="podium-f"
          x1={0}
          x2={120}
          y1={244}
          y2={244}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.445} stopColor="#6366F1" />
          <stop offset={1} stopColor="#161354" />
        </linearGradient>
        <linearGradient
          id="podium-h"
          x1={304}
          x2={304}
          y1={130}
          y2={178}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.445} stopColor="#6366F1" />
          <stop offset={1} stopColor="#312E81" />
        </linearGradient>
        <linearGradient
          id="podium-j"
          x1={60}
          x2={60}
          y1={0}
          y2={150}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#312E81" />
          <stop offset={0.5} stopColor="#4338CA" />
        </linearGradient>
        <linearGradient
          id="podium-l"
          x1={0}
          x2={120}
          y1={108}
          y2={108}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.445} stopColor="#6366F1" />
          <stop offset={1} stopColor="#161354" />
        </linearGradient>
        <linearGradient
          id="podium-m"
          x1={185}
          x2={185}
          y1={0}
          y2={48}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.445} stopColor="#6366F1" />
          <stop offset={1} stopColor="#312E81" />
        </linearGradient>
        <linearGradient
          id="podium-o"
          x1={65}
          x2={65}
          y1={0}
          y2={280}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#312E81" />
          <stop offset={0.5} stopColor="#4338CA" />
        </linearGradient>
        <linearGradient
          id="podium-q"
          x1={120}
          x2={250}
          y1={188}
          y2={188}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#161354" />
          <stop offset={0.35} stopColor="#6366F1" />
          <stop offset={0.5} stopColor="#6366F1" />
          <stop offset={0.65} stopColor="#6366F1" />
          <stop offset={1} stopColor="#161354" />
        </linearGradient>
        <clipPath id="podium-a">
          <path fill="#fff" d="M0 88h130v240H0z" />
        </clipPath>
        <clipPath id="podium-c">
          <path fill="#fff" d="M0 136h120v200H0z" />
        </clipPath>
        <clipPath id="podium-g">
          <path fill="#fff" d="M239 130h130v198H239z" />
        </clipPath>
        <clipPath id="podium-i">
          <path fill="#fff" d="M249 178h120v150H249z" />
        </clipPath>
        <clipPath id="podium-n">
          <path fill="#fff" d="M120 48h130v280H120z" />
        </clipPath>
        <pattern
          id="podium-e"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            href="#podium-r"
            transform="matrix(.00071 0 0 .00125 -.06 -.08)"
          />
        </pattern>
        <pattern
          id="podium-k"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            href="#podium-r"
            transform="matrix(.00071 0 0 .00125 -.06 -.08)"
          />
        </pattern>
        <pattern
          id="podium-p"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            href="#podium-r"
            transform="matrix(.00071 0 0 .00125 -.06 -.08)"
          />
        </pattern>
        {Object.entries(ogLogoMapping).map(([k, v]) => (
          <pattern
            key={`podium-og${k}`}
            id={`podium-og${k}`}
            height="100%"
            width="100%"
            patternContentUnits="objectBoundingBox"
          >
            <image href={v.src} width={1} height={1} />
          </pattern>
        ))}
        <image
          id="podium-r"
          width={1534}
          height={928}
          data-name="image.png"
          href={podiumBg.src}
        />
      </defs>
    </svg>
  );
};
export default Podium;
