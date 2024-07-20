import { type Metadata } from "next";

import { BASE_URL } from "@/lib/constants";

import HomePageBody from "./_components/home-page-body";

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: "PINTU GTD",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1000,
        height: 1000,
        alt: "Logo PINTU Get Together Day",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HomePageBody className="flex-1" />
    </>
  );
}
