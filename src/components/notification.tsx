"use client";

import { useAtomValue } from "jotai";

import { errorAtom, notificationAtom } from "@/lib/atoms/message";

export default function Notification() {
  const errorMessage = useAtomValue(errorAtom);
  const notificationMessage = useAtomValue(notificationAtom);
  return (
    <div className="absolute bottom-0 right-0">
      <p>Error: {errorMessage}</p>
      <p>Notification: {notificationMessage}</p>
    </div>
  );
}
