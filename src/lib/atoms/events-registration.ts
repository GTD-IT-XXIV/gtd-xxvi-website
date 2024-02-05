import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import SuperJSON from "superjson";
import { type z } from "zod";

import { type Cart } from "@/lib/types";

import { cartSchema } from "../schemas";

const BASE_KEY = "event-registration";

export const cartAtom = atomWithStorage<Cart>(`${BASE_KEY}-cart`, [], {
  getItem: (key, initialValue) => {
    const res = localStorage.getItem(key);
    if (res === null) {
      return initialValue;
    }
    return cartSchema.parse(SuperJSON.parse<z.infer<typeof cartSchema>>(res));
  },
  setItem: (key, value) => {
    return localStorage.setItem(key, SuperJSON.stringify(value));
  },
  removeItem: (key) => {
    return localStorage.removeItem(key);
  },
});

export const checkoutSessionAtom = atomWithStorage(
  `${BASE_KEY}-checkout-session-id`,
  "",
);

export const bookingIdsAtom = atom<number[]>([]);

export const allowCheckoutAtom = atom(false);

export const showDialogAtom = atom(false);
