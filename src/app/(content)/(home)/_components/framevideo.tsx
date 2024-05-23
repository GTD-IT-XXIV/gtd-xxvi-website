import Image from "next/image";
import React from "react";

import framevideoyt from "../_assets/framevideoyt.png";

const Framevideo = () => {
  return (
    <div>
      <Image
        className=""
        src={framevideoyt}
        width={500}
        height={400}
        alt="frame video youtube"
      />
    </div>
  );
};

export default Framevideo;
