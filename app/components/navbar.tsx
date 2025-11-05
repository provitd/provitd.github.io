"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/app/lib/utils"; 
import { Menu } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", id: "home" },
    { path: "/studies", label: "Studies & Datasets", id: "studies" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <nav className="bg-(--navbarbg) text-var(--foreground) shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-l font-bold">
              PROVitD - Laverny Group
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <Link key={item.id} href={item.path}>
                    <span
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                        isActive(item.path)
                          ? "border-b-2 border-(--foreground)"
                          : "hover:border-(--foreground) hover:border-b-1"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sm rounded-md hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-(--navbarbg) border-t border-gray-200">
            {navItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium transition-colors cursor-pointer",
                    isActive(item.path)
                      ? "underline decoration-(--foreground) decoration-2 underline-offset-8"
                      : "hover:border-(--foreground) hover:border-b-1"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
