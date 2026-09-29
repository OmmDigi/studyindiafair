"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSiteSettings, useUpcomingEvents } from "@/hooks/api";
import { EditorJsDescription } from "@/components/EditorJsDescription";

export default function Header() {
  const { data: events, isLoading } = useUpcomingEvents();

  const { data: siteSettings } = useSiteSettings();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      <header
        className={`w-full z-40 transition-all duration-300 ${
          isHomePage
            ? `fixed top-0 left-0 right-0 ${isScrolled ? "bg-white shadow-md py-0" : "bg-transparent py-2"}`
            : "sticky top-0 bg-white shadow-md py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img
                  src={
                    siteSettings?.logo_path
                      ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${siteSettings.logo_path}`
                      : "/images/common/Study-in-India-fair-logo.png"
                  }
                  alt="Study in India Fair Logo"
                  className={
                    !isHomePage || isScrolled
                      ? "h-15 w-auto object-contain"
                      : "h-20 w-auto object-contain brightness-0 invert"
                  }
                  style={
                    isHomePage && !isScrolled
                      ? { filter: "brightness(0) invert(1)" }
                      : {}
                  }
                />
              </Link>
            </div>

            {/* Marquee/Announcement Section */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 justify-center pointer-events-none h-16 overflow-hidden">
              <style>{`
                @keyframes scrollUp {
                  0% { transform: translateY(100%); }
                  100% { transform: translateY(-100%); }
                }
                .animate-scroll-up {
                  animation: scrollUp 10s linear infinite;
                }
                .animate-scroll-up:hover {
                  animation-play-state: paused;
                }
                /* Hide any accordion borders or padding that EditorJsDescription might render */
                .marquee-notice .border-t { border: none !important; }
                .marquee-notice .mt-2 { margin-top: 0 !important; }
                .marquee-notice .py-4 { padding-top: 0 !important; padding-bottom: 0 !important; }
                
                /* Force text color for EditorJsDescription contents */
                .marquee-text-white .marquee-notice * { color: white !important; }
                .marquee-text-black .marquee-notice * { color: black !important; }
              `}</style>
              <div
                className={`pointer-events-auto h-full overflow-hidden flex flex-col justify-center ${!isHomePage || isScrolled ? "bg-gray-50 border border-gray-100 rounded-lg px-4 text-sm text-center text-black marquee-text-black" : "bg-transparent px-4 text-sm text-center text-white marquee-text-white"}`}
              >
                <div className="animate-scroll-up marquee-notice flex flex-col items-center">
                  {siteSettings?.notice ? (
                    <div className="w-full text-center">
                      <EditorJsDescription data={siteSettings.notice} />
                    </div>
                  ) : (
                    <p>
                      <span className="font-bold uppercase tracking-wide">
                        Upcoming Fair
                      </span>
                      <br />
                      <strong>Bahrain</strong> - 13th &amp; 14th November 2026
                      <br />
                      <span>Ramee Grand Hotel, Seef</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Button Section */}
            <div className="flex items-center gap-4">
              <Link
                href="/scholarship"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-[#003399] hover:bg-blue-800 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Apply for Scholarship
              </Link>
              <button
                onClick={toggleSidebar}
                className={` ${!isHomePage || isScrolled ? "p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors" : "p-2 rounded-md text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"}`}
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
                src={
                  siteSettings?.logo_path
                    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${siteSettings.logo_path}`
                    : "/images/common/Study-in-India-fair-logo.png"
                }
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
                {isLoading ? (
                  <li>
                    <span className="block px-10 py-2 text-sm text-gray-400">
                      Loading...
                    </span>
                  </li>
                ) : (
                  events?.map((event: any) => (
                    <li key={event.id || event.slug || event.name}>
                      <Link
                        href={`/upcoming_expo/${event.slug || ""}`}
                        className="block px-10 py-2 text-sm text-gray-600 hover:text-red-600"
                        onClick={toggleSidebar}
                      >
                        {event.name}
                      </Link>
                    </li>
                  ))
                )}
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
