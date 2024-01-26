import { type Metadata } from "next";
import { z } from "zod";

import CartCleaner from "@/components/registration/cart-cleaner";
import CheckoutWrapper from "@/components/registration/checkout-wrapper";

import { api } from "@/server/trpc";

import EventCardGroup from "./_components/event-card-group";
import RegisterPageFooter from "./_components/register-page-footer";

export const metadata: Metadata = {
  title: "Register",
};

export default async function RegisterPage({
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
      </CartCleaner>
    </CheckoutWrapper>
  );
}
