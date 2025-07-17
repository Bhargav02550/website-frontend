"use client";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useToast();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleInput = (e) => {
  const val = e.target.value;

  // Allow empty string so user can type freely
  if (val === "") {
    setQuantity("");
    return;
  }

  const num = parseInt(val);
  if (!isNaN(num) && num >= 1) {
    setQuantity(num);
  }
};


  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
    setQuantity(1);
    showToast("Item added to cart", "success");
  };

  return (
    <div
      className="bg-white rounded-2xl shadow p-4 text-center flex flex-col justify-between h-full
      border border-transparent hover:border-green-500 hover:scale-[1.01] hover:shadow-lg
      focus-within:border-green-500 focus-within:scale-[1.01] focus-within:shadow-lg
      transition-all duration-200 ease-in-out
      w-full max-w-[calc(100vw-20px)] sm:max-w-xs mx-auto"
    >
      {/* Product Image */}
      <div className="flex justify-center items-center w-full h-28 mb-2">
        <img
          src={item.image?.url}
          alt={item.name}
          className="w-28 h-28 object-contain"
        />
      </div>

      {/* Name & Price */}
      <div className="flex justify-between items-center w-full px-2 mt-1">
        <h3 className="font-bold text-sm truncate max-w-[65%]">{item.name}</h3>
        <p className="text-sm text-gray-700 font-semibold whitespace-nowrap">
          ₹{item.price}/Kg
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center text-xs text-gray-600 mt-1">
        <span className="text-yellow-400 mr-1">★★★★☆</span>
        <span className="text-[11px]">(88 reviews)</span>
      </div>

      
      {/* Quantity + Add Button */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 w-full max-w-full mx-auto"
      >
        {/* Quantity Controls */}
        <div className="flex items-center space-x-1 text-xs sm:text-sm justify-center sm:justify-start">
          <button
            onClick={decrement}
            className="border border-gray-300 px-2 py-1 rounded text-gray-700 font-bold text-xs sm:text-sm"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleInput}
            onBlur={() => {
              if (!quantity || quantity < 1) setQuantity(1);
            }}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
            className="w-10 text-center focus:outline-none no-spinner font-bold text-xs sm:text-sm"
          />

          <button
            onClick={increment}
            className="border border-gray-300 px-2 py-1 rounded text-gray-700 font-bold text-xs sm:text-sm"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white font-medium
          px-3 py-1.5 rounded text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto"
        >
          Add to cart
        </button>
      </div>

    </div>
  );
}
