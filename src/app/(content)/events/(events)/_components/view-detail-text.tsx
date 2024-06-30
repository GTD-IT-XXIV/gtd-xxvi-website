"use client";

import { useState } from "react";

import ViewDetailRec from "./view-detail-rec";

type ViewDetailTextProps = {
  day: string;
  title: string;
  place: string;
  date: string;
  time: string;
};

const ViewDetailText: React.FC<ViewDetailTextProps> = ({
  day,
  title,
  place,
  date,
  time,
}) => {
  const [detailedView, setDetailedView] = useState(false);

  const handleClick = () => {
    setDetailedView(!detailedView);
  };

  return (
    <div className="relative inline-block" onClick={handleClick}>
      <ViewDetailRec />
      <div className="absolute inset-0 flex items-center justify-center">
        {detailedView ? (
          <div
            className="text-3xl font-serif font-bold text-center space-y-1"
            style={{
              backgroundColor: "#160C05",
              color: "transparent",
              textShadow: "0 2px 3px rgb(255 255 255 / 5%)",
              backgroundClip: "text",
              filter: "brightness(3)",
            }}
          >
            <p>Place: {place}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
          </div>
        ) : (
          <div
            className="font-serif font-bold text-center space-y-1"
            style={{
              backgroundColor: "#160C05",
              color: "transparent",
              textShadow: "0 2px 3px rgb(255 255 255 / 5%)",
              backgroundClip: "text",
              filter: "brightness(3)",
            }}
          >
            <p className="text-4xl">- {day} -</p>
            <p className="text-3xl">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetailText;
