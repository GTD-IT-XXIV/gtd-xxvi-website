import Image from "next/image";
import React from "react";

import sponsorbg from "../_assets/sponsorbg.png";

const Sponsor = () => {
  return (
    <div>
      <Image
        src={sponsorbg}
        alt="sponsor background"
        width={440}
        height={494}
        className="w-full bg-cover bg-center md:h-[600px] xl:h-[1000px] 2xl:h-[1200]"
      />
    </div>
  );
};

export default Sponsor;
