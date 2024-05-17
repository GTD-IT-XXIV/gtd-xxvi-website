import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { type Metadata } from "next";
import React from "react";

import { api } from "@/server/trpc";

import gtdfest from "../gtdfest/_assets/arcade-3.webp";
import escaperoom from "../gtdfest/_assets/escape-room.webp";
import scbd from "./_assets/scbd.webp";
import TextParallaxContent from "./_components/TextParralaxContent";

dayjs.extend(utc);

export const metadata: Metadata = {
  title: "Events",
};

let isNextAlignLeft = true;

// EventsPage component renders TextParallaxContent
export default async function EventsPage() {
  // Fetch events from the API
  const events = await api.event.getAll();

  return (
    <section>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.03] md:top-16">
        <h1 className="text-white text-lg pl-8 font-medium">Latest Events</h1>
        <hr className="flex-grow bg-white mx-4 h-0.4"></hr>
      </div>
      {/* Mapping through events and rendering TextParallaxContent components */}
      {events.map((event) => {
        const alignLeft = isNextAlignLeft;
        isNextAlignLeft = !isNextAlignLeft;
        const startDateLabel = dayjs.utc(event.startDate).format("D MMM YYYY");
        const endDateLabel = dayjs.utc(event.endDate).format("D MMM YYYY");

        // Determine the image to use based on the event name
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
