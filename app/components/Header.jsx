"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {

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
            </div>
          </div>
        </div>
      </nav>
      
    </>
  );
}
