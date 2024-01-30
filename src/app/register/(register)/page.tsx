import { type Metadata } from "next";

import DesktopLayout from "./_components/desktop-layout";
import MobileLayout from "./_components/mobile-layout";

export const metadata: Metadata = {
  title: "Register",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      <DesktopLayout className="hidden md:flex" searchParams={searchParams} />
      <MobileLayout className="md:hidden" searchParams={searchParams} />
    </>
  );
}
