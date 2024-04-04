"use client";

import React, { useState } from "react";
import {
  LuCheckCircle2 as CheckCircle2,
  LuLoader2 as Loader2,
  LuXCircle as XCircle,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";

import { syncAllToGoogleSheets as sync } from "@/server/actions/sync-google-sheets";

import { api } from "@/lib/trpc/client";

export default function DashboardScanPage() {
  const [ticketId] = useState("");
  const {
    data: success,
    isFetching,
    isError,
  } = api.order.checkId.useQuery({ id: ticketId }, { enabled: !!ticketId });

  return (
    <div className="relative grow flex items-stretch">
      {(isFetching || isError || success !== undefined) && (
        <div className="absolute z-10 inset-0 bg-black/65 flex items-center justify-center">
          {isFetching ? (
            <Loader2
              strokeWidth={1}
              className="size-48 text-gtd-primary-30 animate-spin"
            />
          ) : success ? (
            <CheckCircle2
              strokeWidth={1}
              className="size-48 text-white fill-green-500"
            />
          ) : (
            <XCircle
              strokeWidth={1}
              className="size-48 text-white fill-red-500"
            />
          )}
        </div>
      )}
      <Button type="button" onClick={() => sync()}>
        Synchronize to Google Sheets
      </Button>
    </div>
  );
}
