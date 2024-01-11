import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";

import { type registrationFormSchema } from "@/components/registration-form";

export const BASE_KEY = "event-registration";

export const DEFAULT_REGISTRATION_FORM = {
  name: "",
  email: "",
  telegramHandle: "",
  phoneNumber: "",
};

// export const eventDetailsAtom = atomWithStorage<
//   Record<
//     number, // eventId
//     {
//       name: string;
//       quantity: number;
//       bundle?: Bundle;
//       // timeslot?: Timeslot;
//     }
//   >
// >(`${BASE_KEY}-event-details`, {});

export const formDataAtom = atomWithStorage<
  z.infer<typeof registrationFormSchema>
>(`${BASE_KEY}-events-form-data`, DEFAULT_REGISTRATION_FORM);

// export const registrationCompletionAtom = atomWithStorage<{
//   register: boolean;
//   book: boolean;
// }>(`${BASE_KEY}-registration-completion`, { register: false, book: false });
