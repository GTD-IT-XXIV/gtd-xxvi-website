"use client";

export default function TicketIdsErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <p>Error! {error.digest}</p>;
}
