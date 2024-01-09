"use client";

import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import BundlePopup from "@/components/bundle-popup";
import BundlePopupContent from "@/components/bundle-popup-content";
import RegistrationForm from "@/components/registration-form";
import { useToast } from "@/components/ui/use-toast";

import {
  eventDetailsAtom,
  eventsFormDataAtom,
  registrationCompletionAtom,
} from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";
import { api } from "@/trpc/provider";

export default function RegistrationPage() {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const { toast } = useToast();

  const formData = useAtomValue(eventsFormDataAtom);
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);
  const [completion, setCompletion] = useAtom(registrationCompletionAtom);

  const { data: bookings, isLoading: bookingsAreLoading } =
    api.bookings.getManyByEmail.useQuery(formData.email);
  const updateBooking = api.bookings.updateByEmailAndEvent.useMutation();
  const deleteBookings = api.bookings.deleteManyByEmail.useMutation();

  const hasPendingPayments =
    bookings?.reduce(
      (accum, booking) => (accum ||= !!booking.paymentIntentId),
      false,
    ) ?? false;

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      if (hasMounted && !bookingsAreLoading && bookings) {
        for (const booking of bookings) {
          if (!eventDetails[booking.eventId]) {
            continue;
          }
          setEventDetails({
            ...eventDetails,
            [booking.eventId]: {
              ...eventDetails[booking.eventId]!,
              quantity: booking.quantity,
            },
          });
        }
      }
    }
    return () => {
      ignored = true;
    };
  }, [hasMounted, bookings, bookingsAreLoading]);

  if (!hasMounted) {
    return <p>Loading...</p>;
  }

  if (!bookingsAreLoading && bookings && hasPendingPayments) {
    setCompletion({ register: true, book: true });
    router.push("/checkout");
  }

  function handleFormSubmit() {
    const bundlesSelected = Object.keys(eventDetails).reduce(
      (accum, eventId) => (accum &&= !!eventDetails[Number(eventId)]?.bundle),
      true,
    );

    if (!bundlesSelected) {
      toast({
        variant: "destructive",
        title: "Event bundle not selected",
        description:
          "Please select a bundle for all events before submitting the form.",
      });
      return;
    }

    const bookingsHasCorrectEvents = Object.keys(eventDetails).reduce(
      (accum, eventId) =>
        (accum &&= !!bookings?.find(
          (booking) => Number(eventId) === booking.eventId,
        )),
      true,
    );
    if (!bookingsHasCorrectEvents) {
      deleteBookings.mutate(formData.email);
    } else {
      for (const [key, eventDetail] of Object.entries(eventDetails)) {
        const eventId = Number(key);

        // Unreachable code but required for type safety
        if (!eventDetail.bundle) {
          throw new Error("Bundle for event does not exist");
        }

        try {
          updateBooking.mutate({
            email: formData.email,
            eventId,
            quantity: eventDetail.quantity,
            bundleId: eventDetail.bundle.id,
          });
        } catch (error) {
          deleteBookings.mutate(formData.email);
        }
      }
    }

    setCompletion({ ...completion, register: true });
    router.push("/events/book");
  }

  return (
    <>
      <BundlePopup>
        {Object.entries(eventDetails)
          .map(([key, value]) => [Number(key), value] as [number, typeof value])
          .map(([eventId, eventDetail]) => (
            <BundlePopupContent
              key={eventId}
              eventId={eventId}
              eventName={eventDetail.name}
            />
          ))}
      </BundlePopup>
      <RegistrationForm onSubmit={handleFormSubmit} />
    </>
  );
}
