import gtdFestBg1 from "@/assets/images/gtdfest-background-1.jpeg";
import gtdFestBg2 from "@/assets/images/gtdfest-background-2.jpeg";
import gtdFestBg3 from "@/assets/images/gtdfest-background-3.jpeg";
import logoGTDFest from "@/assets/images/logo-gtdfest.png";
import merchPhoto from "@/assets/images/sample-merch-1.jpeg";
import topiSvg from "@/assets/images/topi.svg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ChevronDown } from "lucide-react";
import { type Metadata } from "next";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { api } from "@/server/trpc";

import { ESCAPE_ROOM_EVENT_ID, GTD_FEST_EVENT_ID } from "@/lib/constants";
import { type Merch } from "@/lib/types";

import GTDFestMerchCarousel from "./_components/gtdfest-merch-carousel";
import GTDFestSection from "./_components/gtdfest-section";

dayjs.extend(utc);

const topi = topiSvg as string;

const merchs: (Merch & { icon: string | StaticImport })[] = [
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
  const gtdFest = await api.event.getById.query({ id: GTD_FEST_EVENT_ID });
  const escapeRoom = await api.event.getById.query({
    id: ESCAPE_ROOM_EVENT_ID,
  });

  if (!gtdFest) {
    throw new Error(`GTD Fest event (id: ${GTD_FEST_EVENT_ID}) not found`);
  }
  if (!escapeRoom) {
    throw new Error(
      `Escape Room event (id: ${ESCAPE_ROOM_EVENT_ID}) not found`,
    );
  }

  const startDateLabel = dayjs.utc(gtdFest.startDate).format("D MMM");
  const endDateLabel = dayjs.utc(escapeRoom.endDate).format("D MMM YYYY");

  return (
    <main className="bg-slate-900 text-white">
      {/* Top Section */}
      <section className="relative">
        <Image
          src={gtdFestBg1}
          alt="Background 1"
          className="md:aspect-video object-cover"
        />
        <div className="absolute flex flex-col inset-0 bg-[radial-gradient(circle_at_center_35%,_var(--tw-gradient-stops))] md:bg-[radial-gradient(circle_at_25%_50%,_var(--tw-gradient-stops))] from-slate-900 from-25% md:from-10% md:-translate-x-10">
          <div className="flex-1 flex flex-col md:flex-row gap-4 md:justify-center items-center">
            <Image
              src={logoGTDFest}
              alt="Logo GTD Fest"
              className="h-1/2 md:h-auto w-auto md:w-1/2 aspect-[1/0.9] object-[50%_35%] object-cover"
            />
            <div className="flex flex-col items-center gap-4">
              <hgroup className="text-center">
                <h1 className="block text-xl md:text-2xl font-serif text-shadow shadow-slate-900">
                  <div>{gtdFest.name}</div>
                  <div className="text-5xl md:text-6xl text-gtd-primary-20 text-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-gtd-primary-30">
                    Enchantium
                  </div>
                  <p className="text-lg md:text-xl mt-2 opacity-65">X</p>
                  <div>{escapeRoom.name}</div>
                  <div className="text-5xl md:text-6xl text-red-600 text-shadow-[0px_0px_4px_var(--tw-shadow-color)] shadow-red-500">
                    Nyctophobia
                  </div>
                </h1>
                <p className="text-shadow md:text-2xl shadow-slate-900 mt-6">
                  {startDateLabel} - {endDateLabel}
                </p>
              </hgroup>
              <div className="flex md:flex-col justify-center gap-4 md:gap-3">
                <Button
                  type="button"
                  className="bg-gtd-primary-30 hover:bg-gtd-primary-20 md:px-6 font-semibold"
                  asChild
                >
                  <Link href="/register">Register</Link>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="hover:bg-slate-200 md:px-6"
                  asChild
                >
                  <Link href="#learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* biar gk ketutupan navbar */}
          <div id="learn-more" className="flex justify-center">
            <ChevronDown className="size-8 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Merch Section */}
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
