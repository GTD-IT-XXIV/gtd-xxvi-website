"use client";

import { useAtomValue } from "jotai";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

import BookingReviewBundle from "./review-bundle";

export default function BookingReview() {
  const hasMounted = useHasMounted();
  const cart = useAtomValue(cartAtom);

  if (!hasMounted) {
    return null;
  }

  const filteredCart = cart.filter((item) => item.quantity !== 0);

  return (
    <div className="text-gtd-secondary-20">
      <h1 className="text-[7.5vw] font-medium my-4 text-gtd-primary-30">
        Booking Details
      </h1>
      <h2 className="text-[5vw] font-medium my-3">Booking Review</h2>

      <div id="bundle-details-container">
        {filteredCart.length !== 0 ? (
          filteredCart.map(({ eventId, bundleId, timeslotId, quantity }) => (
            <BookingReviewBundle
              key={`${eventId}-${bundleId}-${timeslotId}`}
              eventId={eventId}
              bundleId={bundleId}
              timeslotId={timeslotId}
              quantity={quantity}
            />
          ))
        ) : (
          <p className="text-center text-sm text-gtd-secondary-10">
            No bookings found in cart
          </p>
        )}
      </div>
    </div>
  );
}
