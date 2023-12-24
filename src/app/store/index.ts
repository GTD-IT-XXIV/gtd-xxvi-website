import { create } from "zustand";

import { type PaymentState, createPaymentState } from "./slices/payment-slice";

export const useBoundStore = create<PaymentState>()((...a) => ({
  ...createPaymentState(...a),
}));
