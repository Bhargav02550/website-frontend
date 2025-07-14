"use client";
import Image from "next/image";
import Link from "next/link";
import LoginCard from "../components/LoginCard";
import React, { useEffect, useState } from "react";
import Address from "./Address";
import { useRouter } from "next/navigation";
import { useCart } from "../cartpro/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [location, setLocation] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searchpro?query=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const formatLocation = (locObj) => {
    if (!locObj) return "";
    const { city, state } = locObj;
    return [city, state].filter(Boolean).join(", ");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user-location");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocation(formatLocation(parsed));
        } catch (e) {
          console.error("Invalid location data:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".profile-dropdown")) {
      setShowProfileDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  return (
    <>
       <nav className="h-20 bg-white/20 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full border-b border-gray-200 transition duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* LEFT GROUP: Logo + Search + Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-P.png"
                alt="Go-Vigi Logo"
                width={500}
                height={500}
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold text-green-600">Go-vigi</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative w-64">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                    className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search "Tomato"'
                  className="h-10 w-full pl-10 pr-4 rounded-lg bg-gray-100 text-sm text-gray-700 placeholder-gray-400 border border-gray-200 focus:outline-none"
                />
              </div>
            </form>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-6 text-sm font-semibold text-black">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <Link href="/about" className="hover:text-green-600">About us</Link>
              <Link href="/services" className="hover:text-green-600">Services</Link>
              <Link href="/contact" className="hover:text-green-600">Contact us</Link>
            </div>
          </div>

          {/* RIGHT: Login/Profile & Cart */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-800">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                  className="profile-dropdown h-10 flex items-center cursor-pointer space-x-2 bg-green-600 text-white font-semibold px-4 rounded-lg"
                >
                  <Image src="/User1.png" alt="Profile" width={20} height={20} className="w-5 h-5" />
                  <span>Profile</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">My Account</Link>
                    <Link href="/saved-address" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Saved Address</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">My Orders</Link>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="h-10 flex items-center space-x-2 cursor-pointer bg-green-600 text-white font-semibold px-4 rounded-lg"
              >
                <Image src="/User1.png" alt="Login" width={20} height={20} className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setShowLogin(true);
                } else {
                  router.push("/cart");
                }
              }}
              className="relative h-10 flex items-center cursor-pointer space-x-2 bg-green-600 text-white font-semibold px-4 rounded-xl"
            >
              <Image src="/cart.png" alt="Cart" width={24} height={24} className="w-6 h-6" />
              <span>My Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            {/* <div
              className="flex flex-col justify-center cursor-pointer max-w-full"
              onClick={() => setShowLocationPopup(true)}
            >
              <span className="text-sm font-semibold text-black">Delivery in 24 Hours</span>
              <span className="text-xs text-gray-600 truncate">
                {location || "Choose location"}
              </span>
            </div> */}

            {isAuthenticated ? (
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg">
                <Image src="/User1.png" alt="Profile" width={20} height={20} className="mr-2 w-5 h-5" />
                Profile
              </Link>
            ) : (
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
            )}
            {isAuthenticated ? (
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
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="relative w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <Image src="/cart.png" alt="Cart" width={24} height={24} className="mr-2 w-6 h-6" />
                  My Cart
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}

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
            if (typeof window !== "undefined") {
              localStorage.setItem("user-location", JSON.stringify(newLoc));
              setLocation(formatLocation(newLoc));
              setShowLocationPopup(false);
            }
          }}
        />
      )}

      {/* Confirm logout page */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black/40 backdrop-blur-sm">
          <div className="animate-slide-down bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                  router.push("/");
                }}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>

          <style jsx>{`
            .animate-slide-down {
              animation: slideDownFade 0.3s ease-out forwards;
            }

            @keyframes slideDownFade {
              0% {
                opacity: 0;
                transform: translateY(-20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}

    </>
  );
}
