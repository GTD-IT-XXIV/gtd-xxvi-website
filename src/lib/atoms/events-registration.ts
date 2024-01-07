import type { Bundle, Timeslot } from "@prisma/client";
import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";

import {
  DEFAULT_REGISTRATION_FORM,
  type registrationFormSchema,
} from "@/components/registration-form";

export const BASE_KEY = "event-registration";

export const eventDetailsAtom = atomWithStorage<
  Record<
    number, // eventId
    {
      name: string;
      quantity: number;
      bundle?: Bundle;
      timeslot?: Timeslot;
    }
  >
>(`${BASE_KEY}-event-details`, {});

export const eventsFormDataAtom = atomWithStorage<
  z.infer<typeof registrationFormSchema>
>(`${BASE_KEY}-events-form-data`, DEFAULT_REGISTRATION_FORM);

export const registrationCompletionAtom = atomWithStorage<{
  register: boolean;
  book: boolean;
}>(`${BASE_KEY}-registration-completion`, { register: false, book: false });
