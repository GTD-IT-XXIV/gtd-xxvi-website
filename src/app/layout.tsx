import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import "@/styles/globals.css";

import TRPCReactProvider from "@/components/trpc-react-provider";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const bluuNext = localFont({
  src: [
    {
      path: "../assets/fonts/BluuNext-Bold.otf",
      style: "normal",
    },
    {
      path: "../assets/fonts/BluuNext-Bolditalic.otf",
      style: "italic",
    },
  ],
  variable: "--font-bluu-next",
});

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
    <html lang="en" className={cn(inter.variable, bluuNext.variable)}>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
