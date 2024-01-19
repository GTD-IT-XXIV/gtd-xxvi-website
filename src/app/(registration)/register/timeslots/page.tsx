import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/50 GitHub Issue}
 */
import TimeSlotButton from "@/components/registration/timeslot-button";

export const metadata: Metadata = {
  title: "Timeslots",
};

export default function TimeslotsPage({
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

  const date = new Date();
  return (
    <section>
      <div>
        <TimeSlotButton startTime={date} endTime={date} remainingSlots={10} />
        <TimeSlotButton startTime={date} endTime={date} remainingSlots={10} />
      </div>
    </section>
  );
}
