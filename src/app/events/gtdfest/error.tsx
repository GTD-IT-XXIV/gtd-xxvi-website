"use client";

export default function GTDFestError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <p>Error! {error.message}</p>;
}
