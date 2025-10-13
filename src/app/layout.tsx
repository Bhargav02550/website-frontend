"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/general-components/Header";
import WebAppNavbar from "../components/general-components/WebAppNavbar";
import { CartProvider } from "../components/core/Cart/CartContext";
import { AuthProvider } from "../libs/context/AuthContext";
import { ToastProvider } from "../libs/context/ToastContext";
import CartPill from "../components/general-components/CartPill";
import BottomNavbar from "../components/general-components/BottomNavbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showWebAppNavbar =
    pathname.startsWith("/webapp") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/wishlist") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/wallet") ||
    pathname.startsWith("/ordershistory") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/saved-address");

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              {showWebAppNavbar ? <WebAppNavbar /> : <Header />}
              <main>{children}</main>
              <CartPill />
              <BottomNavbar />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
