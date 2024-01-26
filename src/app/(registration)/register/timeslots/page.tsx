import { type Metadata } from "next";
import { z } from "zod";

import CartCleaner from "@/components/registration/cart-cleaner";
import CheckoutWrapper from "@/components/registration/checkout-wrapper";

import { api } from "@/server/trpc";

import TimeslotsPageBody from "./_components/timeslots-page-body";
import TimeslotsPageFooter from "./_components/timeslots-page-footer";

export const metadata: Metadata = {
  title: "Timeslots",
};

export default async function TimeslotsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const eventParams = z.coerce
    .number()
    .or(z.coerce.number().array())
    .safeParse(searchParams.event);
  let eventIds: number[];
  if (eventParams.success) {
    if (Array.isArray(eventParams.data)) {
      eventIds = eventParams.data;
    } else {
      eventIds = [eventParams.data];
    }
  } else {
    const events = await api.event.getAll.query();
    eventIds = events.map((event) => event.id);
  }
  return (
    <CheckoutWrapper>
      <CartCleaner eventIds={eventIds}>
        <section className="grow flex flex-col">
          <article className="flex-1 p-5 pt-10 space-y-5">
            <hgroup className="space-y-1">
              <h1 className="text-gtd-primary-30 font-semibold text-3xl">
                Event Timeslots
              </h1>
              <p className="text-sm font-light">
                Select a timeslot for the following bundles
              </p>
            </hgroup>
            <TimeslotsPageBody />
          </article>
          <TimeslotsPageFooter
            className="sticky bottom-0"
            pageSearchParams={searchParams}
          />
        </section>
      </CartCleaner>
    </CheckoutWrapper>
  );
}
