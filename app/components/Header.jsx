"use client";
import Image from "next/image";
import Link from "next/link";
import LoginCard from "../components/LoginCard";
import React, { useEffect, useState } from "react";
import Address from "./Address";
import { useRouter } from "next/navigation";
import { useCart } from '../cartpro/CartContext';


export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [location, setLocation] = useState("");
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searchpro?query=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("user-location");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocation(formatLocation(parsed));
      } catch (e) {
        console.error("Invalid location data:", e);
      }
    }
  }, []);

  const formatLocation = (locObj) => {
    if (!locObj) return "";
    const { city, state } = locObj;
    return [city, state].filter(Boolean).join(", ");
  };

  return (
    <>
      <nav className="h-20 bg-white/20 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full border-b border-gray-200 transition duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-P.png"
              alt="Go-Vigi Logo"
              width={40}
              height={40}
              className="h-11 w-11 object-contain"
            />
            <span className="text-2xl font-bold text-green-600">Go-vigi</span>
          </Link>

          {/* Search + Location wrapper (Desktop) */}
          <div className="hidden md:flex flex-1 px-6 gap-6 items-center">
            
            {/* Reduced width Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex w-full">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                    className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search "Tomato"'
                  className="h-12 w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 text-sm text-gray-700 placeholder-gray-400 border border-gray-200 focus:outline-none"
                />
              </div>
            </form>

            {/* Increased width Location */}
            <div
              className="flex flex-col justify-center cursor-pointer w-1/2 max-w-[320px] truncate"
              onClick={() => setShowLocationPopup(true)}
            >
              <span className="text-sm font-semibold text-black flex items-center">
                Delivery in 24 Hours
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <span className="text-xs text-gray-600 truncate flex items-center">
                {location || "Choose location"}
              </span>
            </div>
            </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-800">
            <button
              onClick={() => setShowLogin(true)}
              className="h-12 flex items-center cursor-pointer space-x-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
            >
              <Image src="/User1.png" alt="Login" width={20} height={20} className="w-5 h-5" />
              <span>Login</span>
            </button>

            <Link
              href="/cart"
              className="relative h-12 flex items-center space-x-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
            >
              <Image src="/cart.png" alt="Cart" width={24} height={24} className="w-6 h-6" />
              <span>My Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-4 bg-white shadow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <div
              className="flex flex-col justify-center cursor-pointer max-w-full"
              onClick={() => setShowLocationPopup(true)}
            >
              <span className="text-sm font-semibold text-black">Delivery in 24 Hours</span>
              <span className="text-xs text-gray-600 truncate">
                {location || "Choose location"}
              </span>
            </div>
            <button
              onClick={() => {
                setShowLogin(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <Image src="/User1.png" alt="Login" width={20} height={20} className="mr-2 w-5 h-5" />
              Login
            </button>

            <Link
              href="/cart"
              className="relative w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <Image src="/cart.png" alt="Cart" width={24} height={24} className="mr-2 w-6 h-6" />
              My Cart
              {cartCount > 0 && (
                <span className="absolute top-0 right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginCard isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Location Popup */}
      {showLocationPopup && (
        <Address
          isOpen={showLocationPopup}
          onClose={() => setShowLocationPopup(false)}
          onLocationUpdate={(newLoc) => {
            localStorage.setItem("user-location", JSON.stringify(newLoc));
            setLocation(formatLocation(newLoc));
            setShowLocationPopup(false);
          }}
        />
      )}
    </>
  );
}
