"use client";

export default function EventsPageError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <p>An error occurred while fetching events.</p>;
}
