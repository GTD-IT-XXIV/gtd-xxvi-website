import { Provider } from "jotai";
import type { Metadata } from "next";
import {
  Inter,
  Noto_Sans_Egyptian_Hieroglyphs,
  Slackey,
} from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import ReactDOM from "react-dom";
import { type WebSite, type WithContext } from "schema-dts";

import "@/styles/globals.css";

import TRPCReactProvider from "@/components/trpc-react-provider";

import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const slackey = Slackey({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-slackey",
});
const hieroglyph = Noto_Sans_Egyptian_Hieroglyphs({
  subsets: ["egyptian-hieroglyphs"],
  weight: "400",
  variable: "--font-hieroglyph",
});

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
  ReactDOM.preload("/committee-background.webp", { as: "image" });
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        bluuNext.variable,
        slackey.variable,
        hieroglyph.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
        <Script
          defer
          src="https://us.umami.is/script.js"
          data-website-id="ac489a4a-0c3c-4e4b-86bd-b1ce59bc79e0"
        ></Script>
      </head>
      <body>
        <TRPCReactProvider>
          <Provider>{children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
