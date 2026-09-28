"use client";

import { useTestimonialCategories, useTestimonials } from "@/hooks/api";
import React, { useState, useEffect, useRef } from "react";
import { EditorJsDescription } from "@/components/EditorJsDescription";
// Removed hard-coded voices

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState("");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data: testimonialCategories } = useTestimonialCategories();

  // Set default tab on load
  useEffect(() => {
    if (testimonialCategories?.length > 0 && !activeTab) {
      setActiveTab(testimonialCategories[0].slug);
    }
  }, [testimonialCategories, activeTab]);

  const { data: testimonials } = useTestimonials({ category: activeTab });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling logic that resets when tab changes
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
  }, [activeTab]); // Re-attach when tab changes to grab the new ref contents

  return (
    <section className="py-3 md:py-5 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-0 md:max-w-7xl">
        <div className="flex flex-col items-center gap-0">
          {/* Header */}
          <div className="w-full lg:w-3/3 mx-auto text-center md:text-start z-10 px-4 md:flex justify-between items-center ">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Testimonials
            </h2>
            <div className="inline-flex flex-wrap md:flex-nowrap justify-center bg-gray-100 p-1 md:p-1.5 rounded-sm md:rounded-sm border border-gray-200 mb-6 md:mb-8 max-w-full">
              {testimonialCategories?.length > 0
                ? testimonialCategories.map((category: any) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.slug)}
                      className={`flex items-center justify-center gap-2 px-5 md:px-6 py-2 md:py-2.5 rounded-full font-medium transition-all duration-300 w-full md:w-auto ${
                        activeTab === category.slug
                          ? "bg-secondary text-white shadow-md"
                          : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <span className="text-sm md:text-base whitespace-nowrap">
                        {category.name}
                      </span>
                    </button>
                  ))
                : null}
            </div>
          </div>

          {/* Tabs */}

          {/* Marquee Content */}
          <div className="w-full relative px-2">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6 w-max py-4 px-4">
                {testimonials?.length > 0 &&
                  [...testimonials].map((t: any, idx: number) => {
                    const isVideo = t.type === "video" || t.youtube_id;

                    if (isVideo) {
                      return (
                        <div
                          key={`testimonial-${t.id}-${idx}`}
                          className="w-72 md:w-[350px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                          onClick={() => setActiveVideo(t.youtube_id)}
                        >
                          <img
                            src={
                              t.image_path
                                ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${t.image_path}`
                                : `https://img.youtube.com/vi/${t.youtube_id}/maxresdefault.jpg`
                            }
                            alt={t.name || "Testimonial"}
                            className="w-full h-48 md:h-64 object-cover"
                            draggable="false"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all cursor-pointer">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M5 3L19 12L5 21V3Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Text & Image Testimonial
                    return (
                      <div
                        key={`testimonial-${t.id}-${idx}`}
                        className="w-80 md:w-[500px] flex-shrink-0 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
                      >
                        <div className="text-gray-700 italic mb-6">
                          {t.content ? (
                            <EditorJsDescription data={t.content} />
                          ) : (
                            <p>No content provided</p>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                          {t.image_path && (
                            <img
                              src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${t.image_path}`}
                              alt={t.name}
                              className="w-16 h-16 rounded-full object-cover shadow-sm"
                              draggable="false"
                            />
                          )}
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {t.name}
                            </h4>
                            <span className="text-sm text-red-600 font-medium">
                              {t.designation}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
