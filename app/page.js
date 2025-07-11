import PriceList from "./components/PriceList";
import Features from "./components/Features";
import Bulk from "./components/Bulk";
import Sample from './components/sample'
import QualitySection from "./components/QualitySection";
import BulkBenefitsSection from "./components/BulkBenefitsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="font-sans bg-white text-black">
      {/* <Sample/> */}
      <Bulk />
      <QualitySection/>
      <PriceList />
      <BulkBenefitsSection/>
      <FaqSection/>
      <Footer/>
    </main>
  );
}
