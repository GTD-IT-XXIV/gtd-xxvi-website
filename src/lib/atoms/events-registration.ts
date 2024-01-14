import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";

import { type registrationFormSchema } from "@/components/registration/registration-form";

import { DEFAULT_REGISTRATION_FORM } from "@/lib/constants";
import { type LocalBooking } from "@/lib/types/events-registration";

const BASE_KEY = "event-registration";

export const bookingsAtom = atomWithStorage<LocalBooking[]>(
  `${BASE_KEY}-bookings`,
  [] satisfies LocalBooking[],
);

export const formDataAtom = atomWithStorage<
  z.infer<typeof registrationFormSchema>
>(`${BASE_KEY}-form-data`, DEFAULT_REGISTRATION_FORM);

export const checkoutSessionAtom = atomWithStorage(
  `${BASE_KEY}-checkout-session-id`,
  "",
);
