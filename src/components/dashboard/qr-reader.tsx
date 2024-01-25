"use client";

import Image from "next/image";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

// https://medium.com/readytowork-org/implementing-a-qr-code-scanner-in-react-4c8f4e3c6f2e

export type QrReaderProps = {
  onSuccess: (result: QrScanner.ScanResult) => void;
  onFail: (error: string | Error) => void;
};

export default function QrReader({ onSuccess, onFail }: QrReaderProps) {
  const scanner = useRef<QrScanner>();
  const video = useRef<HTMLVideoElement>(null);
  const qrBox = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState(true);

  // const [scannedResult, setScannedResult] = useState<string | undefined>("");
  //
  // function onScanSuccess(result: QrScanner.ScanResult) {
  //   console.log(result);
  //   setScannedResult(result?.data);
  // }
  //
  // function onScanFail(err: string | Error) {
  //   console.log(err);
  // }

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
    <div className="relative w-full h-full">
      <video ref={video} />
      <div ref={qrBox} className="">
        <Image
          src="/qr-frame.svg"
          width={256}
          height={256}
          alt="QR Code Frame"
        />
      </div>
    </div>
  );
}
