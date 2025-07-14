import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const { showToast} = useToast();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) setQuantity(val);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
    setQuantity(1);
    showToast('Item added to cart','success');
  };

  return (
    <div
      className="bg-white rounded-2xl shadow p-4 w-full max-w-xs text-center flex flex-col justify-between h-full
      border border-transparent hover:border-green-500 hover:scale-[1.01] hover:shadow-lg
      focus-within:border-green-500 focus-within:scale-[1.01] focus-within:shadow-lg
      transition-all duration-200 ease-in-out"
    >

      {/* Product Image */}
      <div className="flex justify-center items-center w-full h-28 mb-2">
        <img
          src={item.image?.url}
          alt={item.name}
          className="w-28 h-28 object-contain"
        />
      </div>

      {/* Name & Price in one line */}
      <div className="flex justify-between items-center w-full px-2 mt-1">
        <h3 className="font-bold text-sm truncate max-w-[65%]">{item.name}</h3>
        <p className="text-sm text-gray-700 font-semibold whitespace-nowrap">
          ₹{item.price}/Kg
        </p>
      </div>

      {/* Rating - smaller reviews text */}
      <div className="flex items-center justify-center text-xs text-gray-600 mt-1">
        <span className="text-yellow-400 mr-1">★★★★☆</span>
        <span className="text-[11px]">(88 reviews)</span>
      </div>

      {/* Quantity + Add Button */}
      <div className="flex items-center justify-between mt-3 gap-2 w-full max-w-[200px] mx-auto">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-1 text-sm">
          <button
            onClick={decrement}
            className="border border-gray-300 px-2 py-1 rounded text-gray-700 font-bold"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleInput}
            className="w-8 text-center focus:outline-none no-spinner font-bold"
          />
          <button
            onClick={increment}
            className="border border-gray-300 px-2 py-1 rounded text-gray-700 font-bold"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-medium px-3 py-1.5 rounded text-sm"
        >
          <span className="block sm:hidden">Add</span>
          <span className="hidden sm:block">Add to cart</span>
        </button>
      </div>
 </div>
);
}