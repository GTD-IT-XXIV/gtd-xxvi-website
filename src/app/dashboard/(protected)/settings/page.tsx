"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { syncAllToGoogleSheets as sync } from "@/server/actions/sync-google-sheets";

export default function DashboardScanPage() {
  return (
    <div className="relative grow px-4 py-6">
      <h1 className="text-4xl font-extrabold mb-2">Settings</h1>
      <div className="w-full flex items-center gap-4">
        <p>Synchronize to Google Sheets</p>
        <Button type="button" size="sm" onClick={() => sync()}>
          Synchronize
        </Button>
      </div>
    </div>
  );
}
