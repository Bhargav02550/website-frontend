import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: lucide icons

export default function Bulk() {
  return (
    <section className="relative bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Bulk Vegetables<br />at Wholesale Prices
          </h1>
          <p className="text-gray-700 mb-6 text-base">
            Delivering farm-fresh vegetables in bulk to PGs, hostels, hotels, and canteens—
            quality you can trust, prices you'll love.
          </p>
          <Link href='/bulkorders'>
            <button className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded text-lg cursor-pointer">
              PLACE BULK ORDER
            </button>
          </Link>
        </div>

        <img
          src="/basket.png"
          alt="Vegetable Basket"
          className="w-80 h-auto mb-6 md:mb-0"
        />


        <button className="absolute left-4 top-[30%] md:top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2">
        <ChevronLeft />
      </button>
      <button className="absolute right-4 top-[30%] md:top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2">
        <ChevronRight />
      </button>

      </div>

 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-20 pb-12">
        {[
          { title: "120+", subtitle: "Partners rely on us" },
          { title: "1.2 Lakh+", subtitle: "partners rely on us" },
          { title: "1.3 Crore+", subtitle: "successful orders completed" },
          { title: "650+", subtitle: "trusted seller brands onboard" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg text-center py-6 px-4 transform transition hover:-translate-y-1 hover:shadow-2xl"

          >
            <h2 className="text-2xl font-semibold text-black">{item.title}</h2>
            <p className="text-gray-500 text-sm">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
