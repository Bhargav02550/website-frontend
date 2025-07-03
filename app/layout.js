import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header'
import { CartProvider } from './cartpro/CartContext';
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Head from "next/head";

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
  description: "Experience the convenience of online vegetable ordering tailored for restaurants, canteens, and more. Enjoy fresh produce delivered directly to your business, ensuring quality and efficiency.",
  icons: {
    icon: "/logo-P.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" type="image/x-icon" href={metadata.icons.icon}/>
        <meta name="keywords" content="agri tech company, e-commerce, online shopping, shopping application"/>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Header/>
              <main>{children}</main>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

