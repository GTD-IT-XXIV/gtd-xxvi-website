import healerBanner from "../_assets/winner-banner/healerBanner.png";
import Image from "next/image";

export default function Banner() {
    return (
        <div className="flex justify-center items-center">
            <Image src={healerBanner} alt="Healer Banner" width = {400}/>
        </div>
    );
}
