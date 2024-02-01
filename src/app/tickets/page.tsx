"use client";

import { Button } from "@/components/ui/button";

import { api } from "@/lib/trpc/client";

import { synchronizeToGoogleSheets } from "./_actions/actions";

export default function TicketsPage() {
  const { isLoading, data } = api.ticket.getAll.useQuery({});
  const onClick = async () => {
    await synchronizeToGoogleSheets();
  };
  return (
    <>
      {data?.tickets?.map((ticket) => (
        <div key={ticket.id}>
          {/* can create other field! */}
          {ticket.id}
          <br />
          {ticket.name}
          <br />
          {ticket.bundleId}
          <br />
          {ticket.email}
          <br />
          <br />
        </div>
      ))}

      <Button onClick={onClick}>Synchronize to google sheets</Button>
    </>
  );
}
