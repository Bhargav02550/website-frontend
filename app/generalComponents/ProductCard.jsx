"use client";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Eye,
} from "@phosphor-icons/react";
import axios from "axios";

export default function ProductCard({
  item,
  onAddToCart,
  webapp,
  setShowLogin,
  onQuickView,
  cartItems,
  incrementQuantity,
  decreaseQuantity,
  updateQuantity,
  removeFromCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { showToast } = useToast();
  const { isAuthenticated, logout } = useAuth();
  const backendURL = process.env.NEXT_PUBLIC_API_URL;

  // Cart info
  const cartItem = cartItems?.find((c) => c._id === item._id);
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  // Stock checks
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;

  // Helpers
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);

  const getDiscountPercentage = () =>
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100
        )
      : 0;

  // Close login popup if authenticated
  useEffect(() => {
    if (isAuthenticated && typeof setShowLogin === "function") {
      setShowLogin(false);
    }
  }, [isAuthenticated, setShowLogin]);

  const toggleWishlist = async () => {
    if (!isAuthenticated) return setShowLogin?.(true);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) return setShowLogin?.(true);

    setIsLoading(true);
    try {
      await onAddToCart({ ...item, quantity });
      setQuantity(1);
      showToast(`${item.name} added to cart (${quantity} kg)`, "success");
    } catch {
      showToast("Failed to add item to cart", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const [inputQty, setInputQty] = useState(cartQuantity);

  // keep input in sync when cartQuantity changes externally
  useEffect(() => {
    setInputQty(cartQuantity);
  }, [cartQuantity]);

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-green-300 
  p-3 sm:p-4 text-center flex flex-col justify-between h-full transition-all duration-200 w-full"
    >
      {/* Top Row: Discount & Wishlist */}
      <div className="absolute inset-x-0 top-0 p-2 sm:p-3 flex justify-between items-start z-10">
        {getDiscountPercentage() > 0 && (
          <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            -{getDiscountPercentage()}%
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative flex justify-center items-center w-full h-24 sm:h-28 mb-2 sm:mb-3 mt-6">
        {!imageLoaded && !imageError && (
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        )}

        {imageError ? (
          <div className="text-gray-400 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg mx-auto mb-1 flex items-center justify-center">
              📦
            </div>
            <span className="text-[10px] sm:text-xs">No image</span>
          </div>
        ) : (
          <img
            src={item.image?.url || "/placeholder-product.png"}
            alt={item.name}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isOutOfStock ? "grayscale opacity-50" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-1 sm:space-y-2 flex flex-col items-start">
        <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 leading-tight text-left">
          {item.name}
        </h3>
        <span className="text-gray-500 text-xs font-light">1Kg</span>
        <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          {/* {cartQuantity > 0 && (
            <div className="text-[10px] sm:text-xs text-right">
              <div className="text-gray-600">In cart: {cartQuantity}kg</div>
              <div className="font-semibold text-green-600">
                {formatPrice(item.price * cartQuantity)}
              </div>
            </div>
          )} */}
        </div>

        {/* Stock Status */}
        {isOutOfStock && (
          <div className="text-[10px] sm:text-xs text-red-500 font-medium">
            Out of Stock
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="text-[10px] sm:text-xs text-orange-500 font-medium">
            Only {item.stock} left
          </div>
        )}
      </div>

      {/* Actions */}
      {webapp && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 flex flex-row w-full justify-between items-center">
          <div>
            <span className="text-sm">{formatPrice(item.price)}</span>
            {/* <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5 sm:ml-1">
              /kg
            </span> */}
            {item.originalPrice && item.originalPrice > item.price && (
              <div className="text-[10px] sm:text-xs text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </div>
            )}
          </div>
          {!isInCart ? (
            // ADD button
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isLoading}
              className={`w-[66px] py-1.5 sm:py-2 rounded text-[12px] sm:text-sm font-medium transition-colors border cursor-pointer
              ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                  : isLoading
                  ? "bg-green-400 text-white border-green-400"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >
              {isLoading ? "Adding..." : isOutOfStock ? "Out of Stock" : "ADD"}
            </button>
          ) : (
            // Quantity state
            <div className="flex items-center w-[66px] h-[32px] sm:h-[36px] bg-green-600 text-white rounded overflow-hidden">
              {/* Left (Decrease) */}
              <button
                onClick={() => decreaseQuantity(item)}
                className="flex-1 h-full text-sm font-bold hover:bg-green-700"
              >
                -
              </button>

              {/* Middle (Qty) */}
              <span className="px-1 text-sm font-semibold">{cartQuantity}</span>

              {/* Right (Increase) */}
              <button
                onClick={() => incrementQuantity(item)}
                disabled={item.stock && cartQuantity >= item.stock}
                className="flex-1 h-full text-sm font-bold hover:bg-green-700 disabled:opacity-50"
              >
                +
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
