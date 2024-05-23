import { cn } from "@/lib/utils";

import HouseSection from "./house-section";
import Sponsor from "./sponsor";
import Storyline from "./storyline";
import Topsection from "./topsection";

export type HomePageBodyProps = {
  className?: string;
};

export default function HomePageBody({ className = "" }: HomePageBodyProps) {
  return (
    <section className={cn("", className)}>
      <Topsection />
      <HouseSection />
      <Storyline />
      <Sponsor />
    </section>
  );
}
