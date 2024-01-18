import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import "@/styles/globals.css";

import TRPCReactProvider from "@/components/trpc-react-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pintugtd.com"),
  title: {
    template: "%s | PINTU GTD",
    default: "PINTU Get Together Day",
  },
  description: "Get Together Day is an annual orientation event held by PINTU.",
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
