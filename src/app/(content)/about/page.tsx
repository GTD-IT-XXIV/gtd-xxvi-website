import AboutCarousel from "./_components/about-carousel";
import Anthem from "./_components/anthem";
import Contacts from "./_components/contacts";
import FAQ from "./_components/faq";

export default function AboutPage() {
  return (
    <div>
      <AboutCarousel />
      <FAQ />
      <Contacts />
      <Anthem />
    </div>
  );
}
