"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import pic from "../_assets/leaderboards-bg.png";
import Banner from "./banner";
import Podium from "./podium";
import Title from "./title";
import shadow from "../_assets/shadow-linear.png";

type House = "wanderer" | "changeling" | "timeturner" | "healer";

type Winner = {
  og: string;
  house: House;
  points: number;
};

type LeaderboardData = {
  topHouse: { name: string };
  top3OG: { number: string; og: string; house: string; points: number }[];
};

export default function WholePage() {
  const BACKEND_URL = "http://localhost:8080";
  const [data, setData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/leaderboards/0`);
        const result = (await response.json()) as LeaderboardData;
        console.log(result); // Print the data to the console
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
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
    { bottom: 320, left: 140 },
    { bottom: 240, left: 25 },
    { bottom: 210, left: 255 },
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
    <div className="relative min-h-screen overflow-hidden">
      <div className="mb-[60px] flex justify-center">
        <Image src={pic} alt="Leaderboards" width={400} className="relative max-w-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10">
        <Image src={shadow} alt="shadow" className="w-full" />
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] max-w-full">
        <Banner winningTeam={data.topHouse.name} />
      </div>
      <div className="absolute top-[76px] left-1/2 transform -translate-x-1/2 max-w-full">
        <Title winningTeam={data.topHouse.name} />
      </div>
      <Podium
        winners={winners as [Winner, Winner, Winner]}
        className="absolute bottom-0 inset-x-0 sm:px-8 mb-[40px] px-4"
      />
      {data.top3OG.slice(0, 3).map((og, index) => {
        const position = podiumPositions[index];
        return (
          position && (
            <text
              key={og.number}
              className={`z-60 absolute transform text-[15px] font-serif sm:w-[120px] text-center justify-center w-[100px]`}
              style={{
                bottom: `${position.bottom}px`,
                left: `${position.left}px`,
              }}
            >
              {ogNameMapping[parseInt(og.number, 10)] ?? og.og}
            </text>
          )
        );
      })}
    </div>
  );
}
