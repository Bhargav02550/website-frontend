"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Address from "../components/Address";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../cartpro/CartContext";
import LoginCard from "../components/LoginCard";

export default function Header() {
  const router = useRouter();
  const { logout , isAuthenticated, wishlist} = useAuth();
  const { cartItems } = useCart();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [location, setLocation] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searchpro?query=${searchQuery}`);
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
    setShowProfileDropdown(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="flex items-center justify-between h-16 px-4 md:px-10">
          <div className="flex items-center gap-4 w-full max-w-[60%]">
            <Link href="/webapp">
              <Image src="/LOGO-png 3.svg" alt="GoVigi Logo" width={80} height={32} />
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex flex-grow">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-sm focus:outline-none"
                />
              </div>
            </form>

            <div className="hidden lg:flex flex-col text-sm cursor-pointer" onClick={() => setShowLocationPopup(true)}>
              <span className="font-semibold text-black">Delivery in 24 hours</span>
              <span className="text-gray-600 text-xs">{location || "Choose your location"}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="relative">
              <Image src="/webapp/cart.png" alt="Cart" width={24} height={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link href="/wishlist" className="relative">
              <Image src="/webapp/wishlist.png" alt="Wishlist" width={24} height={24} />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{wishlist || 0}</span>
            </Link>

            <Link href="/notifications">
              <Image src="/webapp/bell.png" alt="Notifications" width={24} height={24} />
            </Link>

            <Link href="/orders">
              <Image src="/webapp/orders.png" alt="Orders" width={24} height={24} />
            </Link>

            <Link href="/wallet">
              <Image src="/webapp/wallet.png" alt="Wallet" width={24} height={24} />
            </Link>
            
            <div className="relative">
              <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="rounded-full cursor-pointer bg-green-100 p-2">
                <Image src="/User1.png" alt="Profile" width={24} height={24} />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Account</Link>
                  <Link href="/saved-address" className="block px-4 py-2 text-sm hover:bg-gray-100">Saved Address</Link>
                  {isAuthenticated ? 
                    <button onClick={() => { setShowLogoutConfirm(true)}} className="w-full text-left cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>:
                    <button onClick={() => setShowLogin(true)} className="w-full text-left cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Signin/Signup</button>
                  }
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-4">
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-md text-sm"
              />
            </form>

            <div className="flex flex-col space-y-3 text-sm">
              <Link href="/cart">🛒 Cart</Link>
              <Link href="/wishlist">❤️ Wishlist</Link>
              <Link href="/notifications">🔔 Notifications</Link>
              <Link href="/orders">📄 My Orders</Link>
              <Link href="/profile">👤 Profile</Link>
              {isAuthenticated ? (
                <button onClick={() => { setShowLogoutConfirm(true)}} className="text-red-600 text-left">Logout</button>
              ) : (
                <button onClick={() => setShowLogin(true)} className="text-green-600 text-left">Login</button>
              )}
            </div>
          </div>
        )}

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

        {/* login */}
        <LoginCard isOpen={showLogin} onClose={() => setShowLogin(false)} />
        
        {/* logout */}
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
                    // router.push("/");
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
      </header>
    </>
  );
}
