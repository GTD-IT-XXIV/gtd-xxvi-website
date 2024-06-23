import { cn } from "@/lib/utils";

import logo from "@/assets/images/sponsors/sample.png";

import bg from "../_assets/sponsors-bg.webp";
import HouseSection from "./house-section";
import Sponsors from "./sponsors";
import Storyline from "./storyline";
import TopSection from "./top-section";

const logos = [
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
  { src: logo, url: "/" },
];

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
