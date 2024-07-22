import { Link } from "@react-email/components";
import Image from "next/image";
import { type HTMLAttributes, Suspense } from "react";

import GTDButton from "@/app/_components/gtd-button";

import { cn } from "@/lib/utils";

import staticLectern from "../_assets/wizard-book-stands-static.webp";
import StorylineLectern from "./storyline-lectern";
import StorylineTextPath from "./storyline-text-path";
import VideoFrame from "./video-frame";

const story = [
  "In a realm where honor and legacy intertwine, a tradition of champions emerges every decade.",
  "As the torch of tradition passes to a new generation, the quest for glory reignites.",
  "An epic battle of honor and skill awaits. Who will rise as the ultimate champion?",
];

const trailerUrl =
  "https://www.youtube.com/embed/QA05V4OW2jo?si=iIz5ob7kM6bk4Jv-";

export default function Storyline({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "relative z-0 w-full bg-gradient-to-b from-slate-900 from-70% to-black text-white",
        className,
      )}
      {...props}
    >
      <StorylineTextPath duration="120s" className="-z-10 inset-0" />
      <div className="absolute inset-x-0 top-[10%]">
        <div className="w-full flex">
          <div className="w-1/2 aspect-[3/4]">
            <Suspense
              fallback={
                <Image
                  src={staticLectern}
                  alt="Wizard book lectern"
                  className="-mt-6 brightness-75"
                />
              }
            >
              <StorylineLectern />
            </Suspense>
          </div>
          <div className="basis-1/2 grow self-center pb-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 lg:mb-6">
              STORYLINE
            </h2>
            <p className="pr-6 md:pr-10 lg:pr-14 font-extralight md:text-lg/relaxed lg:text-xl/relaxed">
              {story[0]}
            </p>
            <p className="hidden sm:block mt-4 pr-6 md:pr-10 lg:pr-14 font-extralight md:text-lg/relaxed lg:text-xl/relaxed">
              {story[1]}
            </p>
          </div>
        </div>
        <div className="mx-auto relative z-0 w-[95%] sm:w-4/5 shadow-lg shadow-[#816463]/50">
          <VideoFrame />
          {/* Placeholder for trailer video
          <div className="absolute top-[6.25%] left-[4.25%] h-[86%] w-auto aspect-video grid place-content-center bg-gtd-secondary-30">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl">
              Trailer Coming Soon!
            </p>
          </div>*/}
          <iframe
            src={trailerUrl}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="border-0 absolute top-[6.25%] left-[4.25%] h-[86%] w-auto aspect-video"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 top-[78%]">
        <div className="mx-auto w-4/5">
          <p className="text-center font-serif text-xl md:text-2xl lg:text-3xl sm:px-2 drop-shadow-[0_4px_3px_rgba(163,103,103,0.62)]">
            {story[2]}
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[3%] flex justify-center">
        <Link href="/events" target="_self">
          <GTDButton
            id="gtd-learn-more-button"
            data-umami-event="gtd-learn-more-button"
          >
            Learn More
          </GTDButton>
        </Link>
      </div>
    </section>
  );
}
