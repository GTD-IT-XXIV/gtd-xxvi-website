"use client";

import { useAtomValue } from "jotai";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

import BookingReviewBundle from "./review-bundle";
import BookingReviewBundleLoading from "./review-bundle/loading";

export default function BookingReview() {
  const hasMounted = useHasMounted();
  const cart = useAtomValue(cartAtom);
  const filteredCart = cart.filter((item) => item.quantity !== 0);

  return (
    <div className="text-gtd-secondary-20 md:w-96 md:mx-10 lg:ml-[5.75rem]">
      <h1 className="text-3xl font-semibold mb-4 text-gtd-primary-30">
        Booking Details
      </h1>
      <h2 className="text-xl font-medium my-3">Booking Review</h2>

      <div id="bundle-details-container">
        {!hasMounted ? (
          <BookingReviewBundleLoading />
        ) : filteredCart.length !== 0 ? (
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
          <p className="text-center text-sm text-gtd-secondary-10 md:text-left">
            No bookings found in cart
          </p>
        )}
      </div>
    </div>
  );
}
