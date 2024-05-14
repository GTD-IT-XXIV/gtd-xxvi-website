import React from "react";
import { type Metadata } from "next";
import Link from "next/link";

import { api } from "@/server/trpc";
import TextParallaxContent from "./_components/TextParralaxContent";
import foto1 from "./_assets/rain-1.jpg";
import foto2 from "./_assets/rain-2.jpg";

export const metadata: Metadata = {
  title: "Events",
};

// Helper function to format the date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

let isNextAlignLeft = true;

// EventsPage component renders TextParallaxContent
export default async function EventsPage() {
  // Fetch events from the API
  const events = await api.event.getAll();

  return (
    <section>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-white text-lg pl-8 font-medium">Latest Events</h1>
        <hr className="flex-grow bg-white mx-4 h-0.4"></hr>
      </div>
      {/* Mapping through events and rendering TextParallaxContent components */}
      {events.map((event) => {
        const alignLeft = isNextAlignLeft;
        isNextAlignLeft = !isNextAlignLeft;

        return (
          <TextParallaxContent
            imgUrl={foto2}
            heading={event.name}
            date={`${formatDate(event.startDate.toString())} - ${formatDate(event.endDate.toString())}`}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum ligula sit amet, posuere odio."
            buttonLink={`/events/${event.name.split(" ").join("_")}`}
            buttonText="Learn More"
            alignLeft={alignLeft}
          >
            <p></p>
            {/* Child content */}
          </TextParallaxContent>
        );
      })}
      {/* Example static content */}
      <TextParallaxContent
        imgUrl={foto1}
        heading="SCBD 2023"
        date="segitu - segitu"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum ligula sit amet, posuere odio."
        alignLeft={true}
      >
        <p></p>
        {/* Child content */}
      </TextParallaxContent>
    </section>
  );
}

