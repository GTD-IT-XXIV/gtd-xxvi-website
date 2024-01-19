import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeslots",
};

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/50 GitHub Issue}
 */
import TimeSlotButton from "@/components/registration/timeslot-button";

export default function TimeslotsPage() {
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
