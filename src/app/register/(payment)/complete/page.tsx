"use client";

import { useSetAtom } from "jotai";
import { CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import LoadingSpinner from "@/components/loading-spinner";

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

  if (!sessionId.success) {
    router.back();
  }

  if (isLoading || isError) {
    return null;
  }

  if (sessionId.success && session.status === "complete") {
    setSessionId("");
    setTimeout(
      () => router.replace(`/ticket?session_id=${sessionId.data}`),
      3000,
    );
  }

  return (
    <main className="grow flex flex-col p-5 pt-10">
      <h1 className="text-gtd-primary-30 font-semibold text-3xl">
        Payment {session.status}
      </h1>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        {session.status === "open" && (
          <LoadingSpinner className="fill-gtd-primary-30 size-48" />
        )}
        {session.status === "complete" && (
          <>
            <CheckCircle2
              strokeWidth={0.5}
              className="size-48 text-gtd-primary-30"
            />
            <p className="text-center">
              We have received your payment and sent your tickets to{" "}
              <span className="font-semibold">{session.customerEmail}</span>
            </p>
          </>
        )}
        {session.status === "expired" && (
          <>
            <XCircle strokeWidth={0.5} className="size-48 text-red-500" />
            <p className="text-center">
              An error occurred while processing your payment. Please go back
              and try again.
            </p>
          </>
        )}
      </div>
    </main>
  );
}