"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  eventDetailsAtom,
  formDataAtom,
  registrationCompletionAtom,
} from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/provider";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const completion = useAtomValue(registrationCompletionAtom);
  const formData = useAtomValue(formDataAtom);
  const eventDetails = useAtomValue(eventDetailsAtom);
  const [clientSecret, setClientSecret] = useState("");

  const { data: bookings, isLoading } = api.bookings.getManyByEmail.useQuery(
    formData.email,
  );
  const createSession = api.payments.createCheckoutSession.useMutation();

  const sessionId = searchParams.get("session_id");
  // const { data: session, isLoading } =
  //   api.payments.retrieveCheckoutSession.useQuery({
  //     sessionId: sessionId ?? "",
  //   });

  // Cmn bisa ke page ini kalau udh book timeslot
  if (!(completion.register && completion.book)) {
    router.back();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading) {
    for (const key in eventDetails) {
      const eventId = Number(key);
      if (
        !bookings ||
        bookings.find((booking) => eventId === booking.eventId)
      ) {
        router.back();
        break;
      }
    }
  }

  async function handleCheckout() {
    try {
      const { clientSecret } = await createSession.mutateAsync({
        bookingIds: bookings?.map((booking) => booking.id) ?? [], // TODO: handle properly
      });
      if (typeof clientSecret === "string") {
        setClientSecret(clientSecret);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Checkout Page</h1>
      {bookings?.map((booking) => (
        <section key={booking.id}>
          <h2 className="text-xl font-medium">
            Event: {booking.eventId} | {eventDetails[booking.eventId]!.name}
          </h2>
          <p>{booking.name}</p>
          <p>{booking.email}</p>
          <p>{booking.telegramHandle}</p>
          <p>{booking.phoneNumber}</p>
          <p>Quantity: {booking.quantity}</p>
          <p>Bundle ID: {booking.bundleId}</p>
          <p>Timeslot ID: {booking.timeslotId}</p>
          <button
            type="button"
            onClick={handleCheckout}
            className="p-2 bg-slate-200 hover:bg-slate-100"
          >
            Checkout
          </button>
          <div id="checkout">
            {clientSecret && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
        </section>
      ))}
    </main>
  );
  return null;
}
