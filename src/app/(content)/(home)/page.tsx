import Navbar from "@/app/_components/navbar";

import HomePageBody from "./_components/home-page-body";

export default function HomePage() {
  return (
    <>
      <Navbar className="z-10 sticky top-0" />
      <HomePageBody className="flex-1" />
    </>
  );
}
