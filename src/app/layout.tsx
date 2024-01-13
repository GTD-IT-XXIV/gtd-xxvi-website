import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import "@/styles/globals.css";

import Notification from "@/components/notification";
import TRPCReactProvider from "@/components/trpc-react-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // TODO: change
  metadataBase: new URL("https://gtd-xxvi-website.fly.dev"),
  title: "GTD XXVI Website",
  description: "PINTU Get Together Day XXVI Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
          <Notification />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
