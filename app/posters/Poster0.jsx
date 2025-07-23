"use client";

import React, { useEffect } from "react";

const Poster0 = ({ containerRef }) => {
  const slideHeight = 660;
  const sliderWidth = 400;
  const curveLeft = 60; 
  const curveRight = 70;  
  const images = ["/3.png", "/2.png", "/4.png"];

  const getWrappedIndex = (index) => (index + images.length) % images.length;

  const groups = images.map((_, i) => ({
    prev: images[getWrappedIndex(i - 1)],
    current: images[i],
    next: images[getWrappedIndex(i + 1)],
  }));

  const extendedGroups = [...groups, ...groups];

  // Auto-slide
  useEffect(() => {
    const totalSlides = groups.length;
    const slideDuration = 1500;
    const slideTransition = 800;

    const slideNext = () => {
      const container = containerRef.current;
      if (!container) return;

      container.indexRef = (container.indexRef || 0) + 1;
      container.style.transition = `transform ${slideTransition}ms ease-in-out`;
      container.style.transform = `translateY(-${
        container.indexRef * slideHeight
      }px)`;

      if (container.indexRef === totalSlides) {
        setTimeout(() => {
          container.style.transition = "none";
          container.style.transform = "translateY(0)";
          container.indexRef = 0;
        }, slideTransition);
      }
    };

    const interval = setInterval(slideNext, slideDuration);
    return () => clearInterval(interval);
  }, [containerRef]);

  return (
    <div
      className="hidden md:flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/1.jpg')`,
        height: "650px",
        width: "100%",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          clipPath: `path('M0,0 Q${curveLeft},${slideHeight / 2} 0,${slideHeight} L${sliderWidth},${slideHeight} Q${sliderWidth - curveRight},${slideHeight / 2} ${sliderWidth},0 Z')`,
          height: `${slideHeight}px`,
          width: `${sliderWidth}px`,
          marginLeft: "-270px",
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
                gap: "10px",
              }}
              className="flex flex-col"
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
  );
};

export default Poster0;
