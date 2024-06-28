import { H3, H2 } from "@/app/_components/typography";
import titleframe from "../_assets/title-frame.png";
import Image from "next/image";

export default function Title() {
    return (
        <div className="relative flex justify-center items-center">
            <Image src={titleframe} alt="Title Frame" width={480} height={200} className="relative" />
            <H2 className="absolute top-2 text-white font-serif text-[24px]">Winning Teams</H2>
            <H3 className="absolute bottom-0 text-white font-serif text-[15px]">yapper</H3>
        </div>
    );
}
