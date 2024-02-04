import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { type Metadata } from "next";

import { api } from "@/server/trpc";

import { type Merch } from "@/lib/types";

import gtdFestBg1 from "@/assets/images/gtdfest-background-1.jpeg";
import gtdFestBg2 from "@/assets/images/gtdfest-background-2.jpeg";
import gtdFestBg3 from "@/assets/images/gtdfest-background-3.jpeg";
import logoGTDFest from "@/assets/images/logo-gtdfest.png";
import merchPhoto from "@/assets/images/sample-merch-1.jpeg";
import topiSvg from "@/assets/images/topi.svg";

import GTDFestMerchCarousel from "./_components/gtdfest-merch-carousel";
import GTDFestSection from "./_components/gtdfest-section";
import GTDFestTop from "./_components/gtdfest-top";

dayjs.extend(utc);

const topi = topiSvg as string;

const merchs: (Merch & { icon: string })[] = [
  {
    name: "Merch 1",
    description:
      "Event description lorem ipsum dolor sit Nam sagittis luctus tristique.",
    image: merchPhoto,
    icon: topi,
  },
  {
    name: "Merch 2",
    description:
      "Event description lorem ipsum dolor sit Nam sagittis luctus tristique.",
    image: merchPhoto,
    icon: topi,
  },
  {
    name: "Merch 3",
    description:
      "Event description lorem ipsum dolor sit Nam sagittis luctus tristique.",
    image: merchPhoto,
    icon: topi,
  },
];

export const metadata: Metadata = {
  title: "GTD Fest x Escape Room",
};

export default async function GTDFestPage() {
  const gtdFest = await api.event.getByName.query({ name: "GTD Fest" });
  const escapeRoom = await api.event.getByName.query({name: "Escape Room"});

  if (!gtdFest) {
    throw new Error(`GTD Fest event not found`);
  }
  if (!escapeRoom) {
    throw new Error(
      `Escape Room event not found`,
    );
  }

  return (
    <main className="bg-slate-900 text-white">
      <GTDFestTop
        backgroundImage={gtdFestBg1}
        logo={logoGTDFest}
        gtdFest={gtdFest}
        escapeRoom={escapeRoom}
      />
      <GTDFestMerchCarousel merchs={merchs} />
      {/* Other Sections */}
      <GTDFestSection
        title="Escape Room"
        description="Event description lorem ipsum dolor sit Nam sagittis luctus tristique. Morbi luctus, nisi id blandit nunc."
        image={{
          src: gtdFestBg2,
          alt: "Background 2",
        }}
      />
      <GTDFestSection
        title="Photobooth"
        description="Event description lorem ipsum dolor sit Nam sagittis luctus tristique. Morbi luctus, nisi id blandit nunc."
        image={{
          src: gtdFestBg3,
          alt: "Background 3",
        }}
        variant="right"
      />
      <GTDFestSection
        title="Arcade"
        description="Event description lorem ipsum dolor sit Nam sagittis luctus tristique. Morbi luctus, nisi id blandit nunc."
        image={{
          src: gtdFestBg2,
          alt: "Background 2",
        }}
      />
      <GTDFestSection
        title="Performances"
        description="Event description lorem ipsum dolor sit Nam sagittis luctus tristique. Morbi luctus, nisi id blandit nunc."
        image={{
          src: gtdFestBg3,
          alt: "Background 3",
        }}
        variant="right"
      />
    </main>
  );
}
