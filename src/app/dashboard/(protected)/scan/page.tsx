"use client";

import { CheckCircle2, Loader, Loader2, XCircle } from "lucide-react";
import type QrScanner from "qr-scanner";
import React, { useState } from "react";

import QrReader from "@/components/dashboard/qr-reader";
import LoadingSpinner from "@/components/loading-spinner";

import { api } from "@/lib/trpc/client";

export default function DashboardScanPage() {
  const [ticketId, setTicketId] = useState("");
  const {
    data: success,
    isFetching,
    isError,
  } = api.ticket.checkId.useQuery({ id: ticketId }, { enabled: !!ticketId });

  async function handleScan(result: QrScanner.ScanResult) {
    if (isFetching) {
      return;
    }
    if (!result?.data || result.data === ticketId) {
      return;
    }
    setTicketId(atob(result.data));
    setTimeout(() => setTicketId(""), 1000);
  }

  function handleScanFail(error: string | Error) {
    if (error === "No QR code found") {
      return;
    }
    console.error(error);
  }
  console.log({ success, ticketId });

  return (
    <div className="relative grow flex items-stretch">
      <QrReader
        className="grow"
        onSuccess={handleScan}
        onFail={handleScanFail}
      />
      {(isFetching || isError || success !== undefined) && (
        <div className="absolute z-10 inset-0 bg-black/65 flex items-center justify-center">
          {isFetching ? (
            <Loader2 className="size-48 text-gtd-primary-30 animate-spin" />
          ) : success ? (
            <CheckCircle2 className="size-48 text-white fill-green-500" />
          ) : (
            <XCircle className="size-48 text-white fill-red-500" />
          )}
        </div>
      )}
    </div>
  );
}
