"use client";

import React, { useEffect, useRef } from "react";

const AboutOurAssociates = () => {
  const eventImages = [
    "WhatsApp Image 2026-10-15 at 3.39.44 PM.jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.45 PM (1).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.45 PM.jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.46 PM (1).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.46 PM (2).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.46 PM (3).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.46 PM.jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.47 PM (1).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.47 PM (2).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.47 PM (3).jpeg",
    "WhatsApp Image 2026-10-15 at 3.39.47 PM.jpeg",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let isHovered = false;
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => {
      isHovered = false;
      isDragging = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const handleMouseUp = () => {
      isDragging = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed multiplier
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);

    const scroll = () => {
      if (!isHovered && !isDragging) {
        el.scrollLeft += 1;
        // Reset scroll position for seamless infinite loop
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="py-3 md:py-6 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-2">
          {/* Infinite Marquee Section */}
          <div className="w-full lg:w-3/3 relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-3 w-max py-2">
                {[...eventImages, ...eventImages].map((img, index) => (
                  <div
                    key={index}
                    className="w-44 h-28 md:w-60 md:h-36 flex-shrink-0 flex items-center justify-center overflow-hidden bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/about/events/${img}`}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Global style to hide scrollbar for webkit */}
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOurAssociates;
