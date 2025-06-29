"use client";
import { useState } from "react";
import Link from "next/link";
import products from '../data/products.json'

export default function PriceList() {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <section className="px-6 md:px-20 pb-10">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Price List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {displayedProducts.map((item) => (
          <div
            key={item.name}
            className="p-4 border border-neutral-50 rounded-xl text-center shadow-md hover:scale-105 hover:border-green-500 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="mx-auto object-contain mb-4 h-50 w-50"
            />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600">₹{item.price}/kg</p>
          </div>
        ))}
      </div>

      {products.length > 8 && (
        <div className="text-center mt-6">
          <Link
            href="/viewall"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}
