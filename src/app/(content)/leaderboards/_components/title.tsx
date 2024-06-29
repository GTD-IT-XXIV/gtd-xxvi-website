import { H3, H2 } from "@/app/_components/typography";
import titleframe from "../_assets/title-frame.png";
import Image from "next/image";
import { type SVGProps } from "react";
import React from "react";
import ChangelingTitle from "../_assets/winner-title/changelingtitle.svg";
import WandererTitle from "../_assets/winner-title/wanderertitle.svg";
import HealerTitle from "../_assets/winner-title/healertitle.svg";
import TimeturnerTitle from "../_assets/winner-title/timeturnertitle.svg";

export default function Title({winningTeam}: {winningTeam: string}) {
    let TitleComponent;
    switch (winningTeam){
        case "Wanderer":
            TitleComponent = WandererTitle;
            break;
        case "Healer":
            TitleComponent = HealerTitle;
            break;
        case "Timeturner":
            TitleComponent = TimeturnerTitle;
            break;
        case "Changeling":
            TitleComponent = ChangelingTitle;
            break;
    }
    return (
        <div className="justify-center items-center">
            {TitleComponent && <TitleComponent />}
        </div>
    );
}
