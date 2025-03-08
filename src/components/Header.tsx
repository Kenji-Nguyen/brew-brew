"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Determine if a path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-amber-700">
                Brew Brew
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                href="/coffee"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/coffee")
                    ? "border-amber-700 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Coffees
              </Link>
              <Link
                href="/brews"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/brews")
                    ? "border-amber-600 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Brews
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/coffee/new"
              className="inline-flex items-center px-3 py-1 border border-amber-700 text-xs font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50"
            >
              + Coffee
            </Link>
            <Link
              href="/brews/new"
              className="inline-flex items-center px-3 py-1 border border-amber-600 text-xs font-medium rounded-md text-amber-600 bg-white hover:bg-amber-50"
            >
              + Brew
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
