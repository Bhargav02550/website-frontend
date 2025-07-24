"use client";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import axios from "axios";

export default function ProductCard({ item, onAddToCart, webapp, setShowLogin }) {
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useToast();
  const { isAuthenticated , logout, Get_Wishlist } = useAuth();
  const backendURL = process.env.NEXT_PUBLIC_API_URL;
  const [isWishlisted, setIsWishlisted] = useState(false)

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  useEffect(() => {
    if (isAuthenticated && typeof setShowLogin === "function") {
      setShowLogin(false);
    }
  }, [isAuthenticated, setShowLogin]);

  // Check if item is already in wishlist on component mount
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        if (!isAuthenticated) return;

        const data = await Get_Wishlist();

        const wishlist = data || [];
        const found = wishlist.find((p) => p._id === item._id);
        if (found) setIsWishlisted(true);
      } catch (err) {
        if(err.status === 500) logout();
        console.error("Failed to check wishlist", err);
      }
    };

    checkWishlist();
  }, [isAuthenticated, item._id]);

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    try {
      let token = localStorage.getItem("token");
      if(token) token = JSON.parse(token);
      const res = await axios.post(`${backendURL}/togglewish`, {
        token,
        productId: item._id,
      });

      await Get_Wishlist();
      const { status } = res.data;
      if (status === "added") {
        setIsWishlisted(true);
        showToast("Added to wishlist", "success");
      } else if (status === "removed") {
        setIsWishlisted(false);
        showToast("Removed from wishlist", "info");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
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

      {/* Quantity + Add Button */}
      {webapp ? (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 w-full max-w-full mx-auto"
        >
          <div className="flex justify-center mt-2">
            <Heart
              onClick={toggleWishlist}
              className={`w-5 h-5 cursor-pointer transition-all duration-300
                ${isWishlisted ? "text-red-500 scale-125" : "text-gray-400 scale-100"}`}
            />
          </div>
          {/* Quantity Controls */}
          {/* <div className="flex items-center space-x-1 text-xs sm:text-sm justify-center sm:justify-start">
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
          </div> */}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-[#2E7D32] cursor-pointer hover:bg-green-700 text-white font-medium
              px-3 py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto"
          >
            Add to cart
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
