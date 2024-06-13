import Image from "next/image";
import React from "react";

import bg from "./_assets/background-image.webp";
import CommFrameCarousel from "./_components/committee-frame-carousel";

export default function CommitteePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={bg} alt="brick background" className="object-cover" fill />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <CommFrameCarousel />
        </div>
      </div>
    </div>
  );
}
