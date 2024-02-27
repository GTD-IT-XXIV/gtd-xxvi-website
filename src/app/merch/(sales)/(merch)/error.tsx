"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MerchPageError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  let message = "";
  switch (error.message) {
    default: {
      message = "An error occurred.";
      break;
    }
  }

  return (
    <section className="grow flex flex-col px-10 lg:px-24">
      <article className="flex-1 p-5 pt-10 space-y-5">
        <h1 className="text-gtd-primary-30 font-semibold text-3xl">
          Merchandise Sales
        </h1>
        <p>{message} Please go back and try again.</p>
        <Button
          className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
          asChild
        >
          <Link href="/">Return to Homepage</Link>
        </Button>
      </article>
    </section>
  );
}
