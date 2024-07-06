"use client";

import Image from "next/image";
import Link from "next/link";

import backgroundContacts from "../_assets/contact-us-bg.webp";
import instagramLogo from "../_assets/instagram-circle.svg?url";
import telegramLogoBG from "../_assets/socmed-bg.svg?url";
import telegramLogo from "../_assets/tele-logo.svg?url";

export default function Contacts() {
  return (
    <>
      <div className="bg-[#0F172A] text-center">
        <h1 className="text-white text-3xl p-10 bg-[#0F172A] font-serif">
          Contact Us
        </h1>
        <div className="flex flex-col gap-14 p-10 font-serif items-center justify-center text-[#402A10] md:flex md:flex-row flex-wrap">
          <Link
            href="https://t.me/pascaltheodores"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[312px] hover:scale-105 transition"
          >
            <div className="absolute top-[-10%] inset-0 flex flex-col justify-center">
              <p className="text-2xl font-serif italic z-[5] bg-black/80 text-transparent text-shadow-[1px_2px_4px_#9C7A61] bg-clip-text">
                Telegram <br />
              </p>
              <p className="-mt-1 font-sans z-[5] bg-black/80 text-transparent text-shadow-[1px_2px_4px_#9C7A61] bg-clip-text">
                @pascaltheodores
              </p>
            </div>
            <Image
              src={backgroundContacts}
              alt="Background"
              className="-z-100 shadow-lg shadow-[#D3AB87]/[56%]"
            />
            <Image
              src={telegramLogoBG}
              alt="Telegram Logo background"
              className="absolute top-[-40%] left-[-10%]"
            />
            <Image
              src={telegramLogo}
              alt="Telegram Logo"
              className="absolute top-[-30.5%] left-[-6.6%]"
            />
          </Link>
          <Link
            href="https://www.instagram.com/pintugtd"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[312px] hover:scale-105 transition"
          >
            <div className="absolute top-[-10%] inset-0 flex flex-col justify-center">
              <p className="text-2xl font-serif italic z-[5] bg-black/80 text-transparent text-shadow-[1px_2px_4px_#9C7A61] bg-clip-text">
                Instagram <br />
              </p>
              <p className="-mt-1 font-sans z-[5] bg-black/80 text-transparent text-shadow-[1px_2px_4px_#9C7A61] bg-clip-text">
                @pintugtd
              </p>
            </div>
            <Image
              src={backgroundContacts}
              alt="Background"
              className="-z-100 shadow-lg shadow-[#D3AB87]/[56%]"
            />
            <Image
              src={instagramLogo}
              alt="Instagram Logo"
              className="absolute top-[-40%] left-[-10%]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
