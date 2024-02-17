"use client";

export default function GTDFestError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <p className="text-white">Error! {error.message}</p>;
}
