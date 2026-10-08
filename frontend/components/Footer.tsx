"use client";

import React from "react";
import Link from "next/link";
import { useSiteSettings } from "@/hooks/api";

const Footer = () => {
  const { data: siteSettings } = useSiteSettings();
  console.log("siteSettings", siteSettings);
  return (
    <footer className="bg-secondary px-4 md:px-0 text-white pt-5 md:pt-10 pb-4 relative mt-auto overflow-hidden">
      <div className="container mx-auto px-0 md:max-w-9xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-1 mb-2 lg:mb-2">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/6">
            <Link href="/" className="mb-2 bg-transparent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  siteSettings?.logo_path
                    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${siteSettings.logo_path}`
                    : "/images/common/Study-in-India-fair-logo.png"
                }
                alt="Study in India Fair Logo"
                className="h-20 w-auto object-contain brightness-0 invert"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-[13px] text-gray-300 mt-2 tracking-wide font-light">
              People &nbsp;|&nbsp; Opportunities &nbsp;|&nbsp; Possibilities
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold mb-4 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-1.5 text-[13px] text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/why-india"
                  className="hover:text-white transition-colors"
                >
                  Why Study in India?
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-expo"
                  className="hover:text-white transition-colors"
                >
                  Upcoming Fairs
                </Link>
              </li>
              <li>
                <Link
                  href="/career-guidance"
                  className="hover:text-white transition-colors"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-addiction"
                  className="hover:text-white transition-colors"
                >
                  Digital Addiction
                </Link>
              </li>
              <li>
                <Link
                  href="/visitors-registration"
                  className="hover:text-white transition-colors"
                >
                  For Students
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibitors"
                  className="hover:text-white transition-colors"
                >
                  For Institutions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold mb-4 text-white">Get in Touch</h4>

            {siteSettings?.emails?.length > 0 ? (
              <div className="flex items-center gap-3 text-[13px] text-gray-300 mb-2">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a
                  href={`mailto:${siteSettings.emails[0].email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteSettings.emails[0].email}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-[13px] text-gray-300 mb-2">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a
                  href="mailto:info@studyindiafair.com"
                  className="hover:text-white transition-colors"
                >
                  info@studyindiafair.com
                </a>
              </div>
            )}

            <div className="flex items-center gap-3 text-[13px] text-gray-300 mb-2">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {siteSettings?.phones?.length > 0 ? (
                <a
                  href={`tel:${siteSettings.phones[0].number.startsWith("+") ? "" : "+91"}${siteSettings.phones[0].number}`}
                  className="hover:text-white transition-colors"
                >
                  {siteSettings.phones[0].number}
                </a>
              ) : (
                <a
                  href="tel:+913340065678"
                  className="hover:text-white transition-colors"
                >
                  +91 33 4006 5678
                </a>
              )}
            </div>

            <div className="flex items-start gap-3 text-[13px] text-gray-300">
              <div className="mt-0.5 text-white">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <p>Kolkata, India</p>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold mb-4 text-white">Follow Us</h4>
            {siteSettings?.social_links?.length > 0 ? (
              <div className="flex gap-4 items-center">
                {siteSettings?.social_links.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${link.icon_path}`}
                      alt={link.name}
                      className="w-6 h-6 object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white text-[#0B1E43] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white text-[#0B1E43] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.203 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.36-.2 6.776-2.615 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.204-4.362-2.618-6.781-6.98-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white text-[#0B1E43] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white text-[#0B1E43] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Column 5: Register Now Button */}
          <div className="flex flex-col items-end">
            <Link
              href="/visitors-registration"
              className="bg-[#FF6A28] hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
            >
              Register Now
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        {/* Horizontal Image */}
        <div className=" hidden md:flex w-full flex justify-end -mt-20">
          <img
            src="/images/hoeizontalimage.png"
            alt="Horizontal Banner"
            className="w-full h-auto max-w-2xl object-contain"
          />
        </div>
        {/* Footer Bottom Strip */}
        <div className="pt-4 pb-2  flex flex-col md:flex-row justify-between items-center border-t border-white/20 relative z-10 text-[13px] text-gray-300">
          <p className="mb-2 md:mb-0">
            © 2026 Study in India Education Fair. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Skyline Image */}
      <div className="absolute bottom-12 left-0 w-full h-24 sm:h-32 pointer-events-none z-0">
        <div
          className="w-full h-full bg-repeat-x bg-bottom"
          style={{
            backgroundImage: "url('/images/footer-skyline.png')",
            backgroundSize: "contain",
          }}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
