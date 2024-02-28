import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { api } from "@/server/trpc";

import gtdFestBg1 from "@/assets/images/gtdfest-background-1.jpeg";
import gtdFestBg2 from "@/assets/images/gtdfest-background-2.jpeg";
import gtdFestBg3 from "@/assets/images/gtdfest-background-3.jpeg";
import logoGTDFest from "@/assets/images/logo-gtdfest.png";

import arcade1 from "./_assets/arcade-1.jpg";
import arcade2 from "./_assets/arcade-2.jpg";
import arcade3 from "./_assets/arcade-3.jpeg";
import escapeRoomImage from "./_assets/escape-room.jpg";
import food1 from "./_assets/food-1.jpg";
import food2 from "./_assets/food-2.jpg";
import food3 from "./_assets/food-3.jpeg";
import luckyDraw1 from "./_assets/lucky-draw-1.jpg";
import luckyDraw2 from "./_assets/lucky-draw-2.jpg";
import luckyDraw3 from "./_assets/lucky-draw-3.jpg";
import luckyDraw4 from "./_assets/lucky-draw-4.jpg";
import luckyDraw5 from "./_assets/lucky-draw-5.jpg";
import performance1 from "./_assets/performance-1.jpg";
import performance2 from "./_assets/performance-2.jpg";
import performance3 from "./_assets/performance-3.jpg";
import performance4 from "./_assets/performance-4.jpg";
import photobooth1 from "./_assets/photobooth-1.jpeg";
import photobooth2 from "./_assets/photobooth-2.jpg";
import photobooth3 from "./_assets/photobooth-3.jpeg";
import totebag1 from "./_assets/totebag-1.jpg";
import totebag2 from "./_assets/totebag-2.jpg";
import GTDFestMerchSection from "./_components/gtdfest-merch-section";
import GTDFestSection from "./_components/gtdfest-section";
import GTDFestTop from "./_components/gtdfest-top";

dayjs.extend(utc);

const arcadeImages = [
  { src: arcade1, alt: "Arcade game" },
  { src: arcade2, alt: "Arcade game" },
  { src: arcade3, alt: "Arcade game" },
];

const photoboothImages = [
  { src: photobooth1, alt: "A group of people taking a picture together" },
  { src: photobooth2, alt: "A group of people taking a picture together" },
  { src: photobooth3, alt: "A group of people taking a picture together" },
];

const foodImages = [
  { src: food1, alt: "Food and drinks" },
  { src: food2, alt: "Food and drinks" },
  { src: food3, alt: "Food and drinks" },
];

const totebagImages = [
  { src: totebag1, alt: "A person painting on a canvas totebag" },
  { src: totebag2, alt: "A person painting on a canvas totebag" },
];

const luckyDrawImages = [
  { src: luckyDraw1, alt: "Lucky draw prize 1 winner" },
  { src: luckyDraw2, alt: "Lucky draw prize 2 winner" },
  { src: luckyDraw3, alt: "Lucky draw prize 3 winner" },
  { src: luckyDraw4, alt: "Lucky draw prize 4 winner" },
  { src: luckyDraw5, alt: "Lucky draw prize 5 winner" },
];

const performanceImages = [
  { src: performance1, alt: "A performance" },
  { src: performance2, alt: "A performance" },
  { src: performance3, alt: "A performance" },
  { src: performance4, alt: "A performance" },
];

export default async function GTDFestPage() {
  const gtdFest = await api.event.getByName({ name: "GTD Fest" });
  const escapeRoom = await api.event.getByName({ name: "Escape Room" });

  if (!gtdFest) {
    throw new Error(`GTD Fest event not found`);
  }
  if (!escapeRoom) {
    throw new Error(`Escape Room event not found`);
  }

  return (
    <main className="bg-slate-900 text-white">
      <GTDFestTop
        backgroundImage={gtdFestBg1}
        logo={logoGTDFest}
        gtdFest={gtdFest}
        escapeRoom={escapeRoom}
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
