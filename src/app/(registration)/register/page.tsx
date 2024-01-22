import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

import EventCardGroup from "./_components/event-card-group";
import RegisterPageFooter from "./_components/register-page-footer";

export const metadata: Metadata = {
  title: "Register",
};

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
    <section className="grow flex flex-col">
      <article className="flex-1 p-5 space-y-5">
        <hgroup className="space-y-1">
          <h1 className="text-gtd-primary-30 font-semibold text-3xl">
            Event Registrations
          </h1>
          <p className="text-sm font-light">
            Choose events you wish to register for
          </p>
        </hgroup>
        <div className="space-y-4">
          {eventIds.map((eventId) => (
            <EventCardGroup key={eventId} eventId={eventId} />
          ))}
        </div>
      </article>
      <RegisterPageFooter
        className="sticky bottom-0"
        pageSearchParams={searchParams}
      />
    </section>
  );
}
