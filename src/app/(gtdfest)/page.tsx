import GTDFestBg1 from "@/assets/images/gtdfest-background-1.jpeg";
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

import GTDFestMerchCarousel from "./_components/merch-carousel";

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
  {
    name: "Merch 4",
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
        <Image src={GTDFestBg1} alt="Background 1" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center">
          <hgroup className="w-full pt-8 text-center bg-[radial-gradient(circle_at_center_35%,_var(--tw-gradient-stops))] from-slate-900 from-25%">
            <Image
              src={logoGTDFest}
              alt="Logo GTD Fest"
              className="h-[30rem] w-full object-cover"
            />
            <h1 className="block text-xl font-serif text-shadow shadow-slate-900">
              <div>{gtdFest.name}</div>
              <div className="text-5xl text-gtd-primary-20 text-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-gtd-primary-30">
                Enchantium
              </div>
              <p className="text-lg mt-2 opacity-65">X</p>
              <div>{escapeRoom.name}</div>
              <div className="text-5xl text-red-600 text-shadow-[0px_0px_4px_var(--tw-shadow-color)] shadow-red-500">
                Nyctophobia
              </div>
            </h1>
            <p className="text-shadow shadow-slate-900 mt-6">
              {startDateLabel} - {endDateLabel}
            </p>
          </hgroup>
          <div className="flex gap-4">
            <Button
              type="button"
              className="bg-gtd-primary-30 hover:bg-gtd-primary-20 font-semibold"
            >
              Register
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="hover:bg-slate-200"
              asChild
            >
              <Link href="#learn-more">Learn More</Link>
            </Button>
          </div>
          <div className="flex-1" />
          <ChevronDown className="size-8 animate-pulse" />
        </div>
      </section>

      {/* Merch Section */}
      <GTDFestMerchCarousel merchs={merchs} />
    </main>
  );
}
