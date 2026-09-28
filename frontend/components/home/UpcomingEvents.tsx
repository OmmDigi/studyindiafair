"use client";

import { useUpcomingEvents } from "@/hooks/api";
import React, { useRef } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

const UpcomingEvents = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const { data: events, isLoading } = useUpcomingEvents();
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  console.log("events", events);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // If loading or no events, you can return skeleton or null.
  // Rendering skeleton for better UX.
  const displayEvents = events?.length ? events : [];

  if (isLoading) {
    return (
      <section className="py-12 bg-[#FDF8F3] relative overflow-hidden">
        <div className="container mx-auto px-4 md:max-w-[1400px]">
          {!hideHeader && (
            <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-8"></div>
          )}
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-w-[300px] w-[300px] h-[380px] bg-white rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayEvents.length === 0) return null;

  return (
    <section className="py-3  md:py-6 bg-[#FDF8F3] relative overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 md:max-w-[1400px]">
        {/* Header Section */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary tracking-wide uppercase">
              Upcoming Education Fairs
            </h2>

            <div className="flex items-center gap-4">
              <Link
                href="/upcoming_expo"
                className="text-secondary font-medium hover:underline text-sm md:text-base flex items-center gap-1"
              >
                View All Fairs <span aria-hidden="true">&rarr;</span>
              </Link>

              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 transition-colors"
                  aria-label="Next"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayEvents?.map((event: any, idx: number) => {
            return (
              <div
                key={event.id || idx}
                onClick={() =>
                  router.push(`/upcoming_expo/${event.slug || ""}`)
                }
                className="min-w-[300px] w-[300px] md:min-w-[360px] md:w-[360px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex-shrink-0 snap-start flex flex-col relative group cursor-pointer"
              >
                <div className="h-48 md:h-56 w-full relative overflow-hidden">
                  <img
                    src={
                      event.images?.[0]?.path
                        ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${event.images[0].path}`
                        : "/images/placeholder.jpg"
                    }
                    alt={
                      event.images?.[0]?.alt_text || event.name || "Fair Image"
                    }
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-secondary mb-5 leading-tight whitespace-pre-line">
                    {event.name}
                  </h3>

                  <div className="mt-auto space-y-2 text-sm md:text-base text-secondary pb-8">
                    {event.schedules?.map((schedule: any, sIdx: number) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <span className="font-medium">{schedule.date}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          <span className="font-medium line-clamp-2">
                            {schedule.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/upcoming_expo/${event.slug || ""}`}
                    className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
                    aria-label={`View details for ${event.name}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
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
            );
          })}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default UpcomingEvents;
