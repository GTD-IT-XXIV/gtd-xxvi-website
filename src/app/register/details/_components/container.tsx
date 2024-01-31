"use client";

import BookingInfo from "./info";
import BookingReview from "./review";

export default function BookingContainer() {
  return (
    <div>
      {/* Desktop view */}
      <div className="hidden md:flex">
        <BookingReview />
        <BookingInfo />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <BookingReview />
        <BookingInfo />
      </div>
    </div>
  );
}
