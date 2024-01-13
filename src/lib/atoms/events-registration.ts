import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";

import { type registrationFormSchema } from "@/components/registration-form";

const BASE_KEY = "event-registration";

export const DEFAULT_REGISTRATION_FORM = {
  name: "",
  email: "",
  telegramHandle: "",
  phoneNumber: "",
};

export const bookingAtom = atomWithStorage<{
  quantity: number;
  eventId: number;
  bundleId: number;
  timeslotId: number;
} | null>(`${BASE_KEY}-booking`, null);

export const formDataAtom = atomWithStorage<
  z.infer<typeof registrationFormSchema>
>(`${BASE_KEY}-form-data`, DEFAULT_REGISTRATION_FORM);
