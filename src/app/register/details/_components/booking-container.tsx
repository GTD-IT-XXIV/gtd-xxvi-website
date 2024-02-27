"use client";

import BookingInfo from "./booking-info";
import BookingReview from "./booking-review";
import ParticipantDetailsGroup from "./participant-details-group";

export default function BookingContainer() {
  return (
    <div>
      {/* Desktop view */}
      <div className="hidden md:flex">
        <BookingReview />
        <BookingInfo />
        <ParticipantDetailsGroup />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <BookingReview />
        <BookingInfo />
        <ParticipantDetailsGroup />
      </div>
    </div>
  );
}
