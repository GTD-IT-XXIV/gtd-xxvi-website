import EmblaCarousel from "./_components/about-carousel";
import Anthem from "./_components/anthem";
import Contacts from "./_components/contacts";
import FAQ from "./_components/faq";

export default function AboutPage() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center my-5 text-white">About PINTU GTD</h1>
      <EmblaCarousel />
      <FAQ />
      <Contacts />
      <Anthem />
    </div>
  );
}
