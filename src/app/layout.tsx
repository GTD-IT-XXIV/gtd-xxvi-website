import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import "@/styles/globals.css";
import TRPCReactProvider from "@/trpc/provider";

const inter = Inter({ subsets: ["latin"] });

// TODO: change/finalize
export const metadata: Metadata = {
  metadataBase: new URL("https://gtd-xxvi-website-dev.vercel.app/"),
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
        </TRPCReactProvider>
      </body>
    </html>
  );
}
