import type QrScanner from "qr-scanner";
import React from "react";

import QrReader from "@/components/dashboard/qr-reader";

export default function DashboardScanPage() {
  function handleScan(result: QrScanner.ScanResult) {
    console.log(result?.data);
  }

  function handleScanFail(error: string | Error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }

  return (
    <div>
      <QrReader onSuccess={handleScan} onFail={handleScanFail} />
    </div>
  );
}
