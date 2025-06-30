"use client";

import { useState } from "react";
import products from "../data/products";
import { useCart } from "../cartpro/CartContext";

export default function ViewAll() {
  const { cartItems, addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

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

  const modalTotal = selectedItem
    ? (parseFloat(selectedItem.price) * quantity).toFixed(2)
    : 0;

  return (
    <section className="px-6 md:px-20 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        All Vegetables
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-neutral-50 rounded-xl text-center shadow-md hover:scale-105 hover:border-green-500 transition-transform duration-300 flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="mx-auto h-28 w-28 object-contain mb-4"
            />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-3">₹{item.price}/kg</p>
            <button
              className="mt-auto bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              onClick={() => openModal(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
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
            <p className="text-gray-600 mb-1">
              Price: ₹{selectedItem.price}/kg
            </p>
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
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
