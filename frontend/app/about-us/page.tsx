import React from "react";
import Image from "next/image";
import Link from "next/link";
import NewTeamSection from "@/components/about/NewTeamSection";
import Counter from "@/components/Counter";
import OurAssociates from "@/components/home/OurAssociates";
import OurAlliance from "@/components/home/OurAlliance";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <OurAssociates />
      <OurAlliance />

      <div
        className="relative py-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about/heroabout.jpeg')" }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative container mx-auto px-4 md:max-w-7xl z-10">
          {/* Hero Typography */}
          <div className="text-center max-w-5xl mx-auto space-y-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2046]">
              How do we take India&apos;s Education{" "}
              <br className="hidden md:block" />
              <span className="text-orange-500">
                Opportunities more accessible
              </span>{" "}
              <br className="hidden md:block" />
              to the aspiring minds across the world?
            </h1>
            <p className="text-xl md:text-2xl text-[#0B2046] italic font-medium mt-4">
              That single question built on a platform trusted by
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 pt-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-orange-500">
                  <Counter end={750000} suffix="+" />
                </h2>
                <p className="text-sm font-medium text-[#0B2046] mt-2 tracking-wide uppercase">
                  Students Around The Globe
                </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-gray-400"></div>
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-orange-500">
                  <Counter end={500} suffix="+" />
                </h2>
                <p className="text-sm font-medium text-[#0B2046] mt-2 tracking-wide uppercase">
                  Institutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto  md:max-w-full pb-2">
        {/* Specialisation Section */}
        <div className="mb-2  mx-auto md:max-w-7xl">
          <div className="mb-5">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B2046]">
              Our <span className="text-orange-500">Specialisation</span>
            </h2>
            <div className="w-16 h-1 bg-orange-500 mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="flex flex-col justify-around  bg-blue-50/50 border border-blue-100 rounded-sm p-3 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="font-bold text-[#0B2046] text-lg mb-4 leading-tight">
                Education Expo
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                Curated platforms connecting institutions with right
                talent/students.
              </p>
            </div>

            <div className="flex flex-col justify-around bg-orange-50/50 border border-orange-100 rounded-sm p-3 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-bold text-[#0B2046] text-lg mb-4 leading-tight">
                Student - Parent
                <br />
                Engagement Program
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                Helping students and parents explore the right academic
                opportunities.
              </p>
            </div>

            <div className="flex flex-col justify-around bg-blue-50/50 border border-blue-100 rounded-sm p-3 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M8 6h.01"></path>
                  <path d="M16 6h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M8 14h.01"></path>
                </svg>
              </div>
              <h3 className="font-bold text-[#0B2046] text-lg mb-4 leading-tight">
                Institutional
                <br />
                Outreach Activities
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                Connecting Indian institutions with relevant international
                student markets.
              </p>
            </div>

            <div className="flex flex-col justify-around bg-indigo-50/50 border border-indigo-100 rounded-sm p-3 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <h3 className="font-bold text-[#0B2046] text-lg mb-4 leading-tight">
                International
                <br />
                Conclaves
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                B2B & B2G platform for collaboration, knowledge exchange and
                global partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* Global Influence Section */}
        <div
          className="mb-2 px-1 mx-auto md:max-w-gull relative overflow-hidden  bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/about/wodeabout.jpeg')" }}
        >
          <div className="absolute inset-0 bg-white/15"></div>
          {/* Background Map Placeholder */}
          <div className="hidden md:flex absolute right-0 md:right-10 top-50 md:top-25  bottom-0 w-full lg:w-3/4 opacity-100 pointer-events-none z-0">
            <Image
              src="/images/about/map.png"
              alt="Global Map"
              fill
              className="object-contain object-right"
            />
          </div>

          <div className="relative z-10 md:pl-10 w-full max-w-xl">
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B2046] leading-tight">
                Global Influence <br />
                <span className="text-orange-500">Across Borders.</span>
              </h2>
              <div className="w-16 h-1 bg-orange-500 mt-4"></div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-2">
              {/* Region Column 1 */}
              <div className="flex-1">
                <div className="bg-secondary text-white text-center py-1.5 px-1 rounded-full font-semibold text-xs md:text-sm mb-4 whitespace-nowrap">
                  South East Asia
                </div>
                <div>
                  <ul className="space-y-1.5">
                    {[
                      "Sri Lanka",
                      "Bangladesh",
                      "Myanmar",
                      "Vietnam",
                      "Cambodia",
                      "Indonesia",
                      "Nepal",
                      "Bhutan",
                    ].map((country, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#0B2046] font-medium"
                      >
                        <svg
                          className="w-4 h-4 text-[#1877F2] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                        </svg>
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Region Column 2 */}
              <div className="flex-1">
                <div className="bg-secondary text-white text-center py-1.5 px-1 rounded-full font-semibold text-xs md:text-sm mb-4 whitespace-nowrap">
                  Middle East
                </div>
                <div>
                  <ul className="space-y-1.5">
                    {["UAE", "Bahrain", "Qatar", "Oman", "Saudi Arabia"].map(
                      (country, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-[#0B2046] font-medium"
                        >
                          <svg
                            className="w-4 h-4 text-[#1877F2] flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                          </svg>
                          {country}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              {/* Region Column 3 */}
              <div className="flex-1">
                <div className="bg-secondary text-white text-center py-1.5 px-1 rounded-full font-semibold text-xs md:text-sm mb-4 whitespace-nowrap">
                  Africa
                </div>
                <div>
                  <ul className="space-y-1.5">
                    {[
                      "Sierra Leone",
                      "Liberia",
                      "Conakry",
                      "Ghana",
                      "Benin",
                      "Togo",
                      "Ivory Coast",
                    ].map((country, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#0B2046] font-medium"
                      >
                        <svg
                          className="w-4 h-4 text-[#1877F2] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                        </svg>
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white pb-16">
        <NewTeamSection />
      </div>
    </main>
  );
}
