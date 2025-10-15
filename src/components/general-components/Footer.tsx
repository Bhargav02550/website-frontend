"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-white text-sm text-gray-700 overflow-x-hidden"
      id="contact"
    >
      {/* Newsletter Section */}
      <div className="relative bg-[#2E7D32] max-w-[800px] text-white rounded-[20px] mt-10 px-4 sm:px-10 py-6 sm:py-8 flex flex-col justify-start gap-4 sm:gap-6 overflow-hidden mx-4 sm:mx-auto">
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-[120px] h-[120px] border-[6px] border-[#A5D6A7] rounded-full translate-x-[-50%] translate-y-[-50%] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[120px] h-[120px] border-[6px] border-[#A5D6A7] rounded-full translate-x-[50%] translate-y-[50%] pointer-events-none" />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center z-10">
          Subscribe to our newsletter
        </h2>

        <form className="flex flex-col sm:flex-row justify-end items-start gap-4 sm:mr-[50px] z-10">
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="name" className="text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="First name"
              className="bg-white text-black rounded-md px-4 py-2 w-full sm:w-[150px] focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="bg-white text-black rounded-md px-4 py-2 w-full sm:w-[280px] focus:outline-none focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white font-semibold px-6 py-2 rounded-md mt-2 sm:mt-6 w-full sm:w-auto"
          >
            Subscribe Now
          </button>
        </form>
      </div>

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/LOGO-png 3.svg"
              alt="Go-Vigi Logo"
              width={480}
              height={480}
              className="h-10 w-18 object-contain"
            />
          </div>
          <p className="text-gray-500 mb-2">
            Trusted by retailers. Built for scale.
          </p>
          <p className="text-gray-500 mb-4">Delivered with care.</p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">About us</Link>
            </li>
            <li>
              <Link href="#">Services</Link>
            </li>
            <li>
              <Link href="#">Benefits</Link>
            </li>
            <li>
              <Link href="#">Categories</Link>
            </li>
            <li>
              <Link href="#">Testimonials</Link>
            </li>
            <li>
              <Link href="#">Contact us</Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-3">Follow us</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </li>
            <li className="flex items-center gap-2">
              <Twitter className="w-4 h-4" /> Twitter
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="w-4 h-4" /> FaceBook
            </li>
            <li className="flex items-center gap-2">
              <Youtube className="w-4 h-4" /> Youtube
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact us</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@govigi.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 9346928139
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>
                Hyderabad
                <br />
                Telangana, TS 94102
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t pt-4 pb-6 px-6 sm:px-16 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-500">
        <p>Copyright © 2025 Go-vigi</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href="#" className="text-blue-600 hover:underline">
            Terms and Conditions
          </Link>
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
