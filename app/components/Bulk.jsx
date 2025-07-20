"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/3.png", "/2.png", "/4.png"];
const posters = ["/1.jpg"];

const HomePage = () => {
  const slideHeight = 600;
  const sliderWidth = 400;

  const [flipCards, setFlipCards] = useState(false);
  const getWrappedIndex = (index) => (index + images.length) % images.length;

  const groups = images.map((_, i) => ({
    prev: images[getWrappedIndex(i - 1)],
    current: images[i],
    next: images[getWrappedIndex(i + 1)],
  }));

  const extendedGroups = [...groups, ...groups];
  const containerRef = useRef(null);
  const indexRef = useRef(0);
  const [posterIndex, setPosterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosterIndex((prev) => (prev + 1) % 3);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (posterIndex !== 0) return;

    const totalSlides = groups.length;
    const slideDuration = 1500;
    const slideTransition = 800;

    const slideNext = () => {
      const container = containerRef.current;
      if (!container) return;

      indexRef.current += 1;
      container.style.transition = `transform ${slideTransition}ms ease-in-out`;
      container.style.transform = `translateY(-${indexRef.current * slideHeight}px)`;

      if (indexRef.current === totalSlides) {
        setTimeout(() => {
          container.style.transition = "none";
          container.style.transform = "translateY(0)";
          indexRef.current = 0;
        }, slideTransition);
      }
    };

    const interval = setInterval(slideNext, slideDuration);

    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = "translateY(0)";
      indexRef.current = 0;
    }

    return () => clearInterval(interval);
  }, [posterIndex]);

  const handlePrevPoster = () => {
    setPosterIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNextPoster = () => {
    setPosterIndex((prev) => (prev + 1) % 3);
  };

  const mobileSliderRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slider = mobileSliderRef.current;
    if (!slider) return;

    const offset = mobileIndex * window.innerWidth;
    slider.scrollTo({ left: offset, behavior: "smooth" });
  }, [mobileIndex]);

  useEffect(() => {
  let flipInterval;

  if (posterIndex === 1) {
    flipInterval = setInterval(() => {
      setFlipCards((prev) => !prev);
    }, 2000);
  } else {
    setFlipCards(false);
  }

  return () => clearInterval(flipInterval);
}, [posterIndex]);


  return (
    <>
      <div className="hidden md:flex min-h-screen items-center justify-center overflow-hidden relative">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            posterIndex === 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${posters[0]})` }}
        />

        {posterIndex === 1 && (
          <div className="absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out opacity-100 flex flex-col md:flex-row">
            <div className="md:w-1/2 w-full h-[300px] md:h-[650px]">
              <img
                src="/pss1.png"
                alt="Supply Chain"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="w-full md:w-1/2 bg-green-50 bg-cover bg-center p-6 md:p-10 flex items-center justify-center"
              style={{ backgroundImage: "url('/ps2bg.png')" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
                {[
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
                ].map(({ img, text1, text }, i) => (
                  <div key={i} className="perspective">
                    <div
                      className={`relative w-full h-[240px] transform-style preserve-3d transition duration-700 ${
                        flipCards ? "rotate-y-180" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-white rounded-2xl shadow-md flex flex-col items-center justify-between backface-hidden p-3 pt-5">
                        <div className="flex items-center justify-center">
                          <img src={img} alt={text1} className="h-[153px] object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-gray-800 font-semibold text-lg text-center">{text1}</p>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-white rounded-2xl shadow-md flex items-center justify-center px-3 text-center backface-hidden rotate-y-180 p-4">
                        <p className="text-gray-800 font-medium text-sm">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {posterIndex === 2 && (
        <div className="absolute inset-0 px-8 py-10 flex flex-col justify-between overflow-hidden">
          {/* Background Image Layer */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/ps3bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Gradient Overlay Layer */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(14, 56, 122, 0.7) 10%, rgba(224, 241, 253, 0.8) 90%)",
            }}
          ></div>

          {/* Top Matter (Heading, Subtext, Button) */}
          <div className="relative z-20 text-center text-white mb-10">
            <h2 className="text-3xl md:text-4xl font-800 mt-6 mb-6">Growing Together .<span className="text-white">Profiting Together.</span></h2>
            <p className="text-md md:text-lg mb-6">An Ecosystem Built for Farmers, Businesses, and Our Community.</p>
            <button className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 cursor-pointer rounded transition-all duration-200">
              Discover Our Impact
            </button>
          </div>

          {/* Cards */}
          <div className="relative z-20 flex flex-col md:flex-row gap-5 items-center justify-center mt-[-10px] mb-8">
            {["/farmer.jpg", "/business.jpg", "/community.jpg"].map((src, i) => (
              <div
              key={i}
              className="bg-black/60 rounded-xl text-white p-5 w-[330px] h-[300px] bg-cover bg-center flex flex-col justify-start transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${src})`,
                backgroundBlendMode: 'multiply',
              }}
            >
              <h3 className="text-xl font-semibold mb-2">
                {[
                  "For Our Farmers",
                  "For Our Business Partners",
                  "For Our Community"
                ][i]}
              </h3>
              <p className="text-lg">
                {[
                  "20-30% Higher Profits & No Waste",
                  "Up to 30% Savings & Reliable Supply",
                  "Access to Fresher, Healthier, Trustworthy Food"
                ][i]}
              </p>
            </div>

            ))}
          </div>
    </div>


        )}

        <button
          onClick={handlePrevPoster}
          className="absolute left-8 top-1/2 cursor-pointer transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white z-20"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNextPoster}
          className="absolute right-8 top-1/2 cursor-pointer transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white z-20"
        >
          <ChevronRight size={28} />
        </button>

        {posterIndex === 0 && (
          <div
            className="overflow-hidden"
            style={{
              clipPath:
                "path('M0,0 Q50,325 0,650 L400,650 Q330,325 400,0 Z')",
              height: `${slideHeight}px`,
              width: `${sliderWidth}px`,
              marginLeft: "-500px",
            }}
          >
            <div
              ref={containerRef}
              style={{ display: "flex", flexDirection: "column", willChange: "transform" }}
            >
              {extendedGroups.map(({ prev, current, next }, idx) => (
                <div
                  key={idx}
                  style={{ height: `${slideHeight}px`, width: `${sliderWidth}px` }}
                  className="flex flex-col space-y-3"
                >
                  <div className="h-[130px] w-full overflow-hidden">
                    <img src={prev} alt={`Prev ${idx}`} className="w-full h-full object-cover object-bottom" />
                  </div>
                  <div className="h-[380px] w-full overflow-hidden">
                    <img src={current} alt={`Current ${idx}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[130px] w-full overflow-hidden">
                    <img src={next} alt={`Next ${idx}`} className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden h-[490px] overflow-x-hidden">
        <div
          ref={mobileSliderRef}
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-[450px]">
              <img src={src} alt={`Image ${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5 space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setMobileIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                mobileIndex === i ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
