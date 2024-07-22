import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import gtdfest from "@/app/(content)/events/gtdfest/_assets/arcade-3.webp";
import escaperoom from "@/app/(content)/events/gtdfest/_assets/escape-room.webp";

import { api } from "@/server/trpc";

import scbd from "../_assets/scbd.webp";
import seniorCamp from "../_assets/senior-camp.webp";
import TextParallaxContent from "./text-parralax-content";

dayjs.extend(utc);

export default async function PastEvents() {
  // Fetch events from the API
  const events = await api.event.getAll();

  return (
    <>
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
        } else if (event.name === "Senior Camp") {
          imgUrl = seniorCamp;
        }

        let buttonDisabled = false;
        if (
          event.name === "Subcommittee Bonding Day" ||
          event.name === "Senior Camp"
        ) {
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
    </>
  );
}
