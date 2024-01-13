"use client";

import { useAtom } from "jotai";

import { bookingsAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

export default function CheckoutPage() {
  const hasMounted = useHasMounted();
  const [bookings, setBookings] = useAtom(bookingsAtom);

  return (
    <main>
      <h1 className="text-2xl font-semibold">Checkout Page</h1>
      {!hasMounted ? (
        <p>Bookings loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        bookings.map((booking) => (
          <article
            key={`${booking.eventId}_${booking.bundleId}_${booking.timeslotId}`}
          >
            <h2 className="text-xl font-medium">Booking</h2>
          </article>
        ))
      )}
    </main>
  );
}
