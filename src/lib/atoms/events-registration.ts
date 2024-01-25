import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { type Cart } from "@/lib/types";

const BASE_KEY = "event-registration";

export const cartAtom = atomWithStorage<Cart>(`${BASE_KEY}-cart`, []);

export const checkoutSessionAtom = atomWithStorage(
  `${BASE_KEY}-checkout-session-id`,
  "",
);

export const bookingIdsAtom = atom<number[]>([]);

export const allowCheckoutAtom = atom(false);
