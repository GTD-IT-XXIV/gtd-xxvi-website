import { type StateCreator } from "zustand";

export interface PaymentState {
  clientSecret: string;
  setClientSecret: (clientSecret: string) => void;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const createPaymentState: StateCreator<PaymentState> = (set) => ({
  clientSecret: "",
  setClientSecret: (clientSecret: string) => set(() => ({ clientSecret })),
  message: "",
  setMessage: (message: string) => set(() => ({ message })),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
});
