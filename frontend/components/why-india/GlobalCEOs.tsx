"use client";
import React, { useEffect, useRef } from "react";

const ceos = [
  {
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    image: "/images/why-india/why-india-img1.png",
    logo: "/images/why-india/Microsoft_logo.svg",
  },
  {
    name: "Shantanu Narayen",
    role: "CEO of Adobe Inc.",
    image: "/images/why-india/why-india-img2.png",
    logo: "/images/why-india/Adobe_Corporate_Logo.svg",
  },
  {
    name: "Sundar Pichai",
    role: "CEO of Google",
    image: "/images/why-india/why-india-img3.png",
    logo: "/images/why-india/google_logo.svg",
  },
  {
    name: "Leena Nair",
    role: "CEO of Chanel Group",
    image: "/images/why-india/why-india-img4.png",
    logo: "/images/why-india/g2452.svg",
  },
  {
    name: "Ajaypal Singh Bagha",
    role: "President of World Bank",
    image: "/images/why-india/why-india-img5.png",
    logo: "/images/why-india/world-bank.svg",
  },
  {
    name: "Arvind Krishna",
    role: "CEO of IBM",
    image: "/images/why-india/why-india-img6.png",
    logo: "/images/why-india/IBM_logo_in.svg",
  },
];

export default function GlobalCEOs() {
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
    <section className="py-2 md:py-3 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="w-full text-center md:text-start z-10 mb-8">
          <h2 className="text-4xl md:text-[45px] font-bold text-[#0B2046] mb-2 leading-tight tracking-tight">
            Learn in India,{" "}
            <span className="text-[#FF6A28]">Lead Globally.</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Infinite Marquee Section */}
          <div className="w-full relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none pb-6 pt-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-4 w-max py-2 pl-2 pr-4">
                {[...ceos, ...ceos].map((ceo, index) => (
                  <div
                    key={index}
                    className="w-[280px] h-[130px] flex-shrink-0 flex bg-white rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative group overflow-visible"
                  >
                    {/* Left side content */}
                    <div className="flex flex-col justify-between p-4 z-10 w-2/3">
                      <div className="h-8 flex items-center">
                        <img
                          src={ceo.logo}
                          alt={`${ceo.name} Company Logo`}
                          className="max-h-full max-w-[90px] object-contain"
                          draggable="false"
                        />
                      </div>
                      <div>
                        <h5 className="text-[13px] font-bold text-[#0B2046] leading-tight">
                          {ceo.name}
                        </h5>
                        <span className="text-[11px] font-medium text-gray-500">
                          {ceo.role}
                        </span>
                      </div>
                    </div>

                    {/* Right side image cutout */}
                    <div className="absolute right-0 bottom-0 w-[45%] h-[110%] flex items-end justify-end pointer-events-none transition-transform duration-300 group-hover:scale-105 origin-bottom">
                      <img
                        src={ceo.image}
                        alt={ceo.name}
                        className="object-contain max-h-full w-full object-bottom drop-shadow-md"
                        draggable="false"
                      />
                    </div>
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
}
