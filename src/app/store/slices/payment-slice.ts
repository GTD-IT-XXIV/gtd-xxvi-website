import { type StateCreator } from "zustand";

export interface PaymentState {
  clientSecret: string;
  setClientSecret: (clientSecret: string) => void;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  amount: number;
  setAmount: (amount: number) => void;
}

export const createPaymentState: StateCreator<PaymentState> = (set) => ({
  clientSecret: "",
  setClientSecret: (clientSecret) => set(() => ({ clientSecret })),
  message: "",
  setMessage: (message) => set(() => ({ message })),
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  amount: 0,
  setAmount: (amount) => set(() => ({ amount })),
});