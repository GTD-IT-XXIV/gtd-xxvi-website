import React from "react";

import ChangelingTitle from "../_assets/winner-title/changeling.svg";
import HealerTitle from "../_assets/winner-title/healer.svg";
import PlaceholderTitle from "../_assets/winner-title/placeholder.svg";
import TimeturnerTitle from "../_assets/winner-title/timeturner.svg";
import WandererTitle from "../_assets/winner-title/wanderer.svg";

export default function Title({ winningTeam }: { winningTeam: string }) {
  let TitleComponent;
  switch (winningTeam) {
    case "Wanderer": {
      TitleComponent = WandererTitle;
      break;
    }
    case "Healer": {
      TitleComponent = HealerTitle;
      break;
    }
    case "Timeturner": {
      TitleComponent = TimeturnerTitle;
      break;
    }
    case "Changeling": {
      TitleComponent = ChangelingTitle;
      break;
    }
    default: {
      TitleComponent = PlaceholderTitle;
      break;
    }
  }
  return (
    <div className="justify-center items-center">
      {TitleComponent && <TitleComponent />}
    </div>
  );
}
