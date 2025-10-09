"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import WebAppNavbar from "./components/WebAppNavbar";
import { CartProvider } from "./cartpro/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import CartPill from "./components/CartPill";
import BottomNavbar from "./components/BottomNavbar";

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
