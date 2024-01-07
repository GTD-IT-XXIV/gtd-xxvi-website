"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

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

export default function RegistrationPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData] = useAtom(eventsFormDataAtom);
  const [eventDetails] = useAtom(eventDetailsAtom);
  const [registrationCompletion, setRegistrationCompletion] = useAtom(
    registrationCompletionAtom,
  );

  const { data: booking, isLoading: bookingIsLoading } =
    api.bookings.getByEmail.useQuery(formData.email);

  function handleFormSubmit() {
    const eventsBundleSelected = Object.keys(eventDetails).reduce(
      (accum, eventId) => (accum &&= !!eventDetails[Number(eventId)]?.bundle),
      true,
    );

    if (!eventsBundleSelected) {
      toast({
        variant: "destructive",
        title: "Event bundle not selected",
        description:
          "Please select a bundle for all events before submitting the form.",
      });
      return;
    }

    setRegistrationCompletion({ ...registrationCompletion, register: true });
    router.push("/events/book");
  }

  if (!bookingIsLoading && booking) router.push("/checkout");

  return (
    <>
      <BundlePopup>
        {Object.keys(eventDetails)
          .map((key) => Number(key))
          .map((eventId) => (
            <BundlePopupContent
              key={eventId}
              eventId={eventId}
              eventName={eventDetails[eventId]!.name}
            />
          ))}
      </BundlePopup>
      <RegistrationForm onSubmit={handleFormSubmit} />
    </>
  );
}
