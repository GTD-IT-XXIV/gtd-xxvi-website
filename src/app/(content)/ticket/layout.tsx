import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tickets",
};

export default function TicketLayout({ children }: { children: ReactNode }) {
  return children;
}
