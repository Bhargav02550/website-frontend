'use client';

import { useCart } from '../cartpro/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    incrementQuantity,
  } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="px-4 md:px-20 py-8 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scroll">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-xl p-4 gap-4 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="min-w-[40px] text-center">{item.quantity} kg</span>
                  <button
                    onClick={() => incrementQuantity(item)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:underline text-xs sm:text-sm ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="mt-6 text-right border-t pt-4">
            <div className="text-lg font-semibold mb-3">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
