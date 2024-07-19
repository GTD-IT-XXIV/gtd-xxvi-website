"use client";

import { env } from "@/env";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useToast } from "@/app/_components/ui/use-toast";

import { getLeaderboardsData } from "@/server/actions/get-leaderboards-sheets";

import type { House } from "@/lib/types";

import pic from "../_assets/leaderboards-bg.webp";
import shadow from "../_assets/shadow-linear.webp";
import Banner from "./banner";
import Podium, { type Winner } from "./podium";
import Title from "./title";

const placeholderWinners: Winner[] = [
  { og: "5", house: "changeling", points: 100 },
  { og: "5", house: "changeling", points: 100 },
  { og: "5", house: "changeling", points: 100 },
];

type LeaderboardData = {
  topHouse: { name: string; points: number };
  top3OG: { number: string; points: number }[];
};

export default function WholePage() {
  const { toast } = useToast();
  const [data, setData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_URL}/leaderboards/0`,
        );
        const result = (await response.json()) as LeaderboardData;
        setData(result);
      } catch (error) {
        try {
          const result = await getLeaderboardsData();
          setData(result);
        } catch (error) {
          toast({
            title: "Failed to Fetch Data",
            description: "Please refresh the page.",
            variant: "destructive",
          });
        }
      }
    };

    let ignored = false;
    if (!ignored) {
      void fetchData();
    }
    return () => {
      ignored = true;
    };
  }, [toast]);

  const winners: Winner[] =
    data?.top3OG.slice(0, 3).map((og) => {
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
    }) ?? placeholderWinners;

  while (winners.length < 3) {
    winners.push({ og: "", house: "healer", points: 0 });
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mb-[60px] flex justify-center">
        <Image
          src={pic}
          alt="Leaderboards"
          width={400}
          className="relative max-w-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10">
        <Image src={shadow} alt="shadow" className="w-full" />
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] max-w-full">
        <Banner winningTeam={data?.topHouse.name ?? ""} />
      </div>
      <div className="absolute top-[76px] left-1/2 transform -translate-x-1/2 max-w-full">
        <Title winningTeam={data?.topHouse.name ?? ""} />
      </div>
      <Podium
        winners={winners as [Winner, Winner, Winner]}
        className="absolute bottom-0 inset-x-0 sm:px-8 mb-[40px] px-4"
      />
    </div>
  );
}
