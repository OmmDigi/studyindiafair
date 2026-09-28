"use client";

import React, { useEffect, useRef } from "react";

const OurAssociates = () => {
  const associates = [
    "associates7.png",
    "associates6.png",
    "associates5.png",
    "associates4.png",
    "associates3.png",
    "associates2.png",
    "associates1.png",
    "p1.png",
    "p2.png",
    "p3.png",
    "p4.png",
    "p5.png",
    "p6.png",
    "p7.png",
    "p8.png",
    "p9.png",
    "p10.png",
    "p11.png",
    "p12.png",
    "p13.png",
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
        {/* Header Section */}
        <div className="w-full lg:w-3/3 text-center md:text-start z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-secondary">
            Our Associates
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-2">
          {/* Infinite Marquee Section */}
          <div className="w-full lg:w-3/3 relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-2 w-max py-2">
                {[...associates, ...associates].map((logo, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 md:w-40 md:h-20 flex-shrink-0 flex items-center justify-center p-0 md:p-0 bg-white rounded-sm shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/home/${logo}`}
                      alt={`Associate ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-all duration-500"
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

export default OurAssociates;
