"use client";

import React from "react";
import Link from "next/link";
import { useUpcomingEvents } from "@/hooks/api";

export default function VisitorsRegistrationPage() {
  const { data: events, isLoading } = useUpcomingEvents();
  const displayEvents = Array.isArray(events) ? events : events?.data || [];

  return (
    <div className="min-h-screen relative flex bg-[#F9FBFC] overflow-hidden">
      {/* Background Image covering full width */}
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{ backgroundImage: `url('/images/home/VisitorsRegistrationPage.jpeg')` }}
      >
        {/* Gradient overlay creating the creamy area on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9FBFC] via-[#F9FBFC]/95 to-transparent w-full md:w-[70%] lg:w-[60%]"></div>
      </div>

      {/* Left Content Area */}
      <div className="relative z-10 w-full md:w-[70%] lg:w-[60%] p-8 md:px-12 lg:px-24 flex flex-col justify-center min-h-screen">
        <div className="w-full max-w-xl mx-auto md:mx-0">
          {/* Why Attend Section */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#003399] mb-5">
              Why <span className="text-[#E87A24]">Attend</span>
            </h1>

            <ul className="space-y-4">
              <li className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-xl md:text-2xl">
                  Discover Top Institution Of India
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E87A24"
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
                <span className="text-[#003399] font-medium text-xl md:text-2xl">
                  Direct Interactions
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-xl md:text-2xl">
                  Get Admission Guidance
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-xl md:text-2xl">
                  Scholarships & Admission Opportunities
                </span>
              </li>
            </ul>
          </div>

          {/* Choose Your Country Section */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-serif font-bold text-[#003399] mb-8">
              Choose Your Country
            </h2>
            {isLoading ? (
               <div className="flex gap-4 flex-wrap">
                 {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 w-32 bg-gray-200 animate-pulse rounded-lg"></div>)}
               </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {displayEvents.map((event: any) => (
                  <Link
                    key={event.id || event.slug}
                    href={`/upcoming_expo/${event.slug || ""}`}
                    className="px-6 py-3 border-2 border-[#003399] text-[#003399] rounded-lg hover:bg-[#003399] hover:text-white transition-all bg-white font-medium text-center shadow-sm hover:shadow-md min-w-[140px]"
                  >
                    {event.name || event.country || event.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
