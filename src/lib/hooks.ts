import { useEffect, useState } from "react";
import { create } from "zustand";

type StoreState = {
  state: number;
};

export const useStore = create<StoreState>()((set, get) => ({
  state: 0,
}));

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}
