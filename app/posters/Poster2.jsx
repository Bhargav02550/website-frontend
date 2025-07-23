import React from "react";

const Poster2 = () => {
  return (
    <div className="absolute inset-0 px-8 py-10 flex flex-col overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/ps3bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Gradient Overlay Layer */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14, 56, 122, 0.7) 10%, rgba(224, 241, 253, 0.8) 90%)",
        }}
      ></div>

      {/* Top Matter */}
      <div className="relative z-20 text-center text-white mb-10">
        <h2 className="text-3xl md:text-4xl font-800 mt-6 mb-6">
          Growing Together .<span className="text-white">Profiting Together.</span>
        </h2>
        <p className="text-md md:text-lg mb-6">
          An Ecosystem Built for Farmers, Businesses, and Our Community.
        </p>
        <button className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 cursor-pointer rounded transition-all duration-200">
          Discover Our Impact
        </button>
      </div>

      {/* Cards (moved up 80px) */}
      <div className="relative z-20 flex flex-col md:flex-row gap-5 items-center justify-center mb-8">
        {["/farmer.jpg", "/business.jpg", "/community.jpg"].map((src, i) => (
          <div
            key={i}
            className="bg-black/60 rounded-xl text-white p-5 w-[305px] h-[310px] bg-cover bg-center flex flex-col justify-start transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${src})`,
              backgroundBlendMode: "multiply",
            }}
          >
            <h3 className="text-xl font-semibold mb-2">
              {["For Our Farmers", "For Our Business Partners", "For Our Community"][i]}
            </h3>
            <p className="text-lg">
              {[
                "20-30% Higher Profits & No Waste",
                "Up to 30% Savings & Reliable Supply",
                "Access to Fresher, Healthier, Trustworthy Food",
              ][i]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poster2;
