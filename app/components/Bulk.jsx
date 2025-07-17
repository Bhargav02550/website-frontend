"use client";

import React, { useEffect, useRef, useState } from "react";

const images = ["/3.png", "/2.png", "/4.png"];

const HomePage = () => {
  const slideHeight = 650;
  const sliderWidth = 400;

  const getWrappedIndex = (index) => (index + images.length) % images.length;

  const groups = images.map((_, i) => ({
    prev: images[getWrappedIndex(i - 1)],
    current: images[i],
    next: images[getWrappedIndex(i + 1)],
  }));

  const extendedGroups = [...groups, ...groups];

  const containerRef = useRef(null);
  const indexRef = useRef(0);

  // Desktop vertical scroll effect
  useEffect(() => {
    const totalSlides = groups.length;
    const slideDuration = 2800;
    const slideTransition = 800;

    function slideNext() {
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
    }

    const intervalId = setInterval(slideNext, slideDuration);

    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = "translateY(0)";
      indexRef.current = 0;
    }

    return () => clearInterval(intervalId);
  }, [groups.length, slideHeight]);

  // Mobile slider
  const mobileSliderRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Auto-scroll on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Scroll effect when index changes
  useEffect(() => {
    const slider = mobileSliderRef.current;
    if (!slider) return;

    const offset = mobileIndex * window.innerWidth;
    slider.scrollTo({ left: offset, behavior: "smooth" });
  }, [mobileIndex]);

  return (
    <>
      {/* Desktop View */}
      <div
        className="hidden md:flex h-[650px] bg-cover bg-center items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('/1.jpg')` }}
      >
        <div
          className="overflow-hidden"
          style={{
            clipPath: `path('M0,0 Q50,325 0,650 L${sliderWidth},650 Q${sliderWidth - 70},325 ${sliderWidth},0 Z')`,
            height: `${slideHeight}px`,
            width: `${sliderWidth}px`,
            marginLeft: "-500px",
          }}
        >
          <div
            ref={containerRef}
            style={{
              display: "flex",
              flexDirection: "column",
              willChange: "transform",
            }}
          >
            {extendedGroups.map(({ prev, current, next }, idx) => (
              <div
                key={idx}
                style={{
                  height: `${slideHeight}px`,
                  width: `${sliderWidth}px`,
                }}
                className="flex flex-col space-y-3"
              >
                <div className="h-[130px] w-full overflow-hidden">
                  <img
                    src={prev}
                    alt={`Prev ${idx}`}
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
                <div className="h-[380px] w-full overflow-hidden">
                  <img
                    src={current}
                    alt={`Current ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[130px] w-full overflow-hidden">
                  <img
                    src={next}
                    alt={`Next ${idx}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden mt-0.5 h-[470px] overflow-x-hidden">
        <div
          ref={mobileSliderRef}
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-[450px]">
              <img
                src={src}
                alt={`Image ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-2 space-x-2">
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
