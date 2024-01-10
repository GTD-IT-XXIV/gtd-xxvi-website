"use client";

export default function RegistrationError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <p>Error: {error.message}</p>;
}
