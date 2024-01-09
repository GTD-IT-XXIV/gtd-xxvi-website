import Link from "next/link";

import GTDFestRegisterButton from "@/components/gtdfest-register-button";

import { api } from "@/trpc/server";

export default async function GTDFestPage() {
  const gtdFest = await api.events.getById.query(9);
  const escapeRoom = await api.events.getById.query(10);

  if (!gtdFest) {
    throw new Error(`GTD Fest event (id: ${9}) not found`);
  }
  if (!escapeRoom) {
    throw new Error(`Escape Room event (id: ${10}) not found`);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">GTD Fest x Escape Room Page</h1>
      <Link href="/events/register">
        <GTDFestRegisterButton gtdFest={gtdFest} escapeRoom={escapeRoom} />
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
