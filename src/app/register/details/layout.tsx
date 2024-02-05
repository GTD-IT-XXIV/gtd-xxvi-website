import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function DetailsLayout({ children }: { children: ReactNode }) {
  return children;
}
