"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const extractCity = (place) => {
  const address = place.address || {};
  return (
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    address.state_district ||
    place.display_name?.split(",")[0]?.trim() ||
    "Unknown"
  );
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartCount, setCartCount] = useState(2);
  const [location, setLocation] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searchpro?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    // Clear tokens or any stored auth info
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setShowProfileDropdown(false);
    router.push("/"); // Redirect out of webapp
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        const city = extractCity(data);
        const state = data.address?.state || "";
        const formatted = { city, state };

        setLocation(`${city}, ${state}`);
        localStorage.setItem("location", JSON.stringify(formatted));
        setShowLocationPopup(false);
      });
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelectSuggestion = (place) => {
    const city = extractCity(place);
    const state = place.address?.state || "";
    const formatted = { city, state };

    setLocation(`${city}, ${state}`);
    localStorage.setItem("location", JSON.stringify(formatted));
    setSuggestions([]);
    setShowLocationPopup(false);
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      try {
        const parsed = JSON.parse(storedLocation);
        if (typeof parsed === "object" && (parsed.city || parsed.state)) {
          setLocation(`${parsed.city || ""}, ${parsed.state || ""}`);
        } else {
          setLocation(parsed);
        }
      } catch (err) {
        setLocation(storedLocation);
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
            <Link href="/">
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
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/wishlist" className="relative">
              <Image src="/webapp/wishlist.png" alt="Wishlist" width={24} height={24} />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
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

            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="rounded-full bg-green-100 p-2">
                  <Image src="/User1.png" alt="Profile" width={24} height={24} />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Account</Link>
                    <Link href="/saved-address" className="block px-4 py-2 text-sm hover:bg-gray-100">Saved Address</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="rounded-full bg-green-100 p-2">
                <Image src="/User1.png" alt="Login" width={24} height={24} />
              </button>
            )}
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
                <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
              ) : (
                <button onClick={() => setShowLogin(true)} className="text-green-600 text-left">Login</button>
              )}
            </div>
          </div>
        )}

        {/* Location Popup */}
        {showLocationPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Choose Your Location</h2>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter your address"
                onChange={(e) => fetchSuggestions(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
              <ul className="mt-2 max-h-40 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <li key={idx} className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => handleSelectSuggestion(s)}>
                    {extractCity(s)}, {s.address?.state || ""}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button onClick={() => setShowLocationPopup(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                <button onClick={getUserLocation} className="px-4 py-2 bg-green-500 text-white rounded-md">Use My Location</button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
