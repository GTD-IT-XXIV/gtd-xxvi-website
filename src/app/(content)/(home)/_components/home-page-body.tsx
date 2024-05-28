import { cn } from "@/lib/utils";

import HouseSection from "./house-section";
import Sponsors from "./sponsors";
import Storyline from "./storyline";
import TopSection from "./topsection";

export type HomePageBodyProps = {
  className?: string;
};

export default function HomePageBody({ className = "" }: HomePageBodyProps) {
  return (
    <section className={cn("", className)}>
      <TopSection />
      <HouseSection />
      <Storyline />
      <Sponsors />
    </section>
  );
}
