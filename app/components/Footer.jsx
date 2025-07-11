"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16 px-4 md:px-6 lg:px-8 py-10 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/logo-P.png"
              alt="Go-Vigi Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <h2 className="text-xl font-bold text-green-600">Go–Vigi</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4 max-w-xs">
            Trusted by retailers. Built for scale. Delivered with care.
          </p>
          <p className="font-medium mb-2">Follow us on :</p>
          <div className="flex gap-4 text-gray-700">
            <Facebook className="w-4 h-4 hover:text-black cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-black cursor-pointer" />
            <Instagram className="w-4 h-4 hover:text-black cursor-pointer" />
            <Linkedin className="w-4 h-4 hover:text-black cursor-pointer" />
            <Youtube className="w-4 h-4 hover:text-black cursor-pointer" />
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Case Studies</Link></li>
            <li><Link href="#">Reviews</Link></li>
            <li><Link href="#">Updates</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Culture</Link></li>
            <li><Link href="#">Blog</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contact@govigi.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 9876543210
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>
                794 MC St, Hyderabad<br />
                Telangana, TS 94102
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500 gap-2 sm:gap-0 px-1">
        <p>© 2025 Go–Vigi. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:underline text-blue-600">
            Terms & Conditions
          </Link>
          <Link href="#" className="hover:underline text-blue-600">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
