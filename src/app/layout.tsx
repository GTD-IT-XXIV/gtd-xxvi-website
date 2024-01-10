import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Toaster } from "@/components/ui/toaster";

import TRPCReactProvider from "@/lib/trpc/provider";
import "@/styles/globals.css";

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
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
