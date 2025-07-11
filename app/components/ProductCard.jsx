import { useState } from "react";

export default function ProductCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) setQuantity(val);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
    setQuantity(1);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow p-4 w-full max-w-xs text-center flex flex-col items-center space-y-2 
      border border-transparent hover:border-green-500 
      transition-[transform,box-shadow,border-color] duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg"
    >
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white text-green-600 text-lg font-semibold px-6 py-3 rounded-xl shadow-lg border border-green-400 z-50">
          ✅ Item added to cart
        </div>
      )}

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-32 h-32 object-contain"
      />

      {/* Name & Price */}
      <div className="flex justify-between items-center w-full px-2 mt-2">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="font-semibold text-gray-700">₹{item.price}/Kg</p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-start w-full px-2 text-sm text-gray-600">
        <span className="text-yellow-400 mr-1">★★★★☆</span>
        <span>(88 reviews)</span>
      </div>

      {/* Quantity + Add Button */}
      <div className="flex items-center justify-between w-full mt-2 space-x-2">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-1 text-sm sm:text-base">
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

        {/* Responsive Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-2 sm:px-3 py-1.5 rounded text-sm whitespace-nowrap"
        >
          <span className="block sm:hidden">Add</span> {/* Mobile */}
          <span className="hidden sm:block">Add to cart</span> {/* Desktop */}
        </button>
      </div>
    </div>
  );
}
