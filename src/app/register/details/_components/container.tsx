"use client";

import BookingInfo from "./info";
import ParticipantDetailsGroup from "./participant-details-group";
import BookingReview from "./review";

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
