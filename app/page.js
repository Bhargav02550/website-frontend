import PriceList from "./components/PriceList";
import Features from "./components/Features";
import Bulk from "./components/Bulk";
import QualitySection from "./components/QualitySection";
import BulkBenefitsSection from "./components/BulkBenefitsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Stat from "./components/Stat";
import SustainabilitySection from "./components/SustainabilitySection";
import TestimonialCarousel from "./components/TestimonialCarousel";

export default function Home() {
  return (
    <main className="font-sans bg-white text-black">
      {/* <Sample/> */}
      <Bulk />
      <Stat/>
      <BulkBenefitsSection/>
      <QualitySection/>
      <PriceList />
      <SustainabilitySection/>
      <TestimonialCarousel/>
      <FaqSection/>
      <Footer/>
    </main>
  );
}
