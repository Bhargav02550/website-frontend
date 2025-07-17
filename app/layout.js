import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./cartpro/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Head from "next/head";

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

export const metadata = {
  title: "Go-Vigi",
  description:
    "Experience the convenience of online vegetable ordering tailored for restaurants, canteens, and more. Enjoy fresh produce delivered directly to your business, ensuring quality and efficiency.",
  keywords: [
    "agri tech company",
    "e-commerce",
    "online shopping",
    "shopping application",
  ],
  icons: {
    icon: "/logo-P.png",
  },
  openGraph: {
    title: "Go-Vigi",
    description:
      "Experience the convenience of online vegetable ordering tailored for restaurants, canteens, and more. Enjoy fresh produce delivered directly to your business, ensuring quality and efficiency.",
    url: "https://www.govigi.com",
    siteName: "Go-Vigi",
    images: [
      {
        url: "/logo-P.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={` ${inter.variable} antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
