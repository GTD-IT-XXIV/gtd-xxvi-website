"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";

import { formDataAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { api } from "@/lib/trpc/provider";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const formData = useAtomValue(formDataAtom);
  const setError = useSetAtom(errorAtom);
  const [clientSecret, setClientSecret] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { data: bookings, isLoading } = api.bookings.getManyByEmail.useQuery(
    formData.email,
    { enabled: !!formData.email },
  );
  const { data: session, isLoading: isSessionLoading } =
    api.payments.retrieveCheckoutSession.useQuery(
      { sessionId: sessionId },
      { enabled: !!sessionId },
    );
  const createCheckoutSession =
    api.payments.createCheckoutSession.useMutation();

  useEffect(() => {
    function runEffect() {
      if (!isLoading && bookings?.[0]?.sessionId) {
        const sessionId = bookings[0].sessionId;
        const hasSameSessionId = bookings.every(
          (booking) => booking.sessionId === sessionId,
        );
        if (!hasSameSessionId) {
          throw new Error("Bookings have different session ids");
        }
        setSessionId(sessionId);
      }
      if (!isSessionLoading && session) {
        // null when payment is completed
        setClientSecret(session.clientSecret ?? "");
      }
    }
    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [bookings, isLoading, session, isSessionLoading]);

  async function handleClickCheckout() {
    try {
      if (!bookings || bookings.length === 0) {
        throw new Error("No bookings");
      }
      const { clientSecret } = await createCheckoutSession.mutateAsync({
        bookingIds: bookings.map((booking) => booking.id),
      });
      if (!clientSecret) {
        throw new Error("Client secret is null");
      }
      setClientSecret(clientSecret);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Checkout Page</h1>
      {!isSessionLoading && !!session && (
        <>
          <p>Payment Status: {session.status}</p>
          <p>Customer Email {session.customerEmail}</p>
        </>
      )}
      <section>
        <h2 className="text-xl font-medium">Bookings</h2>
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <article key={booking.id} className="border-b border-black">
              <p>ID: {booking.id}</p>
              <p>Name: {booking.name}</p>
              <p>Email: {booking.email}</p>
              <p>Telegram Handle: {booking.telegramHandle}</p>
              <p>Phone No.: {booking.phoneNumber}</p>
              <p>Quantity: {booking.phoneNumber}</p>
              <p>Bundle ID: {booking.bundleId}</p>
              <p>Timeslot ID: {booking.timeslotId}</p>
            </article>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </section>
      <Link
        href={{
          pathname: "/events/book",
          query: {
            event: bookings?.map((booking) =>
              SuperJSON.stringify({
                id: booking.eventId,
                bundleId: booking.bundleId,
                amount: booking.quantity,
              }),
            ),
          },
        }}
      >
        <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
          Back
        </button>
      </Link>

      <button
        type="button"
        onClick={handleClickCheckout}
        disabled={!bookings || bookings.length === 0}
        className="p-2 bg-green-600 hover:bg-green-600/90 text-white"
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
    </main>
  );
}
