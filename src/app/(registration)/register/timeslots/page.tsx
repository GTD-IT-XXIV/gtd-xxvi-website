import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/50 GitHub Issue}
 */
import TimeSlotSection from "@/components/registration/timeslot-section";

export const metadata: Metadata = {
  title: "Timeslots",
};

export default async function TimeslotsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (!searchParams.event) {
    notFound();
  }
  const eventParams = z.coerce
    .number()
    .array()
    .or(z.coerce.number())
    .parse(searchParams.event);
  let eventIds: number[] = [];
  if (Array.isArray(eventParams)) {
    eventIds = eventParams;
  } else {
    eventIds = [eventParams];
  }
  const totalParams = z.coerce
    .number()
    .or(z.coerce.number())
    .parse(searchParams.total);
  const totalTicket = totalParams;

  return (
    <section>
      <h1 className="text-[1.75rem] font-semibold my-3 px-4 text-gtd-primary-30">
        Escape Room Timeslots
      </h1>
      {/* <div className="flex justify-center">
        <DayButto n day="Mon" selectedDay={selectedDay}></DayButton>
        <p className="px-[2vw] text-semibold text-gtd-blue-secondary-dim">|</p>
        <DayButton day="Tue" selectedDay={selectedDay}></DayButton>
      </div> */}
      <div className="flex flex-col justify-center text-[4vw]">
        {eventIds.map((eventId) => (
          <TimeSlotSection
            key={eventId}
            totalTicket={totalTicket}
            eventId={eventId}
          />
        ))}
      </div>
    </section>
  );
}
