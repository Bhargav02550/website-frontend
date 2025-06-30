"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import products from "../data/products.json";
import { useCart } from "../cartpro/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PriceList() {
  const { addToCart, cartItems } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLogin , setIsLogin] = useState(false);

  const openModal = (item) => {
    const inCart = cartItems.find((i) => i.id === item.id);
    setSelectedItem(item);
    setQuantity(inCart ? inCart.quantity : 1);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({ ...selectedItem, quantity });
      setShowModal(false);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        setIsLogin(!!token);
      }
    }, []);

  const modalTotal = selectedItem
    ? (parseFloat(selectedItem.price) * quantity).toFixed(2)
    : 0;

  const chunkedProducts = [products.slice(0, 4), products.slice(4, 8)];

  return (
    <section className="px-6 md:px-20 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Price List</h2>
        <Link
          href="/viewall"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          View All
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        {slideIndex > 0 && (
          <button
            onClick={() => setSlideIndex(slideIndex - 1)}
            className="absolute left-0 top-1/2 cursor-pointer -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
        )}

        {/* Slide Content */}
        <div className="p-2 overflow-hidden ">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {chunkedProducts.map((group, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full flex-shrink-0"
              >
                {group.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 border border-gray-100 rounded-xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:scale-105 hover:shadow-[0_4px_12px_2px_rgba(0,0,0,0.12)] hover:border-green-500 transition-all duration-300 flex flex-col justify-between bg-white"

                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="mx-auto object-contain mb-4 h-32 w-32"
                    />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">₹{item.price}/kg</p>
                    <button
                      onClick={() => isLogin ? openModal(item) : ""}
                      className={`bg-green-600 text-white ${isLogin ? "cursor-pointer" : "cursor-not-allowed"} px-4 py-2 rounded hover:bg-green-700 transition`}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {slideIndex < chunkedProducts.length - 1 && (
          <button
            onClick={() => setSlideIndex(slideIndex + 1)}
            className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="mx-auto h-28 w-28 object-contain mb-4"
            />
            <h3 className="text-xl font-bold mb-1">{selectedItem.name}</h3>
            <p className="text-gray-600 mb-1">Price: ₹{selectedItem.price}/kg</p>
            <p className="text-gray-800 font-medium mb-4">
              Total: ₹{modalTotal}
            </p>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                className="px-3 py-1 bg-gray-200 rounded text-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                className="w-20 text-center border rounded px-2 py-1 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                className="px-3 py-1 bg-gray-200 rounded text-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 cursor-pointer px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700"
                onClick={handleAddToCart}
              >
                Add {quantity}kg
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
