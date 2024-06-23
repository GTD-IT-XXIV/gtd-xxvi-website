import AboutCarousel from "./_components/about-carousel";
import Anthem from "./_components/anthem";
import Contacts from "./_components/contacts";
import FAQAccordion from "./_components/faq-accordion";

export default function AboutPage() {
  return (
    <div>
      <AboutCarousel />
      <FAQAccordion className="px-7" />
      <Contacts />
      <Anthem />
    </div>
  );
}
