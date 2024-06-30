import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { type Metadata } from "next";
import Image from "next/image";
import React from "react";

import { api } from "@/server/trpc";

import TopSection from "../../(home)/_components/top-section";
import gtdfest from "../gtdfest/_assets/arcade-3.webp";
import escaperoom from "../gtdfest/_assets/escape-room.webp";
import eventsPageMap from "./_assets/events-page-map.webp";
import scbd from "./_assets/scbd.webp";
import TextParallaxContent from "./_components/TextParralaxContent";
import ViewDetailText from "./_components/view-detail-text";

dayjs.extend(utc);

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  // Fetch events from the API
  const events = await api.event.getAll();

  return (
    <section>
      {/* Events page */}
      <TopSection />
      <div className="relative">
        <Image
          src={eventsPageMap}
          alt="Event Page Map"
          unoptimized
          className="w-full"
        />
        <div className="absolute inset-12 flex flex-col items-center mt-44 space-y-12">
          <ViewDetailText
            day="DAY 1"
            title="NIGHT GAME"
            place=""
            date=""
            time=""
          />
          <div>
            <div className="bg-white bg-auto h-72 w-96 bg-opacity-40">
              Pic 1
            </div>
          </div>
          <ViewDetailText
            day="DAY 2"
            title="BEACH DAY"
            place=""
            date=""
            time=""
          />
          <div>
            <div className="bg-white bg-auto h-72 w-96 bg-opacity-40">
              Pic 2
            </div>
          </div>
          <ViewDetailText
            day="DAY 3"
            title="AROUND SG"
            place=""
            date=""
            time=""
          />
          <div>
            <div className="bg-white bg-auto h-72 w-96 bg-opacity-40">
              Pic 3
            </div>
          </div>
          <ViewDetailText
            day="DAY 4"
            title="AWARDS NIGHT"
            place=""
            date=""
            time=""
          />
          <div>
            <div className="bg-white bg-auto h-72 w-96 bg-opacity-40">
              Pic 4
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.03] md:top-16">
        <h1 className="text-white text-lg pl-8 font-medium">Latest Events</h1>
        <hr className="flex-grow bg-white mx-4 h-0.4"></hr>
      </div>
      {/* Mapping through events and rendering TextParallaxContent components */}
      {events.map((event, index) => {
        const alignLeft = index % 2 === 0; //change it into the modulo 2 than confused on the global var and not
        const startDateLabel = dayjs.utc(event.startDate).format("D MMM YYYY");

        let imgUrl = scbd;
        if (event.name === "GTD Fest") {
          imgUrl = gtdfest;
        } else if (event.name === "Escape Room") {
          imgUrl = escaperoom;
        } else if (event.name === "Subcommittee Bonding Day") {
          imgUrl = scbd;
        }

        let buttonDisabled = false;
        if (event.name === "Subcommittee Bonding Day") {
          buttonDisabled = true;
        }

        return (
          <TextParallaxContent
            key={event.name}
            imgUrl={imgUrl.src}
            heading={event.name}
            date={`${startDateLabel}`}
            description={event.description}
            buttonLink={`/events/${event.name.split(" ").join("_")}`}
            buttonText="Learn More"
            buttonDisabled={buttonDisabled}
            alignLeft={alignLeft}
          >
            <p></p>
            {/* Child content */}
          </TextParallaxContent>
        );
      })}
      {/* Example static content */}
    </section>
  );
}
