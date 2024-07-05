import Image from "next/image";

import blackbg from "./_assets/black-bg.webp";
import WholePage from "./_components/whole-page";

export default function LeaderboardsPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={blackbg}
          alt="black background image"
          priority
          fill
          className="object-cover"
        />
      </div>
      <div className="text-white relative flex items-center justify-center min-h-screen flex-grow">
        <WholePage />
      </div>
    </div>
  );
}
