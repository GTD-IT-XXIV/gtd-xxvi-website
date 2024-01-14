"use client";

import { useAtomValue } from "jotai";
import { useState } from "react";

import BookingItem from "@/components/registration/booking-item";
import RegistrationForm from "@/components/registration/registration-form";
import StripeForm from "@/components/registration/stripe-form";

import { bookingsAtom, formDataAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";
import { api } from "@/lib/trpc/client";

export default function CheckoutPage() {
  const hasMounted = useHasMounted();
  const bookings = useAtomValue(bookingsAtom);
  const formData = useAtomValue(formDataAtom);
  const [bookingIds, setBookingIds] = useState<number[]>([]);

  const createBooking = api.booking.create.useMutation();

  function handleFormSubmit() {
    const bookingIds: number[] = [];
    for (const booking of bookings) {
      createBooking.mutate(
        {
          name: formData.name,
          email: formData.email,
          telegramHandle: formData.telegramHandle,
          phoneNumber: formData.phoneNumber,
          quantity: booking.quantity,
          eventId: booking.eventId,
          bundleId: booking.bundleId,
          timeslotId: booking.timeslotId,
        },
        { onSuccess: (data) => bookingIds.push(data.id) },
      );
    }
    setBookingIds(bookingIds);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Checkout Page</h1>
      {!hasMounted ? (
        <p>Bookings loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookingItem
            key={`${booking.eventId}_${booking.bundleId}_${booking.timeslotId}`}
            {...booking}
          />
        ))
      )}
      <RegistrationForm onSubmit={handleFormSubmit} />
      <StripeForm bookingIds={bookingIds} />
    </main>
  );
}
