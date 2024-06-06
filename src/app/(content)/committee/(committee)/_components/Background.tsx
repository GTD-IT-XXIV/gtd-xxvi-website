import React from "react";
import Image from "next/image";
import bg from "../_assets/background-image.webp";

export default function Background() {
    return (
        <div className = "relative h-[600px]">
            <Image src={bg} alt="brick background" layout = "fill" />
        </div>
    );
}
