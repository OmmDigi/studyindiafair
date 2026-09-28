"use client";

import React from "react";
import Link from "next/link";
import { useSiteSettings } from "@/hooks/api";

const Footer = () => {
  const { data: siteSettings } = useSiteSettings();
  console.log("siteSettings", siteSettings);
  return (
    <footer className="bg-[#0B1E43] text-white pt-10 pb-4 relative mt-auto border-t-4 border-white/10 overflow-hidden">
      {/* Background silhouette (optional visual element) */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 bg-repeat-x bg-bottom opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url('/images/footer-skyline.png')",
          backgroundSize: "contain",
        }}
      ></div>

      <div className="container mx-auto px-4 md:max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/5">
            <Link href="/" className="mb-2 bg-transparent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteSettings?.logo_path ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ''}${siteSettings.logo_path}` : "/images/common/Study-in-India-fair-logo.png"}
                alt="Study in India Fair Logo"
                className="h-20 w-auto object-contain brightness-0 invert"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-xs text-gray-300 mt-2 tracking-widest font-light">
              Explore &nbsp;|&nbsp; Learn &nbsp;|&nbsp; Belong
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:w-1/3 flex flex-col">
            <h4 className="text-sm font-bold mb-4 text-white">Quick Links</h4>
            <div className="flex gap-8 lg:gap-16 text-xs text-gray-300">
              <ul className="flex flex-col gap-2">
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
                    Upcoming Expo
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/gallery"
                    className="hover:text-white transition-colors"
                  >
                    Gallery
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
                    href="/scholarship"
                    className="hover:text-white transition-colors"
                  >
                    Scholarship
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
                    href="/contact-us"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-white/10 h-32 self-center"></div>

          {/* Column 3: Corporate Office */}
          <div className="lg:w-1/3 flex flex-col pl-0 lg:pl-6">
            <h4 className="text-sm font-bold mb-4 text-white">
              Corporate Office
            </h4>

            <div className="flex items-start gap-3 mb-4 text-xs text-gray-300">
              <div className="mt-0.5 flex-shrink-0 text-white">
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <p className="leading-relaxed">
                {siteSettings?.addresses?.[0]?.address || (
                  <>
                    P287 Darga Road, Ground Floor,
                    <br />
                    Park Circus, Near 4 No Bridge, Kolkata. 700017.
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-300">
              <div className="flex-shrink-0 text-white">
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <p>
                Call us:{" "}
                {siteSettings?.phones?.length > 0 ? (
                  siteSettings.phones.map((phone: any, index: number) => (
                    <React.Fragment key={index}>
                      <a
                        href={`tel:${phone.number.startsWith('+') ? '' : '+91'}${phone.number}`}
                        className="hover:text-white transition-colors"
                      >
                        {phone.number}
                      </a>
                      {index < siteSettings.phones.length - 1 && " | "}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <a
                      href="tel:+919830058408"
                      className="hover:text-white transition-colors"
                    >
                      9830058408
                    </a>{" "}
                    &nbsp;|&nbsp;{" "}
                    <a
                      href="tel:+918017494833"
                      className="hover:text-white transition-colors"
                    >
                      8017494833
                    </a>{" "}
                    &nbsp;|&nbsp;{" "}
                    <a
                      href="tel:+919338058408"
                      className="hover:text-white transition-colors"
                    >
                      9338058408
                    </a>
                  </>
                )}
              </p>
            </div>
            
            {siteSettings?.emails?.length > 0 && (
              <div className="flex items-center gap-3 text-xs text-gray-300 mt-4">
                <div className="flex-shrink-0 text-white">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <p>
                  Email us:{" "}
                  {siteSettings.emails.map((emailObj: any, index: number) => (
                    <React.Fragment key={index}>
                      <a href={`mailto:${emailObj.email}`} className="hover:text-white transition-colors">
                        {emailObj.email}
                      </a>
                      {index < siteSettings.emails.length - 1 && " | "}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            )}
          </div>

          {/* Column 4: Actions */}
          <div className="lg:w-1/5 flex flex-col items-center lg:items-end">
            <div className="text-[10px] text-gray-400 flex gap-2 mb-4">
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

            {siteSettings?.social_links?.length > 0 && (
              <div className="flex gap-4 items-center">
                {siteSettings.social_links.map((link: any, index: number) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ''}${link.icon_path}`} 
                      alt={link.name} 
                      className="w-6 h-6 object-contain" 
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 flex justify-start items-end border-t border-white/5 relative z-10">
          <p className="text-gray-400 text-[10px] mb-0">
            © 2026 Study In India Education Fair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
