import { type z } from "zod";

import { type cartSchema } from "./schemas";
import { type ArrElement } from "./utils";

/**
 * Used to synchornize registration process. If ID is 0, then
 * user has not selected that item, e.g., bundleId equals 0 means that user has
 * not selected a bundle for the event in eventId.
 */
export type Cart = z.infer<typeof cartSchema>;

export type CartItem = ArrElement<Cart>;

export type OrderMetadata = {
  bookingIds: string; // JSON.stringify(number[])
};
