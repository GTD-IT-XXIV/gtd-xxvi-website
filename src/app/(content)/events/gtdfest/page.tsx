import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Suspense } from "react";

import { api } from "@/server/trpc";

import gtdFestBg1 from "@/assets/images/gtdfest-background-1.webp";
import gtdFestBg2 from "@/assets/images/gtdfest-background-2.webp";
import gtdFestBg3 from "@/assets/images/gtdfest-background-3.webp";
import logoGTDFest from "@/assets/images/logo-gtdfest.webp";

import escapeRoomImage from "./_assets/escape-room.webp";
import GTDFestMerchSection from "./_components/gtdfest-merch-section";
import GTDFestSection from "./_components/gtdfest-section";
import GTDFestTitle from "./_components/gtdfest-title";
import GTDFestTitleLoading from "./_components/gtdfest-title/loading";
import GTDFestTop from "./_components/gtdfest-top";
import {
  arcadeImages,
  foodImages,
  luckyDrawImages,
  performanceImages,
  photoboothImages,
  totebagImages,
} from "./_utils/images";

dayjs.extend(utc);

export default function GTDFestPage() {
  return (
    <main className="bg-slate-900 text-white">
      <GTDFestTop
        backgroundImage={gtdFestBg1}
        logo={logoGTDFest}
        title={
          <Suspense fallback={<GTDFestTitleLoading />}>
            <GTDFestTitle />
          </Suspense>
        }
      />
      <GTDFestMerchSection />
      {/* Other Sections */}
      <GTDFestSection
        title="Escape Room: Nyctophobia"
        description='Embark on a thrilling journey in "Nyctophobia," where you and your team of 5 wizards have been captured by a malevolent Death Eater. As you navigate through each challenge, race against time to escape the castle before the dark experiments unfold. Can you conquer your fears and break free from the clutches of Nyctophobia?'
        image={{
          src: gtdFestBg3,
          alt: "Background 3",
        }}
        carouselImages={[
          { src: escapeRoomImage, alt: "Playing cards laid on a table" },
        ]}
      />
      <GTDFestSection
        title="Arcade"
        description="Play 5 enchanting arcade games and boost your luck with top-ups for an extra shot at the grand Lucky Draw!"
        image={{
          src: gtdFestBg2,
          alt: "Background 2",
        }}
        carouselImages={arcadeImages}
        variant="right"
      />
      <GTDFestSection
        title="Photobooth"
        description="Dress up, gather your friends, and immortalize the enchantment of the night with a whimsical photo strip from our magical Photobooth."
        image={{
          src: gtdFestBg3,
          alt: "Background 3",
        }}
        carouselImages={photoboothImages}
      />
      <GTDFestSection
        title="Food and Drinks"
        description="Feast of Flavors: Indulge in Ayam Geprek, Telur Gulung, Pop Ice with Jelly, and Soda Gembira, creating a magical gastronomic experience."
        image={{
          src: gtdFestBg2,
          alt: "Background 2",
        }}
        carouselImages={foodImages}
        variant="right"
      />
      <GTDFestSection
        title="Tote Bag Painting"
        description="Unleash your creativity by painting your own tote bag and take home a unique souvenir of this enchanted evening."
        image={{
          src: gtdFestBg3,
          alt: "Background 3",
        }}
        carouselImages={totebagImages}
      />
      <GTDFestSection
        title="Lucky Draw"
        description="Fortune Awaits! Purchase your ticket to enter the Lucky Draw and stand a chance to win exciting prizes that await you at the end of the fest!"
        image={{
          src: gtdFestBg2,
          alt: "Background 2",
        }}
        carouselImages={luckyDrawImages}
        variant="right"
      />
      <GTDFestSection
        title="Finale Extravaganza"
        description="Stay enchanted until the very end with special performances that promise to make this festival a night to remember!"
        image={{
          src: gtdFestBg3,
          alt: "Background 3",
        }}
        carouselImages={performanceImages}
      />
    </main>
  );
}
