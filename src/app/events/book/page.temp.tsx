"use client";

import { getQueryKey } from "@trpc/react-query";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Timeslots from "@/components/timeslots";

import {
  eventDetailsAtom,
  formDataAtom,
  registrationCompletionAtom,
} from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";
import { api } from "@/lib/trpc/provider";

export default function BookingPage() {
  const router = useRouter();
  const hasMounted = useHasMounted();

  const [completion, setCompletion] = useAtom(registrationCompletionAtom);
  const [eventDetails] = useAtom(eventDetailsAtom);
  const [formData] = useAtom(formDataAtom);

  const timeslotsQueries = api.useQueries((api) =>
    Object.keys(eventDetails).map((eventId) =>
      api.timeslots.getManyByEvent(Number(eventId)),
    ),
  );
  const { data: bookings, isLoading: bookingsAreLoading } =
    api.bookings.getManyByEmail.useQuery(formData.email);
  const createBooking = api.bookings.create.useMutation();

  const timeslotsAreLoading = timeslotsQueries.reduce(
    (accum, query) => (accum ||= query.isLoading),
    false,
  );
  const isBookingComplete = Object.keys(eventDetails).reduce(
    (accum, eventId) =>
      (accum &&= !!bookings?.find(
        (booking) => booking.eventId === Number(eventId),
      )),
    true,
  );
  const bookingQueryKey = getQueryKey(api.bookings.getManyByEmail);

  if (!hasMounted || timeslotsAreLoading) {
    return <p>Loading...</p>;
  }

  const eventTimeslotsExist = !timeslotsQueries.reduce((accum, query) => {
    return (accum ||= query.data?.length === 0);
  }, false);
  const onlyOneTimeslotPerEvent = timeslotsQueries.reduce(
    (accum, query) => (accum &&= query.data?.length === 1),
    true,
  );

  if (!eventTimeslotsExist) {
    return <p>Timeslots for one or more of the events not found</p>;
  }

  // Cmn bisa masuk page ini kalau udh isi form registration
  if (!completion.register) {
    // console.log({ hasMounted, registrationCompletion: completion });
    router.back();
  }

  // Kalau cmn ada 1 timeslot buat setiap event, redirect ke checkout page
  if (onlyOneTimeslotPerEvent) {
    Object.entries(eventDetails)
      .map(([key, value]) => [Number(key), value] as [number, typeof value])
      .forEach(([eventId, eventDetail], idx) => {
        if (!eventDetail.bundle) {
          throw new Error(
            `No bundle selected for event ${eventDetail.name} (id: ${eventId})`,
          );
        }
        createBooking.mutate({
          name: formData.name,
          email: formData.email,
          telegramHandle: formData.telegram,
          phoneNumber: formData.phone,
          quantity: eventDetail.quantity,
          eventId: eventId,
          bundleId: eventDetail.bundle.id,
          timeslotId: timeslotsQueries[idx]!.data![0]!.id,
        });
      });
    setCompletion({ ...completion, book: true });
    router.push("/checkout");
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Booking Page</h1>
      {Object.entries(eventDetails)
        .map(([key, value]) => [Number(key), value] as [number, typeof value])
        .map(([eventId, eventDetail]) => (
          <Timeslots
            key={eventId}
            eventId={eventId}
            eventName={eventDetail.name}
            invalidateQueryKey={bookingQueryKey}
          />
        ))}
      <Link href="/checkout">
        <button
          type="button"
          disabled={bookingsAreLoading || !isBookingComplete}
          className="p-2 bg-slate-200 hover:bg-slate-100"
        >
          Next
        </button>
      </Link>
    </main>
  );
}
