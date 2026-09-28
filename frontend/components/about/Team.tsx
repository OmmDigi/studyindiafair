"use client";

import { useTeamMembers } from "@/hooks/api";
import React, { useEffect, useRef } from "react";

const Team = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: teamData, isLoading, error } = useTeamMembers();

  const displayMembers = Array.isArray(teamData)
    ? teamData
    : teamData?.data || [];

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
      const walk = (x - startX) * 2;
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
      <div className="container mx-auto px-4 md:max-w-7xl">
        <div className="w-full lg:w-10/12 mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Team
          </h2>
          <p className="text-sm md:text-md leading-relaxed text-tertiary-text">
            SAPE is managed by a team of qualified professionals having
            expertise in various fields. The members of the core team hold the
            experience in conceptualization of project, management of project
            and successful execution of the same. The versatile approach,
            professional thinking, committed attitude, dynamic actions makes it
            easy for SAPE to organize exhibitions.
          </p>
        </div>

        <div className="w-full relative">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6 w-max py-4 px-4">
                {[...displayMembers].map((member, idx) => (
                  <div
                    key={idx}
                    className="w-64 md:w-[280px] flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group block cursor-pointer"
                    draggable="false"
                  >
                    <div className="h-72 md:h-80 overflow-hidden">
                      <img
                        src={
                          member.image_path
                            ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${member.image_path}`
                            : "/images/placeholder.jpg"
                        }
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        draggable="false"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h5 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                        {member.name}
                      </h5>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1 block">
                        {member.designation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Team;
