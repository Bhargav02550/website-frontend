import PriceList from "./components/PriceList";
import Features from "./components/Features";
import Bulk from "./components/Bulk";
import Sample from './components/sample'

export default function Home() {
  return (
    <main className="font-sans bg-white text-black">
      {/* <Sample/> */}
      <Bulk />
      <PriceList />
      <Features />
    </main>
  );
}
