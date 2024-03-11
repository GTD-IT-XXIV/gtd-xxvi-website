import { TRPCClientError } from "@trpc/client";
import { type Metadata } from "next";

import CartCleaner from "@/app/register/_components/cart-cleaner";
import CheckoutWrapper from "@/app/register/_components/checkout-wrapper";

import { api } from "@/server/trpc";

import { eventParamSchema } from "@/lib/schemas";
import { type RouterOutputs } from "@/lib/trpc/utils";
import { cn } from "@/lib/utils";

import EventCardGroup from "./event-card-group";
import RegisterPageFooter from "./register-page-footer";

export const metadata: Metadata = {
  title: "Register",
};

export default async function MobileLayout({
  className,
  searchParams,
}: {
  className: string;
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
    let events: RouterOutputs["event"]["getAllAvailable"] = [];
    try {
      events = await api.event.getAllAvailable.query();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        throw new Error("EventGetAllError");
      }
      throw error;
    }
    eventNames = events.map((event) => event.name);
  }

  return (
    <CheckoutWrapper>
      <CartCleaner eventNames={eventNames}>
        <section className={cn("grow flex flex-col", className)}>
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
              {eventNames.length === 0 ? (
                <p>No events available for registration.</p>
              ) : (
                eventNames.map((eventName) => (
                  <EventCardGroup key={eventName} eventName={eventName} />
                ))
              )}
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
