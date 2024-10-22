import React from "react";

import AboutCarousel from "./_components/about-carousel";
import Anthem from "./_components/anthem";
import Contacts from "./_components/contacts";
import FAQAccordion from "./_components/faq-accordion";

export default function AboutPage() {
  return (
    <div className="text-white sm:w-3/5 mx-auto">
      <h1 className="font-serif text-3xl text-center my-5 text-white">
        About PINTU GTD
      </h1>
      <AboutCarousel />
      <FAQAccordion className="px-7" />
      <Contacts />
      <Anthem />
    </div>
  );
}
