"use client";

import { useAtom } from "jotai";
import Link from "next/link";

import { eventDetailsAtom } from "@/lib/atoms/events-registration";
import { api } from "@/trpc/provider";

export default function GTDFestPage() {
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);

  const { data: gtdFest, isLoading: gtdfestIsLoading } =
    api.events.getById.useQuery(9);
  const { data: escapeRoom, isLoading: escapeRoomIsLoading } =
    api.events.getById.useQuery(10);
  const isLoading = gtdfestIsLoading || escapeRoomIsLoading;

  function handleClickRegister() {
    if (!gtdFest || !escapeRoom)
      throw new Error("GTD Fest or Escape Room event not found");
    setEventDetails({
      ...eventDetails,
      [gtdFest.id]: {
        name: gtdFest.name,
        quantity: 0,
        bundle: null,
        timeslot: null,
      },
      [escapeRoom.id]: {
        name: escapeRoom.name,
        quantity: 0,
        bundle: null,
        timeslot: null,
      },
    });
    console.log("register button click");
  }

  // TODO: separate client and server logic to improve page performance
  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <h1 className="text-2xl font-semibold">GTD Fest x Escape Room Page</h1>
      <Link href="/events/register">
        <button
          type="button"
          onClick={handleClickRegister}
          className="p-2 bg-slate-200 hover:bg-slate-100"
        >
          Register
        </button>
      </Link>
      <h2 className="text-xl font-medium">Custom Colors</h2>
      <ul>
        <li>
          gtd-primary: <div className="inline-block size-5 bg-gtd-primary-10" />
          <div className="inline-block size-5 bg-gtd-primary-20" />
          <div className="inline-block size-5 bg-gtd-primary-30" />
        </li>
      </ul>
    </main>
  );
}
