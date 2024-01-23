import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";

import { type registrationFormSchema } from "@/components/registration/registration-form";

import { DEFAULT_REGISTRATION_FORM } from "@/lib/constants";
import { type Cart } from "@/lib/types";

const BASE_KEY = "event-registration";

export const cartAtom = atomWithStorage<Cart>(`${BASE_KEY}-cart`, []);

export const bookingIdsAtom = atomWithStorage<number[]>(
  `${BASE_KEY}-bookingids`,
  [],
);

export const formDataAtom = atomWithStorage<
  z.infer<typeof registrationFormSchema>
>(`${BASE_KEY}-form-data`, DEFAULT_REGISTRATION_FORM);

export const checkoutSessionAtom = atomWithStorage(
  `${BASE_KEY}-checkout-session-id`,
  "",
);

export const allowCheckoutAtom = atom(false);
