"use client";

import { useAtom } from "jotai";

import BookingInfo from "./info";
import BookingReview from "./review";

export default function BookingContainer() {
  return (
    <div>
      <BookingReview />
      <BookingInfo />
    </div>
  );
}
