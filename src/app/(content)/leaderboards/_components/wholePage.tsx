"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import pic from "../_assets/leaderboards-bg.png";
import Banner from "./banner";
import Podium from "./podium";
import Title from "./title";
import { Elsie_Swash_Caps } from "next/font/google";
import logoshadow from "../_assets/logo-image-shadow.png";

type House = "wanderer" | "changeling" | "timeturner" | "healer";

type Winner = {
  og: string;
  house: House;
  points: number;
};

export default function WholePage() {
  const BACKEND_URL = "http://localhost:8080";
  const [data, setData] = useState<{
    topHouse: { name: string };
    top3OG: { number: string; og: string; house: string; points: number }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/leaderboards/0`); // Replace '/endpoint' with the actual endpoint
        const data = await response.json();
        console.log(data); // Print the data to the console
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div className="font-serif">Loading...</div>;
  }

  const ogNameMapping: Record<number, string> = {
    1: "Sijilink",
    2: "Nimboosh",
    3: "Mashark Stitch",
    4: "Sirius Duck",
    5: "Azkapan-kapan",
    6: "Loop~ah",
    7: "Jaheal",
    8: "Curema"
  };

  const podiumPositions = [
    { bottom: 295, left: 145 },
    { bottom: 205, left: 25 },
    { bottom: 165, left: 265 },
  ];

  const winners: Winner[] = data.top3OG.slice(0, 3).map((og) => {
    let houseName: House = "healer";
    if (og.number === "1" || og.number === "2") {
      houseName = "wanderer";
    } else if (og.number === "3" || og.number === "4") {
      houseName = "changeling";
    } else if (og.number === "5" || og.number === "6") {
      houseName = "timeturner";
    }
    return {
      og: og.number,
      house: houseName,
      points: og.points,
    };
  });

  while (winners.length < 3) {
    winners.push({ og: "", house: "healer", points: 0 });
  }

  return (
    <div className="relative min-h-screen">
      <div className="mb-[60px]">
        <Image src={pic} alt="Leaderboards" width={430} className="relative" />
      </div>
      <div className="absolute top-0 flex flex-col items-center justify-center">
        <Banner winningTeam={data.topHouse.name} />
      </div>
      <div className="absolute top-[76px] left-1/2 transform -translate-x-1/2">
        <Title winningTeam={data.topHouse.name} />
      </div>
      <div className="w-[369px] bottom-0 absolute left-1/2 transform -translate-x-1/2"></div>
      <Podium
        winners={winners as [Winner, Winner, Winner]}
        className="absolute bottom-0 inset-x-0 px-8"
      />
      {data.top3OG.slice(0, 3).map((og, index) => {
        const position = podiumPositions[index];
        return (
          position && (
            <text
              key={og.number}
              className={`z-60 absolute transform text-[15px] font-serif w-[144px] text-center justify-center`}
              style={{
                bottom: `${position.bottom}px`,
                left: `${position.left}px`,
              }}
            >
              {ogNameMapping[parseInt(og.number, 10)] || og.og}
            </text>
          )
        );
      })}
    </div>
  );
}
