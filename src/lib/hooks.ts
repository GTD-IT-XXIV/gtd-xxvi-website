import { create } from "zustand";

type StoreState = {
  state: number;
};

export const useStore = create<StoreState>()((set, get) => ({
  state: 0,
}));
