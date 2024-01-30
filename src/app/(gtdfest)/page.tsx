import GTDFestBg1 from "@/assets/images/gtdfest-background-1.jpeg";
import logoGTDFest from "@/assets/images/logo-gtdfest.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ChevronDown } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { api } from "@/server/trpc";

import { ESCAPE_ROOM_EVENT_ID, GTD_FEST_EVENT_ID } from "@/lib/constants";

dayjs.extend(utc);

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
  const endDateLabel = dayjs.utc(gtdFest.endDate).format("D MMM YYYY");

  return (
    <main>
      <section className="relative text-white">
        <Image src={GTDFestBg1} alt="Background 1" />
        <div className="absolute inset-0 flex flex-col items-center">
          <hgroup className="w-full py-8 text-center space-y-2 bg-[radial-gradient(circle_at_center_40%,_var(--tw-gradient-stops))] from-slate-900 from-25%">
            <Image
              src={logoGTDFest}
              alt="Logo GTD Fest"
              className="h-[400px] w-full object-cover"
            />
            <h1 className="text-4xl font-serif text-shadow shadow-slate-900">
              GTD Fest - Enchantium
            </h1>
            <p className="text-shadow shadow-slate-900">
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
    </main>
  );
}
