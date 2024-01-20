import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
