import { type StaticImageData } from "next/image";
import { type z } from "zod";

import { type cartSchema, type merchCartSchema } from "./schemas";
import { type ArrElement } from "./utils";

/**
 * Used to synchornize registration process. If ID is 0, then
 * user has not selected that item, e.g., bundleId equals 0 means that user has
 * not selected a bundle for the event in eventId.
 */
export type Cart = z.infer<typeof cartSchema>;

export type CartItem = ArrElement<Cart>;

export type OrderMetadata = {
  type: "event" | "merch";
  bookingIds: string; // JSON.stringify(number[])
};

export type MerchCart = z.infer<typeof merchCartSchema>;

export type MerchCartItem = ArrElement<MerchCart>;

export type Committee = {
  name: string;
  nickname?: string;
  portfolio: string;
  position: string;
  og: number;
  major: string;
  year: number;
  image: {
    still: StaticImageData;
    animated: StaticImageData;
  };
};

export type House = "wanderer" | "healer" | "changeling" | "timeturner";
