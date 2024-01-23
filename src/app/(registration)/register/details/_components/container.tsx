"use client";

import { useAtom } from "jotai";

import BookingInfo from "./info";
// import BookingParticipants from "./participants";
import BookingReview from "./review";

export default function BookingContainer() {
  // const [bookingDetails, setBookingDetails] = useAtom(defaultBookingDetails);
  //
  // const handleBooking = (field: string, value: string) => {
  //   setBookingDetails({ ...bookingDetails, [field]: value });
  // };

  // const handleParticipants = (field: string, value: string) => {
  //   setParticipantDetails({ ...participantDetiails, [field]: value });
  // };

  // To test whether the output is correct
  // const handleSubmit = () => {
  //   console.log(bookingDetails);
  //   console.log(participantDetiails);
  // };

  return (
    <div>
      <BookingReview />
      <BookingInfo />
      {/* <BookingParticipants handleParticipants={handleParticipants} /> */}
    </div>
  );
}
