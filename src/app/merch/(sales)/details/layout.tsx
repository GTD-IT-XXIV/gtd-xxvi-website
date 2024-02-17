import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout",
};
export default function MerchDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
