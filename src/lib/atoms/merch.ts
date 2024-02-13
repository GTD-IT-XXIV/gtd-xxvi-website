import { atomWithStorage } from "jotai/utils";
import SuperJSON from "superjson";
import { type z } from "zod";

import { merchCartSchema } from "@/lib/schemas";
import type { MerchCart } from "@/lib/types";

const BASE_KEY = "merch";

export const merchCartAtom = atomWithStorage<MerchCart>(
  `${BASE_KEY}-cart`,
  [],
  {
    getItem: (key, initialValue) => {
      const res = localStorage.getItem(key);
      if (res === null) {
        return initialValue;
      }
      return merchCartSchema.parse(
        SuperJSON.parse<z.infer<typeof merchCartSchema>>(res),
      );
    },
    setItem: (key, value) => {
      return localStorage.setItem(key, SuperJSON.stringify(value));
    },
    removeItem: (key) => {
      return localStorage.removeItem(key);
    },
  },
);
