"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginCard from "../components/LoginCard";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);

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
              <Link href="/#about" className="hover:text-green-600">About us</Link>
              <Link href="/#services" className="hover:text-green-600">Services</Link>
              <Link href="/#contact" className="hover:text-green-600">Contact us</Link>
              {/* <button
                onClick={() => router.push("/webapp")}
                className="hover:text-green-600"
              >
                WebApp
              </button> */}
            </div>
          </div>

          {/* Right Side: Login/Profile */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-800">
            <button
              onClick={() => setShowLogin(true)}
              className="h-10 flex items-center cursor-pointer space-x-2 bg-green-600 text-white font-semibold px-4 rounded-lg"
            >
              <Image src="/User1.png" alt="Login" width={20} height={20} className="w-5 h-5" />
              <span>Login</span>
            </button>
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
    </>
  );
}
