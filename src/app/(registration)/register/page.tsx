import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

import TotalPrice from "@/components/registration/total-price";

import Event from "./components/Event";

export const metadata: Metadata = {
  title: "Register",
};

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/49 GitHub Issue}
 */
export default function RegisterPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (!searchParams.event) {
    notFound();
  }
  const eventParams = z.coerce
    .number()
    .or(z.coerce.number().array())
    .parse(searchParams.event);
  let eventIds: number[];
  if (Array.isArray(eventParams)) {
    eventIds = eventParams;
  } else {
    eventIds = [eventParams];
  }

  return (
    <section className="p-5">
      <p className="text-gtd-primary-30 font-[525] text-3xl mb-[1%]">
        Event Registrations
      </p>
      <p className="text-sm mb-5 font-light">
        Choose events you wish to register for
      </p>
      {eventIds.map((eventId) => (
        <Event key={eventId} eventId={eventId} />
      ))}
      <TotalPrice />
    </section>
  );
}
