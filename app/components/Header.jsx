"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoginCard from "../components/LoginCard";
import Address from "../components/Address"; // ensure correct path
import { useCart } from "../cartpro/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [location, setLocation] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const { isAuthenticated, logout } = useAuth();

  const formatLocation = (locObj) => {
    if (!locObj) return "";
    const { city, state } = locObj;
    return [city, state].filter(Boolean).join(", ");
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
          {/* Left Side: Logo + Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/LOGO-png 3.svg"
                alt="Go-Vigi Logo"
                width={200}
                height={200}
                className="h-25 w-25 object-contain"
              />
            </Link>
            <div className="hidden md:flex space-x-6 text-sm font-semibold text-black">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <Link href="/about" className="hover:text-green-600">About us</Link>
              <Link href="/services" className="hover:text-green-600">Services</Link>
              <Link href="/contact" className="hover:text-green-600">Contact us</Link>
              <button
                onClick={() => router.push("/webapp")}
                className="hover:text-green-600"
              >
                WebApp
              </button>
            </div>
          </div>

          {/* Right Side: Login/Profile */}
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
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="h-10 flex items-center space-x-2 bg-green-600 text-white font-semibold px-4 rounded-lg"
              >
                <Image src="/User1.png" alt="Login" width={20} height={20} className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Login Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowLogin(true)}
              className="h-10 flex items-center space-x-2 bg-green-600 text-white font-semibold px-4 rounded-lg"
            >
              <Image src="/User1.png" alt="Login" width={20} height={20} className="w-5 h-5" />
              <span>Login</span>
            </button>
          </div>
        </div>
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

      {/* Logout Confirmation */}
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
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
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
