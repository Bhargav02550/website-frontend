"use client";

import React from "react";

const stats = [
  { value: "50+", label: "Partners rely on us" },
  { value: "50+", label: "Orders processed" },
  { value: "100+", label: "Successful deliveries" },
  { value: "10+", label: "Trusted seller brands" },
];

const Stat = () => {
  return (
    <div className="bg-white py-6 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg max-w-5xl mx-auto overflow-x-auto">
        <div className="min-w-max flex items-center justify-start gap-6 sm:justify-between">
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

              {index < stats.length - 1 && (
                <div className="h-10 w-px bg-gray-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stat;
