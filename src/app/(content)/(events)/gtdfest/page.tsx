import { type Metadata } from "next";
import Link from "next/link";

import { api } from "@/server/trpc";

import { ESCAPE_ROOM_EVENT_ID, GTD_FEST_EVENT_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GTD Fest x Escape Room",
};

export default async function GTDFestPage() {
  const gtdFest = await api.event.getById.query({ id: GTD_FEST_EVENT_ID });
  const escapeRoom = await api.event.getById.query({
    id: ESCAPE_ROOM_EVENT_ID,
  });

  if (!gtdFest) {
    throw new Error(`GTD Fest event (id: ${GTD_FEST_EVENT_ID}) not found`);
  }
  if (!escapeRoom) {
    throw new Error(
      `Escape Room event (id: ${ESCAPE_ROOM_EVENT_ID}) not found`,
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">GTD Fest x Escape Room Page</h1>
      <Link
        href={{
          pathname: "/register",
          query: {
            event: [GTD_FEST_EVENT_ID, ESCAPE_ROOM_EVENT_ID],
          },
        }}
      >
        <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
          Register
        </button>
      </Link>
      <h2 className="text-xl font-medium">Custom Colors</h2>
      <ul>
        <li>
          gtd-primary: <div className="inline-block size-5 bg-gtd-primary-" />
          <div className="inline-block size-5 bg-gtd-primary-20" />
          <div className="inline-block size-5 bg-gtd-primary-30" />
        </li>
      </ul>
    </main>
  );
}
