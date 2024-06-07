import Image from "next/image";
import React from "react";

import bg from "./_assets/background-image.webp";
import scbd from "./_assets/scbd.webp";
import FrameImage from "./_components/FrameImage";

const photoData = [
  {
    name: "Jane Doe",
    src: scbd.src,
    major: "Computer Science",
    year: "2024",
    className: "object-cover",
  },
  {
    name: "John Smith",
    src: scbd.src,
    major: "Mechanical Engineering",
    year: "2024",
    className: "object-cover",
  },
  // Add more data as needed
];

export default function CommitteePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="brick background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photoData.map((data, index) => (
            <FrameImage key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
}
