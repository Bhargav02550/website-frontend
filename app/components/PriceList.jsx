"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../cartpro/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function PriceList() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("Vegetables");
  const [products, setProducts] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const backendURL = process.env.NEXT_PUBLIC_API_URL;
  // Fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendURL}/getAllProducts`); // update URL if different
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  },);

  const filteredProducts = products
  .filter((p) =>
    p.category?.toLowerCase() === category.toLowerCase().slice(0, -1)
  )
  .slice(0, 8);


  const chunkedProducts = [filteredProducts.slice(0, 4), filteredProducts.slice(4, 8)];
  const currentProducts = chunkedProducts[slideIndex] || [];

  return (
    <section className="px-6 md:px-20 pb-10">
      {/* Category Tabs */}
      <h2 className="text-3xl font-bold text-center mb-6">Our Categories</h2>
      <div className="bg-green-50 p-4 rounded-xl flex justify-center space-x-6 mb-10">
        <button
          className={`flex flex-col items-center px-6 py-4 rounded-xl transition ${
            category === "Vegetables" ? "bg-white shadow border border-green-500" : ""
          }`}
          onClick={() => setCategory("Vegetables")}
        >
          <img src="/veg.png" className="w-12 h-12 mb-2" />
          <span className="font-medium">Vegetables</span>
        </button>
        <button
          className={`flex flex-col items-center px-6 py-4 rounded-xl transition ${
            category === "Fruits" ? "bg-white shadow border border-green-500" : ""
          }`}
          onClick={() => setCategory("Fruits")}
        >
          <img src="/fru.png" className="w-12 h-12 mb-2" />
          <span className="font-medium">Fruits</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{category}</h2>
        <Link
          href="/viewall"
          className="text-green-600 cursor-pointer font-medium"
        >
          View all
        </Link>
      </div>

      {/* Product Grid with Navigation */}
      <div className="relative">
        {slideIndex > 0 && (
          <button
            onClick={() => setSlideIndex(slideIndex - 1)}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
        )}
        {slideIndex < chunkedProducts.length - 1 && (
          <button
            onClick={() => setSlideIndex(slideIndex + 1)}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        )}
        <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-4 sm:gap-6 transition-all">
          {currentProducts.map((item) => (
            <ProductCard key={item._id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
