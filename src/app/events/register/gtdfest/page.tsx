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
} from "@/lib/atoms/events-registration";
import { api } from "@/trpc/provider";

export default function GTDFestRegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData] = useAtom(eventsFormDataAtom);
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);

  // eventId 9 is Sample GTD Fest
  const { data: gtdfestEvent, isLoading: gtdFestEventIsLoading } =
    api.events.getById.useQuery(9);
  // eventId 10 is Sample GTD Escape Room
  const { data: escapeRoomEvent, isLoading: escapeRoomEventIsLoading } =
    api.events.getById.useQuery(10);
  const { data: booking, isLoading: bookingIsLoading } =
    api.bookings.getByEmail.useQuery(formData.email);

  if (!bookingIsLoading && booking) {
    router.push("/events/checkout/gtdfest");
  }

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

    if (booking) router.push("/events/checkout");
    router.push("/events/book");
  }

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
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
          [gtdfestEvent.id]: { bundle: null, timeslot: null },
          [escapeRoomEvent.id]: { bundle: null, timeslot: null },
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
