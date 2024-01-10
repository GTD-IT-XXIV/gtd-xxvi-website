"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";
import { type ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

import BundlePopup from "@/components/bundle-popup";
import BundleSelect from "@/components/bundle-select";
import RegistrationForm from "@/components/registration-form";

import { formDataAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { useHasPendingPayments } from "@/lib/hooks";
import { api } from "@/lib/trpc/provider";

export default function RegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasPendingPayments = useHasPendingPayments();

  const setError = useSetAtom(errorAtom);
  const formData = useAtomValue(formDataAtom);

  const eventParams = searchParams.getAll("event");
  const eventIdsSchema = z.coerce.number().positive().array();
  let eventIds: z.infer<typeof eventIdsSchema> = [];
  try {
    eventIds = eventIdsSchema.parse(eventParams);
  } catch (error) {
    const validationError = fromZodError(error as ZodError);
    setError(validationError.message);
  }

  const {
    data: bookings,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = api.bookings.getManyByEmailAndEvents.useQuery(
    { email: formData.email, eventIds },
    { enabled: !!formData.email },
  );

  const [selectedBundlesId, setSelectedBundlesId] = useState<
    Record<number, number>
  >(eventIds.reduce((accum, eventId) => ({ ...accum, [eventId]: 0 }), {}));
  const [bundlesAmount, setBundlesAmount] = useState<Record<number, number>>(
    eventIds.reduce((accum, eventId) => ({ ...accum, [eventId]: 0 }), {}),
  );

  useEffect(() => {
    function runEffect() {
      if (!isBookingsLoading && !isBookingsError && bookings) {
        const [bookingsSelectedBundlesId, bookingsBundlesAmount]: [
          Record<number, number>,
          Record<number, number>,
        ] = bookings.reduce(
          (accum, booking) => [
            { ...accum[0], [booking.eventId]: booking.bundleId },
            { ...accum[1], [booking.eventId]: booking.quantity },
          ],
          [{}, {}],
        );
        setSelectedBundlesId({
          ...selectedBundlesId,
          ...bookingsSelectedBundlesId,
        });
        setBundlesAmount({ ...bundlesAmount, ...bookingsBundlesAmount });
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [bookings, isBookingsLoading, isBookingsError]);

  console.log({ bookings, selectedBundlesId, bundlesAmount });

  if (hasPendingPayments) {
    router.replace("/checkout");
  }

  function handleChangeBundle(eventId: number, bundleId: number) {
    setSelectedBundlesId({
      ...selectedBundlesId,
      [eventId]: bundleId,
    });
    setBundlesAmount({
      ...bundlesAmount,
      [eventId]: 1,
    });
  }

  function handleChangeAmount(eventId: number, amount: number) {
    setBundlesAmount({
      ...bundlesAmount,
      [eventId]: amount,
    });
  }

  function handleFormSubmit() {
    const bookSearchParams = new URLSearchParams();
    for (const eventId of eventIds) {
      if (selectedBundlesId[eventId] === 0 || bundlesAmount[eventId] === 0) {
        setError("Please select a bundle for each event");
        throw new Error("Please select a bundle for each event");
      }
      bookSearchParams.append(
        "event",
        SuperJSON.stringify({
          id: eventId,
          bundleId: selectedBundlesId[eventId],
          amount: bundlesAmount[eventId],
        }),
      );
    }
    console.log("Submitted Form! Book URL: " + bookSearchParams.toString());
    router.push(`/events/book?${bookSearchParams.toString()}`);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Registration Page</h1>
      <article>
        <span>Event ID {eventIds}</span>
        <BundlePopup>
          {eventIds.map((eventId) => (
            <BundleSelect
              key={eventId}
              eventId={eventId}
              selectedBundle={{
                // id & amount initialized as 0 for all eventId in eventIds
                id: selectedBundlesId[eventId]!,
                amount: bundlesAmount[eventId]!,
              }}
              onChangeBundle={(bundleId) =>
                handleChangeBundle(eventId, bundleId)
              }
              onChangeAmount={(amount) => handleChangeAmount(eventId, amount)}
            />
          ))}
        </BundlePopup>
        <RegistrationForm onSubmit={handleFormSubmit} />
      </article>
    </main>
  );
}
