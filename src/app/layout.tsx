import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { type WebSite, type WithContext } from "schema-dts";

import "@/styles/globals.css";

import TRPCReactProvider from "@/components/trpc-react-provider";

import { BASE_URL } from "@/lib/constants";
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

const website: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PINTU Get Together Day",
  alternateName: "PINTU GTD",
  url: BASE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
