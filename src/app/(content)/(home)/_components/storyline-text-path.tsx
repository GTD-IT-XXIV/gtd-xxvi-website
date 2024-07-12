import * as React from "react";

export type StorylineTextPathProps = {
  duration: string;
} & React.SVGProps<SVGSVGElement>;

const StorylineTextPath = ({ duration, ...props }: StorylineTextPathProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-40 -40 401 884"
    fill="none"
    {...props}
  >
    <filter id="neon">
      <feFlood floodColor="#A38957" floodOpacity={0.75} in="SourceGraphic" />
      <feComposite operator="in" in2="SourceGraphic" />
      <feGaussianBlur stdDeviation={8} />
      <feComponentTransfer result="glow1">
        <feFuncA type="linear" slope={2} intercept={0} />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="glow1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <path
      id="text-path"
      d="m70.587 93.54-32.5-17c-5.5-2.666-18.7-11.4-27.5-25-11-17-21.5-49.5 23-50.5 35.6-.8 79.833 10.334 97.5 16 11 1.668 41.5 6.6 75.5 13s49.833 11 53.5 12.5c19.5 6 50.5 28.2 18.5 69.001-32 40.8-61.333 77.333-72 90.5-6.833 9.667-23 40.1-33 84.5s-14.5 114.167-15.5 143.5c-.167 18.167-6.3 61.5-29.5 89.5s-70 61.333-90.5 74.5c-26.167 15.667-62.8 52 0 72s116.5 28.667 135.5 30.5c36.167 2 115.4 9.5 143 23.5 34.5 17.5 33.5 41.5-18.5 57s-66 25.5-124.5 25.5"
    />
    <text filter="url(#neon)">
      <textPath
        href="#text-path"
        className="text-xs font-hieroglyph cursor-default select-none"
        fill="#907057"
      >
        𓂧𓌅 𓉗𓇯 𓃾𓂝𓏴𓌅𓀠 𓀠𓃻𓏲𓏴𓃾 𓇯𓂋𓃾𓌓 𓂋𓏲𓁶𓁹𓂝𓃾 𓉐𓂝𓇯 𓉗𓇯 𓉐𓂝𓏴 𓇯𓂝𓆓𓃾 𓃻𓃾 𓁹𓉐𓇯𓏲𓂝𓏴𓃾 𓌅𓃾 𓃾𓆓𓌓𓂝𓃾 𓇯𓂋𓂝𓌓𓂝
        𓏲𓂝𓇯𓃾 𓇯𓁶𓃻𓉐𓌅 𓇯𓏭𓇯𓃻𓃾 𓌓𓁶𓌓𓆓𓂝𓃾 𓇯𓆓𓄤𓂝𓁶𓆓𓃾 𓉐𓂝𓇯 𓃻𓆓𓏲𓆓𓃾 𓌓𓏴𓊽𓂝𓃾𓃾𓀠𓃾 𓉗𓃾𓁶𓏲𓏴𓃾 𓉐𓉗𓉐𓌓𓂝𓌅𓃾 𓉗𓃾𓁶𓏲𓏴𓃾
        𓇯𓁶𓁹𓂝𓆓𓃾 𓇯𓌅𓃾 𓏲𓁶𓏴𓃾 𓇯𓌙𓏲𓂝 𓈖𓆓 𓀠𓂧 𓃾𓆓𓌓𓃾 𓏲𓄤𓁹𓏲𓂝𓃾 𓉐𓏴𓁶 𓏲𓃻𓉐𓌅𓏴𓃾 𓈖𓇯𓁹𓆓𓏲𓏴𓃾 𓉐𓂧𓌅 𓃾𓏲𓁶𓉗𓃾
        𓇯𓀠𓏲𓂝𓃾 𓇯𓌅𓃾 𓃻𓂝𓇯𓃾 𓇯𓏴𓉗𓏲𓉐𓃾
        <animate
          attributeName="startOffset"
          from="0%"
          to="148%"
          begin="0s"
          dur={duration}
          repeatCount="indefinite"
        />
      </textPath>
      <textPath
        href="#text-path"
        className="text-xs font-hieroglyph cursor-default select-none"
        fill="#907057"
      >
        𓂧𓌅 𓉗𓇯 𓃾𓂝𓏴𓌅𓀠 𓀠𓃻𓏲𓏴𓃾 𓇯𓂋𓃾𓌓 𓂋𓏲𓁶𓁹𓂝𓃾 𓉐𓂝𓇯 𓉗𓇯 𓉐𓂝𓏴 𓇯𓂝𓆓𓃾 𓃻𓃾 𓁹𓉐𓇯𓏲𓂝𓏴𓃾 𓌅𓃾 𓃾𓆓𓌓𓂝𓃾 𓇯𓂋𓂝𓌓𓂝
        𓏲𓂝𓇯𓃾 𓇯𓁶𓃻𓉐𓌅 𓇯𓏭𓇯𓃻𓃾 𓌓𓁶𓌓𓆓𓂝𓃾 𓇯𓆓𓄤𓂝𓁶𓆓𓃾 𓉐𓂝𓇯 𓃻𓆓𓏲𓆓𓃾 𓌓𓏴𓊽𓂝𓃾𓃾𓀠𓃾 𓉗𓃾𓁶𓏲𓏴𓃾 𓉐𓉗𓉐𓌓𓂝𓌅𓃾 𓉗𓃾𓁶𓏲𓏴𓃾
        𓇯𓁶𓁹𓂝𓆓𓃾 𓇯𓌅𓃾 𓏲𓁶𓏴𓃾 𓇯𓌙𓏲𓂝 𓈖𓆓 𓀠𓂧 𓃾𓆓𓌓𓃾 𓏲𓄤𓁹𓏲𓂝𓃾 𓉐𓏴𓁶 𓏲𓃻𓉐𓌅𓏴𓃾 𓈖𓇯𓁹𓆓𓏲𓏴𓃾 𓉐𓂧𓌅 𓃾𓏲𓁶𓉗𓃾
        𓇯𓀠𓏲𓂝𓃾 𓇯𓌅𓃾 𓃻𓂝𓇯𓃾 𓇯𓏴𓉗𓏲𓉐𓃾
        <animate
          attributeName="startOffset"
          from="-148%"
          to="0%"
          begin="0s"
          dur={duration}
          repeatCount="indefinite"
        />
      </textPath>
    </text>
  </svg>
);
export default StorylineTextPath;
