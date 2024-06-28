import Image from "next/image";

import pic from "../_assets/leaderboards-bg.png";
import Banner from "./banner";
import Podium from "./podium";
import Title from "./title";

export default function WholePage() {
  return (
    <div className="relative min-h-screen">
      <div className="mb-[60px]">
        <Image src={pic} alt="Leaderboards" width={430} className="relative" />
      </div>
      <div className="absolute top-0 flex flex-col items-center justify-center">
        <Banner />
      </div>
      <div className="absolute top-[76px] left-1/2 transform -translate-x-1/2">
        <Title />
      </div>
      <div className="w-[369px] bottom-0 absolute left-1/2 transform -translate-x-1/2"></div>
      <Podium
        winners={[
          { og: "1", house: "wanderer", points: 1000 },
          { og: "3", house: "healer", points: 9000 },
          { og: "8", house: "timeturner", points: 800 },
        ]}
        className="absolute bottom-0 inset-x-0 px-8"
      />
    </div>
  );
}
