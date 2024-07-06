import { cn } from "@/lib/utils";

import kingdomFoodGroupLogo from "@/assets/images/sponsors/kingdom-food-group-logo.webp";
import kotexLogo from "@/assets/images/sponsors/kotex-logo.png";
import lumosLogo from "@/assets/images/sponsors/lumos-logo.png";
import mgpLogo from "@/assets/images/sponsors/mgp-logo.png";
import oatsideLogo from "@/assets/images/sponsors/oatside-logo.webp";
import playnationLogo from "@/assets/images/sponsors/playnation-logo.jpeg";
import weCinemasLogo from "@/assets/images/sponsors/we-cinemas-logo.jpg";

import bg from "../_assets/sponsors-bg.webp";
import HouseSection from "./house-section";
import Sponsors from "./sponsors";
import Storyline from "./storyline";
import TopSection from "./top-section";

const logos = new Array(3)
  .fill([
    {
      src: kingdomFoodGroupLogo,
      url: "https://www.instagram.com/captainkimsg",
    },
    { src: weCinemasLogo, url: "https://www.wecinemas.com.sg/" },
    { src: kotexLogo, url: "https://www.kotex.com.sg/" },
    { src: mgpLogo, url: "https://mgplabel.com/" },
    { src: lumosLogo, url: "https://lumosprojector.com/" },
    { src: playnationLogo, url: "https://playnation.com.sg/" },
    { src: oatsideLogo, url: "https://oatside.com/" },
  ])
  .flat();

export type HomePageBodyProps = {
  className?: string;
};

export default function HomePageBody({ className = "" }: HomePageBodyProps) {
  return (
    <section className={cn("", className)}>
      <TopSection />
      <HouseSection />
      <Storyline />
      <main className="flex justify-center items-center">
        <Sponsors bgUrl={bg.src} logos={logos} />
      </main>
    </section>
  );
}
