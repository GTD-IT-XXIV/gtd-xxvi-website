"use client";

import QRCode from "qrcode";
import { useEffect, useRef } from "react";

export type TicketQrProps = {
  id: string;
  width: number;
  margin: number;
};

export default function TicketQr({ id, width, margin }: TicketQrProps) {
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
            width,
            margin,
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

  return <canvas ref={qrCode} />;
}
