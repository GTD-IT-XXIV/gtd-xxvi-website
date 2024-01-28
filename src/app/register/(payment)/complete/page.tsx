"use client";

import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { checkoutSessionAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

export default function CompletePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const sessionId = z.string().safeParse(searchParams.session_id);
  const router = useRouter();
  const setSessionId = useSetAtom(checkoutSessionAtom);
  const {
    data: session,
    isLoading,
    isError,
  } = api.payment.retrieveCheckoutSession.useQuery(
    { sessionId: sessionId.success ? sessionId.data : "" },
    {
      enabled: sessionId.success,
      refetchInterval: (data) => (data?.status === "complete" ? false : 2000),
    },
  );

  if (isLoading || isError) {
    return null;
  }

  if (sessionId.success && session.status === "complete") {
    setSessionId("");
    setTimeout(
      () => router.replace(`/ticket?session_id${sessionId.data}`),
      3000,
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Payment {session.status}</h1>
    </main>
  );
}
