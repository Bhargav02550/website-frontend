"use client";

import React from "react";

const stats = [
  { value: "120+", label: "Partners rely on us" },
  { value: "1.2 Lakh+", label: "Orders processed" },
  { value: "1.3 Crore+", label: "Successful deliveries" },
  { value: "650+", label: "Trusted seller brands" },
];

const Stat = () => {
  return (
    <div
      className="bg-white py-10 px-6 rounded-xl overflow-x-auto"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04), 0 6px 12px rgba(0, 0, 0, 0.08)", // subtle top, stronger bottom/sides
      }}
    >
      <div className="min-w-max flex items-center justify-start gap-6 sm:justify-between max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center text-center text-xs sm:text-sm">
              <h3 className="text-green-600 font-bold text-base sm:text-lg">
                {stat.value}
              </h3>
              <p className="text-gray-600 mt-1 leading-tight whitespace-nowrap">
                {stat.label}
              </p>
            </div>

            {/* Divider between stats */}
            {index < stats.length - 1 && (
              <div className="h-10 w-px bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stat;
