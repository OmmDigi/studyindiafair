"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Study-in-India-fair-logo.png"
                  alt="Study in India Fair Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Marquee/Announcement Section */}
            <div className="hidden md:flex flex-1 justify-center px-8">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm text-center">
                <p className="text-gray-800">
                  <span className="text-red-600 font-bold uppercase tracking-wide">
                    Upcoming Fair
                  </span>
                  <br />
                  <strong>Bahrain</strong> - 13th &amp; 14th November 2026
                  <br />
                  <span className="text-gray-500">Ramee Grand Hotel, Seef</span>
                </p>
              </div>
            </div>

            {/* Menu Button Section */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Open menu"
              >
                <svg
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="logo1">
            <Link href="/" onClick={toggleSidebar}>
              <img
                src="https://studyindiafair.com/wp-content/uploads/2025/09/Study-in-India-fair-logo.png"
                alt="Study in India Fair Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-4">
          <ul className="flex flex-col space-y-1">
            <li>
              <Link
                href="/"
                className="block px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="block px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
                onClick={toggleSidebar}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/why-india"
                className="block px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
                onClick={toggleSidebar}
              >
                Why India
              </Link>
            </li>

            {/* Upcoming Expo Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("expo")}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
              >
                Upcoming Expo
                <svg
                  className={`w-4 h-4 transition-transform ${openDropdown === "expo" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <ul
                className={`bg-gray-50 overflow-hidden transition-all duration-200 ${openDropdown === "expo" ? "max-h-96 py-2" : "max-h-0"}`}
              >
                {[
                  { name: "Sri Lanka", path: "/upcoming_expo/sri-lanka" },
                  { name: "Sierra Leone", path: "/upcoming_expo/sierra-leone" },
                  { name: "Liberia", path: "/upcoming_expo/liberia" },
                  { name: "Ghana", path: "/upcoming_expo/ghana" },
                  { name: "Myanmar", path: "/upcoming_expo/myanmar" },
                  { name: "Nepal", path: "/upcoming_expo/nepal" },
                  { name: "Bangladesh", path: "/upcoming_expo/bangladesh" },
                  { name: "Bahrain", path: "/upcoming_expo/bahrain" },
                  { name: "Qatar", path: "/upcoming_expo/qatar" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="block px-10 py-2 text-sm text-gray-600 hover:text-red-600"
                      onClick={toggleSidebar}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Student Corner Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("student")}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
              >
                Student Corner
                <svg
                  className={`w-4 h-4 transition-transform ${openDropdown === "student" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <ul
                className={`bg-gray-50 overflow-hidden transition-all duration-200 ${openDropdown === "student" ? "max-h-40 py-2" : "max-h-0"}`}
              >
                {[
                  { name: "Career Guidance", path: "/career-guidance" },
                  { name: "Digital Addiction", path: "/digital-addiction" },
                  { name: "Scholarship", path: "/scholarship" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="block px-10 py-2 text-sm text-gray-600 hover:text-red-600"
                      onClick={toggleSidebar}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/gallery"
                className="block px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
                onClick={toggleSidebar}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="block px-6 py-3 text-gray-800 hover:bg-gray-50 font-medium"
                onClick={toggleSidebar}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
