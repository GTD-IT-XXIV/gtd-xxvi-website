import { TRPCClientError } from "@trpc/client";
import { type Metadata } from "next";

import CartCleaner from "@/app/register/_components/cart-cleaner";
import CheckoutWrapper from "@/app/register/_components/checkout-wrapper";

import { api } from "@/server/trpc";

import { eventParamSchema } from "@/lib/schemas";
import { type RouterOutputs } from "@/lib/trpc/utils";

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
  const eventParams = eventParamSchema.safeParse(searchParams.event);
  let eventNames: string[];
  if (eventParams.success) {
    if (Array.isArray(eventParams.data)) {
      eventNames = eventParams.data;
    } else {
      eventNames = [eventParams.data];
    }
  } else {
    let events: RouterOutputs["event"]["getAll"] = [];
    try {
      events = await api.event.getAll();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        throw new Error("EventGetAllError");
      }
      throw error;
    }
    eventNames = events.map((event) => event.name);
  }
  return (
    <>
      <section>
        <CheckoutWrapper>
          <CartCleaner eventNames={eventNames}>
            <section className="grow flex flex-col">
              <article className="flex-1 p-5 md:px-[3.75rem] lg:px-28 pt-10 space-y-5">
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
      </section>
    </>
  );
}
