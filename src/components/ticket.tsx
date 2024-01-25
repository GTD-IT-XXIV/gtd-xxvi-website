"use client";

import QRCode from "qrcode";
import { useEffect, useRef } from "react";

import { api } from "@/lib/trpc/client";

export type TicketProps = {
  id: string;
};
export default function Ticket({ id }: TicketProps) {
  const qrCode = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function generateQrCode(payload: string) {
      if (qrCode?.current) {
        QRCode.toCanvas(
          qrCode.current,
          btoa(payload),
          {
            errorCorrectionLevel: "H",
            version: 6,
          },
          (error) => {
            if (error) {
              console.error(error.message);
            }
          },
        );
      }
    }

    let ignored = false;
    if (!ignored) {
      generateQrCode(id);
    }
    return () => {
      ignored = true;
    };
  }, []);

  return (
    <div>
      <span>{id}</span>
      <canvas ref={qrCode} />
    </div>
  );
}
