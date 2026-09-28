"use client";

import { useUpcomingEvents } from "@/hooks/api";
import Link from "next/link";
import React from "react";

export default function UpcomingExpoPage() {
  const { data: events, isLoading } = useUpcomingEvents();

  return (
    <div className="min-h-screen bg-[#FDF8F3] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 uppercase tracking-wide">
            Upcoming Education Fairs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our schedule of upcoming education fairs across various countries. Find the one nearest to you and discover endless educational opportunities.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full h-[450px] bg-white rounded-2xl animate-pulse shadow-sm"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event: any, idx: number) => (
              <div
                key={event.id || idx}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col group relative"
              >
                <div className="h-56 w-full relative overflow-hidden">
                  <img
                    src={
                      event.images?.[0]?.path
                        ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${event.images[0].path}`
                        : "/images/placeholder.jpg"
                    }
                    alt={event.images?.[0]?.alt_text || event.name || "Fair Image"}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {event.name}
                  </h3>
                </div>

                <div className="p-6 flex-1 flex flex-col bg-white">
                  <div className="flex-1 space-y-4 text-sm md:text-base text-gray-700 pb-12">
                    {event.schedules?.map((schedule: any, sIdx: number) => (
                      <div key={sIdx} className="space-y-2 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-semibold text-secondary">{schedule.date}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="line-clamp-2">{schedule.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/upcoming_expo/${event.slug || ""}`}
                    className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-medium hover:bg-orange-600 transition-colors shadow-md group-hover:shadow-lg"
                  >
                    View Details
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && (!events || events.length === 0) && (
          <div className="text-center py-20 text-gray-500">
            <h3 className="text-2xl font-medium mb-2">No Upcoming Fairs</h3>
            <p>Please check back later for new event announcements.</p>
          </div>
        )}
      </div>
    </div>
  );
}
