"use client";

import { useCart } from "../cartpro/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    incrementQuantity,
  } = useCart();
  const router = useRouter();

  // Price calculation removed for now
  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + parseFloat(item.price) * item.quantity,
  //   0
  // );

  const handleQuantityInput = (e, item) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      addToCart({ ...item, quantity: value });
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your Cart
          </h1>
          <p className="text-gray-600 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-600 font-medium">
              Your cart is empty
            </p>
            <p className="text-gray-500 mt-2">Add some items to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Cart Items
                  </h2>

                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    <style jsx>{`
                      div::-webkit-scrollbar {
                        width: 6px;
                      }
                      div::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 3px;
                      }
                      div::-webkit-scrollbar-thumb {
                        background: #c1c1c1;
                        border-radius: 3px;
                      }
                      div::-webkit-scrollbar-thumb:hover {
                        background: #a1a1a1;
                      }
                    `}</style>

                    {cartItems.map((item, index) => (
                      <div
                        key={item.name}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors ${
                          index !== cartItems.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={item.image.url}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Weight: {item.quantity} kg
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                            <button
                              onClick={() => decreaseQuantity(item)}
                              className="w-8 h-8 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
                            >
                              <span className="text-gray-600 font-medium">
                                -
                              </span>
                            </button>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={item.quantity}
                              onChange={(e) => handleQuantityInput(e, item)}
                              className="w-12 text-center border-0 bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                            />
                            <span className="text-xs text-gray-500">kg</span>
                            <button
                              onClick={() => incrementQuantity(item)}
                              className="w-8 h-8 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
                            >
                              <span className="text-gray-600 font-medium">
                                +
                              </span>
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Sticky on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-medium">{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Weight</span>
                      <span className="font-medium">
                        {cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}{" "}
                        kg
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    onClick={handleCheckout}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Proceed to Checkout
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Secure checkout with SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
    
  );
}
