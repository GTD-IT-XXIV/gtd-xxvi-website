import Image, { type StaticImageData } from "next/image";

import changelingBanner from "../_assets/winner-banner/changeling.webp";
import healerBanner from "../_assets/winner-banner/healer.webp";
import placeholderBanner from "../_assets/winner-banner/placeholder.webp";
import timeturnerBanner from "../_assets/winner-banner/timeturner.webp";
import wandererBanner from "../_assets/winner-banner/wanderer.webp";

export default function Banner({ winningTeam }: { winningTeam: string }) {
  let titleComponent: StaticImageData;
  switch (winningTeam) {
    case "Wanderer": {
      titleComponent = wandererBanner;
      break;
    }
    case "Healer": {
      titleComponent = healerBanner;
      break;
    }
    case "Timeturner": {
      titleComponent = timeturnerBanner;
      break;
    }
    case "Changeling": {
      titleComponent = changelingBanner;
      break;
    }
    default: {
      titleComponent = placeholderBanner;
      break;
    }
  }
  return (
    <div className="flex justify-center items-center">
      <Image src={titleComponent} alt="Banner" width={400} />
    </div>
  );
}
