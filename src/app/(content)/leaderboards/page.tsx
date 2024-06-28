import blackbg from "./_assets/black-bg.png";
import Image from 'next/image';
import WholePage from "./_components/wholePage";

export default function LeaderboardsPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image 
          src={blackbg}
          alt="black background image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="text-white relative flex items-center justify-center min-h-screen flex-grow">
        <WholePage />
      </div>
    </div>
  );
}
