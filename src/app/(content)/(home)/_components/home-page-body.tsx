import logo from "@/app/opengraph-image.png";
import bg from "@/app/sponsors-bg.png";

import { cn } from "@/lib/utils";

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
      <main className="min-h-screen flex items-center justify-center">
        <Sponsors bgUrl={bg.src} logos={logos} />
      </main>
    </section>
  );
}
