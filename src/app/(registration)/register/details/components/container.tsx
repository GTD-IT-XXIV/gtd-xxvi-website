"use client";

import { atom, useAtom } from "jotai";

import BookingInfo from "./info";
import BookingParticipants from "./participants";
import BookingReview from "./review";

interface Booking {
  name: string;
  email: string;
  telegramHandle: string;
  phoneNumber: string;
  eventId: number;
  bundleId: number;
  timeSlotId: number;
  quantity: number;
  valid: boolean;
}
interface Participants {
  participant1: string;
  participant2: string;
  participant3: string;
  participant4: string;
  participant5: string;
}

const defaultBookingDetails = atom<Booking>({
  name: "",
  email: "",
  telegramHandle: "",
  phoneNumber: "",
  eventId: 0,
  bundleId: 0,
  timeSlotId: 0,
  quantity: 0,
  valid: true,
});

const defaultParticipantDetails = atom<Participants>({
  participant1: "",
  participant2: "",
  participant3: "",
  participant4: "",
  participant5: "",
});

export default function BookingContainer() {
  const [bookingDetails, setBookingDetails] = useAtom(defaultBookingDetails);
  const [participantDetiails, setParticipantDetails] = useAtom(
    defaultParticipantDetails,
  );

  const handleBooking = (field: string, value: string) => {
    setBookingDetails({ ...bookingDetails, [field]: value });
  };

  const handleParticipants = (field: string, value: string) => {
    setParticipantDetails({ ...participantDetiails, [field]: value });
  };

  // To test whether the output is correct
  const handleSubmit = () => {
    console.log(bookingDetails);
    console.log(participantDetiails);
  };

  return (
    <div>
      <BookingReview />
      <BookingInfo handleBooking={handleBooking} />
      <BookingParticipants handleParticipants={handleParticipants} />

      {/* Temporary Submit Button */}
      <div>
        <button
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
          className="py-1 px-4 rounded-md bg-gtd-primary-30 text-white hover:bg-gtd-primary-20 mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
