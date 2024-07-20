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
  },
};

export default function HomePage() {
  return (
    <>
      <HomePageBody className="flex-1" />
    </>
  );
}
