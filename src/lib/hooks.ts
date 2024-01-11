import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { create } from "zustand";

import { formDataAtom } from "./atoms/events-registration";
import { api } from "./trpc/provider";

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

export function useHasPendingPayments() {
  const [hasPendingPayments, setHasPendingPayments] = useState(false);
  const formData = useAtomValue(formDataAtom);
  const { data, isLoading } = api.bookings.getManyByEmail.useQuery(
    formData.email,
    { enabled: !!formData.email },
  );

  useEffect(() => {
    async function runEffect() {
      if (!isLoading && data) {
        setHasPendingPayments(data.some((booking) => !!booking.sessionId));
      }
    }

    let ignored = false;
    if (!ignored) {
      void runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [data, isLoading]);

  return hasPendingPayments;
}
