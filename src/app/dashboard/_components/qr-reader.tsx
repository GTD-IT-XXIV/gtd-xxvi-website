"use client";

import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// https://medium.com/readytowork-org/implementing-a-qr-code-scanner-in-react-4c8f4e3c6f2e

export type QrReaderProps = {
  className?: string;
  onSuccess: (result: QrScanner.ScanResult) => void;
  onFail: (error: string | Error) => void;
};

export default function QrReader({
  className = "",
  onSuccess,
  onFail,
}: QrReaderProps) {
  const scanner = useRef<QrScanner>();
  const video = useRef<HTMLVideoElement>(null);
  const qrBox = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState(true);

  useEffect(() => {
    if (video?.current && !scanner.current) {
      scanner.current = new QrScanner(video?.current, onSuccess, {
        returnDetailedScanResult: true,
        onDecodeError: onFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBox?.current ?? undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) {
            setQrOn(false);
          }
        });
    }

    return () => {
      if (!video?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
      );
    }
  }, [qrOn]);

  return (
    <div
      className={cn(
        "bg-black relative flex justify-center items-center",
        className,
      )}
    >
      <video ref={video} />
      <div
        ref={qrBox}
        className="absolute inset-0 border-4 border-white rounded-2xl"
      />
    </div>
  );
}
