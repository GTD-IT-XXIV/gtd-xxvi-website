import healerBanner from "../_assets/winner-banner/healerBanner.png";
import changelingBanner from "../_assets/winner-banner/changelingBanner.png";
import wandererBanner from "../_assets/winner-banner/wandererBanner.png";
import timeturnerBanner from "../_assets/winner-banner/timeturnerBanner.png";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Banner({winningTeam}: {winningTeam: string}) {
    let titleComponent: string | StaticImport = "";
    switch (winningTeam){
        case "Wanderer":
            titleComponent = wandererBanner;
            break;
        case "Healer":
            titleComponent = healerBanner;
            break;
        case "Timeturner":
            titleComponent = timeturnerBanner;
            break;
        case "Changeling":
            titleComponent = changelingBanner;
            break;
    }
    return (
        <div className="flex justify-center items-center">
            <Image src={titleComponent} alt="Banner" width = {400}/>
        </div>
    );
}
