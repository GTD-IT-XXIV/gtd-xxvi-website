import type { Bundle, Timeslot } from "@prisma/client";
import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";

import {
  DEFAULT_REGISTRATION_FORM,
  type registrationFormSchema,
} from "@/components/registration-form";

export const eventDetailsAtom = atomWithStorage<
  Record<number, { bundle: Bundle | null; timeslot: Timeslot | null }>
>("event-details", {});

export const eventsFormDataAtom = atomWithStorage<
  z.infer<typeof registrationFormSchema>
>("events-form-data", DEFAULT_REGISTRATION_FORM);
