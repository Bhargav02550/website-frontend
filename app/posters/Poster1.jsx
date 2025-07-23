import React, { useState, useEffect } from "react";

const Poster1 = () => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setFlip((prev) => !prev);
    }, 2000);

    return () => clearInterval(flipInterval);
  }, []);

  const cards = [
    {
      img: "/direct.png",
      text1: "Direct Sourcing",
      text: "No middlemen for better pricing and peak freshness.",
    },
    {
      img: "/quality.png",
      text1: "Quality Control",
      text: "Strict grading and cold-chain support ensure premium quality.",
    },
    {
      img: "/dispatch.png",
      text1: "Smart Dispatch",
      text: "We use electric trucks and optimized routes with real-time tracking for on-time delivery.",
    },
    {
      img: "/delivery.png",
      text1: "Business Delivery",
      text: "Flexible time slots and payment terms to suit your needs.",
    },
  ];

  return (
    <div className="absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out opacity-100 flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="md:w-1/2 w-full h-[300px] md:h-[650px]">
        <img
          src="/pss1.png"
          alt="Supply Chain"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Cards Section */}
      <div
        className="w-full md:w-1/2 bg-green-50 bg-cover bg-center p-6 md:p-10 flex items-center justify-center"
        style={{ backgroundImage: "url('/ps2bg.png')" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {cards.map(({ img, text1, text }, i) => (
            <div key={i} className="perspective">
              <div
                className={`relative w-full h-[240px] transform-style preserve-3d transition duration-700 ${
                  flip ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-md flex flex-col items-center justify-between backface-hidden p-3 pt-5">
                  <div className="flex items-center justify-center">
                    <img
                      src={img}
                      alt={text1}
                      className="h-[153px] object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-gray-800 font-semibold text-lg text-center">{text1}</p>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-md flex items-center justify-center px-3 text-center backface-hidden rotate-y-180 p-4">
                  <p className="text-gray-800 font-medium text-sm">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Poster1;
