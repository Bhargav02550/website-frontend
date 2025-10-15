"use client";
import {
  IconBasketCheck,
  IconHome,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/webapp", icon: IconHome, label: "Home" },
    { href: "/search", icon: IconSearch, label: "Search" },
    { href: "/orders", icon: IconBasketCheck, label: "Orders" },
    { href: "/profile", icon: IconUser, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <ul className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center p-1 transition-colors duration-200"
              >
                <div
                  className={`p-2 rounded-full mb-1 transition-all duration-300 w-12 h-8 flex items-center justify-center ${
                    isActive
                      ? "bg-green-500 text-white transform scale-110"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon
                    size={20}
                    stroke={1.5}
                    className={isActive ? "text-white" : "text-current"}
                  />
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
