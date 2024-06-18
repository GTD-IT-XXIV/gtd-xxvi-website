import Image from "next/image";

import backgroundContacts from "@/assets/images/Rectangle 24.png";
import instagramLogo from "@/assets/images/instagram logo.png";
import telegramLogo from "@/assets/images/telegram logo.png";

export default function Contacts() {
  return (
    <>
      <div className="bg-[#0F172A] text-center">
        <h1 className="text-white text-3xl p-10 bg-[#0F172A] font-serif font-['Bluu_Next']">
          Contact Us
        </h1>
        <div className="flex flex-col gap-10 font-serif font-['Bluu_Next'] items-center justify-center text-[#402A10]">
          <div className="relative">
            <div className="absolute top-[-30%] inset-0 flex flex-col justify-center">
              <p className="text-xl font-bold font-serif font-['Bluu_Next'] z-10">
                Telegram <br />
              </p>
              <p className="font-serif font-['Bluu_Next'] z-10">
                www.telegram.com
              </p>
            </div>
            <Image
              src={backgroundContacts}
              alt="Background"
              className="scale-[1.5] -z-10"
            />
            <Image
              src={telegramLogo}
              alt="Telegram Logo"
              className="scale-[0.5] absolute top-[-220%] left-[-70%]"
            />
          </div>
          <div className="relative">
            <div className="absolute top-[-30%] inset-0 flex flex-col justify-center">
              <p className="text-xl font-bold font-serif font-['Bluu_Next'] z-10">
                Instagram <br />
              </p>
              <p className="font-serif font-['Bluu_Next'] z-10">
                www.instagram.com
              </p>
            </div>
            <Image
              src={backgroundContacts}
              alt="Background"
              className="scale-[1.5] -z-10"
            />
            <Image
              src={instagramLogo}
              alt="Telegram Logo"
              className="scale-[0.38] absolute top-[-220%] left-[-70%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
