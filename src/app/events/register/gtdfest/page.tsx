"use client";

import { useAtom } from "jotai";
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
import { api } from "@/trpc/provider";

export default function GTDFestRegistrationPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData] = useAtom(eventsFormDataAtom);
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);
  const [registrationCompletion, setRegistrationCompletion] = useAtom(
    registrationCompletionAtom,
  );

  // eventId 9 is Sample GTD Fest
  const { data: gtdfestEvent, isLoading: gtdFestEventIsLoading } =
    api.events.getById.useQuery(9);
  // eventId 10 is Sample GTD Escape Room
  const { data: escapeRoomEvent, isLoading: escapeRoomEventIsLoading } =
    api.events.getById.useQuery(10);
  const { data: booking, isLoading: bookingIsLoading } =
    api.bookings.getByEmail.useQuery(formData.email);

  function handleFormSubmit() {
    if (
      !eventDetails[gtdfestEvent!.id]!.bundle ||
      !eventDetails[escapeRoomEvent!.id]!.bundle
    ) {
      toast({
        variant: "destructive",
        title: "Event bundle not selected",
        description:
          "Please select an event bundle before submitting the form.",
      });
      return;
    }

    if (booking) router.push("/checkout");

    setRegistrationCompletion({ ...registrationCompletion, register: true });
    router.push("/events/book");
  }

  if (!bookingIsLoading && booking) {
    router.push("/checkout");
  }

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      // save the events the user is registering for a single time
      if (
        !gtdFestEventIsLoading &&
        !escapeRoomEventIsLoading &&
        gtdfestEvent &&
        escapeRoomEvent &&
        !eventDetails[gtdfestEvent.id] &&
        !eventDetails[escapeRoomEvent.id]
      ) {
        setEventDetails({
          ...eventDetails,
          [gtdfestEvent.id]: {
            name: gtdfestEvent.name,
            quantity: 0,
            bundle: null,
            timeslot: null,
          },
          [escapeRoomEvent.id]: {
            name: escapeRoomEvent.name,
            quantity: 0,
            bundle: null,
            timeslot: null,
          },
        });
      }
    }
    return () => {
      ignored = true;
    };
  }, [
    gtdFestEventIsLoading,
    escapeRoomEventIsLoading,
    gtdfestEvent,
    escapeRoomEvent,
  ]);

  return (
    <>
      {gtdFestEventIsLoading || escapeRoomEventIsLoading ? (
        <p>Loading...</p>
      ) : !gtdfestEvent || !escapeRoomEvent ? (
        <p>Events not found</p>
      ) : (
        <BundlePopup>
          <BundlePopupContent
            eventName={gtdfestEvent.name}
            eventId={gtdfestEvent.id}
          />
          <BundlePopupContent
            eventName={escapeRoomEvent.name}
            eventId={escapeRoomEvent.id}
          />
        </BundlePopup>
      )}
      <RegistrationForm onSubmit={handleFormSubmit} />
    </>
  );
}
