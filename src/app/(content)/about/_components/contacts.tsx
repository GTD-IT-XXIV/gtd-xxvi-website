"use client";

import Image from "next/image";

import backgroundContacts from "../_assets/Rectangle 24.png";
import instagramLogo from "../_assets/mage_instagram-circle.svg?url";
import telegramLogoBG from "../_assets/socmed-bg.svg?url";
import telegramLogo from "../_assets/tele-logo.svg?url";

export default function Contacts() {
  function handleClickTele() {
    window.open("https://telegram.com", "_blank", "noopener,noreferrer");
  }

  function handleClickIg() {
    window.open(
      "https://www.instagram.com/pintugtd",
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <div className="bg-[#0F172A] text-center">
        <h1 className="text-white text-3xl p-10 bg-[#0F172A] font-serif font-['Bluu_Next']">
          Contact Us
        </h1>
        <div className="flex flex-col gap-14 p-10 font-serif font-['Bluu_Next'] items-center justify-center text-[#402A10] md:flex md:flex-row md:gap-36">
          <button
            className="relative"
            onClick={handleClickTele}
            style={{
              backgroundColor: "hsl(197.4deg 71.43% 50.55%)",
              textShadow: "1px 1px 1px",
              backgroundClip: "text",
            }}
          >
            <div className="absolute top-[-30%] inset-0 flex flex-col justify-center">
              <p className="text-xl font-bold font-serif font-['Bluu_Next'] z-[5]">
                Telegram <br />
              </p>
              <p className="font-serif font-['Bluu_Next'] z-[5]">
                www.telegram.com
              </p>
            </div>
            <Image
              src={backgroundContacts}
              alt="Background"
              className="scale-[1.5] -z-100"
            />
            <Image
              src={telegramLogoBG}
              alt="Telegram Logo"
              className="absolute top-[-100%] left-[-40%]"
            />
            <Image
              src={telegramLogo}
              alt="Telegram Logo"
              className="absolute top-[-85%] left-[-35%]"
            />
          </button>
          <button
            className="relative"
            onClick={handleClickIg}
            style={{
              backgroundColor: "hsl(197.4deg 71.43% 50.55%)",
              textShadow: "1px 1px 1px",
              backgroundClip: "text",
            }}
          >
            <div className="absolute top-[-30%] inset-0 flex flex-col justify-center">
              <p className="text-xl font-bold font-serif font-['Bluu_Next'] z-[5]">
                Instagram <br />
              </p>
              <p className="font-serif font-['Bluu_Next'] z-[5]">
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
              alt="instagram Logo"
              className="absolute top-[-100%] left-[-40%]"
            />
          </button>
        </div>
      </div>
    </>
  );
}
