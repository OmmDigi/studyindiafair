"use client";

import React, { useEffect, useRef } from "react";

const OurAlliance = () => {
  const alliances = [
    "university1.png",
    "Amrita-Vishwa-Vidyapeetham-1.png",
    "university2.png",
    "university3.png",
    "university4.png",
    "university5.png",
    "KUMARAGURU-NEW-LOGO.jpeg",
    "DYPIU-colour-logo-1-1.png",
    "university7.png",
    "university8.png",
    "university9.png",
    "university10.png",
    "a1.png",
    "a2.png",
    "IIMB.png",
    "a5.png",
    "a6.png",
    "a7.png",
    "a9.png",
    "a10.png",
    "a11.png",
    "a12.png",
    "a13.png",
    "a14.png",
    "a15.png",
    "THAPAR-LOGO-1.png",
    "a16.png",
    "a17.png",
    "a18.png",
    "LPU-scaled.png",
    "PSG.jpeg",
    "assam-down-town-new-logo-scaled.png",
    "Chanakya-University-1.png",
    "MVJCE.png",
    "GUJARAT-MARITIME-UNIVERSITY.png",
    "NEHU.png",
    "siksha-o-anusandhan-Odisha.jpg",
    "National-Law-University-Meghalaya-shillong-Meghalaya.png",
    "CSJM.Chhatrapati-Shahu-Ji-Maharaj-University-Kanpur.png",
    "tumkur-university-Karnataka.png",
    "techno-india-university-tripura.png",
    "R-v-university-bangalore.png",
    "ramaiah-university-of-applied-sciences.png",
    "ANDHRA-UNIVERSITY.png",
    "kl-university.png",
    "Sharda-University.png",
    "Maharishi-Markandeshwar-University-Mullana-Ambala.png",
    "G-D-Goenka-University.png",
    "ITM-UNIVERSITY-GWALIOR.png",
    "Manipal-university-jaipur.png",
    "Rajagiri-group-of-institutions-logo.png",
    "Mahindra-University.png",
    "PDEU.png",
    "chitkara-university-chandigarh.png",
    "Bennett-University-Delhi-Ncr.png",
    "presidency-university-bangalore.png",
    "NITTE-Deemed-Univerity-Mangalore.png",
    "IEM-UEM.jpg",
    "Indian-Maritime-University.png",
    "SNU-1.png",
    "Karunya-Institute-of-Technology-and-Sciences-coimbatore-01.png",
    "eiilm-kolkata.png",
    "rajalakshmi.png",
    "vishwakarma-university.png",
    "Acharya.png",
    "chandigarh-university.png",
    "JIS-group-KOLKATA.png",
    "Amity-University-Kolkata.svg.png",
    "ngi-logos.png",
    "Heritage-Institute-of-Technology-Kolkata.png",
    "nit-jamshedpur.png",
    "SRM.png",
    "sigma-university-Gujarat.png",
    "PK-DAS.png",
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
    <section className="py-3 md:py-5 bg-white overflow-hidden relative">
      <div className="container mx-auto  md:max-w-7xl">
        <div className="flex flex-col items-center gap-2 lg:gap-2">
          {/* Header Section */}
          <div className="w-full lg:w-3/3 mx-auto text-center md:text-start z-10 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Our Alliance
            </h2>
          </div>

          {/* Infinite Marquee Section */}
          <div className="w-full relative px-2">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-4 w-max py-4">
                {[...alliances, ...alliances].map((logo, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 md:w-48 md:h-20 flex-shrink-0 flex items-center justify-center p-0 md:p-0 bg-white rounded-sm shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/home/${logo}`}
                      alt={`Alliance ${index + 1}`}
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

export default OurAlliance;
