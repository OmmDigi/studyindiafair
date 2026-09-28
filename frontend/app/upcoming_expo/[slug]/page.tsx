"use client";

import { useUpcomingEvent } from "@/hooks/api";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function EventDetailsPage() {
  const { slug } = useParams();
  const { data: event, isLoading } = useUpcomingEvent(slug as string);

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use real data if available from the API, otherwise fallback to mock logos
  const apiLogos = event?.university_logos || [];
  const baseLogos = apiLogos.length > 0 ? apiLogos : Array(6).fill({ path: "/images/common/Study-in-India-fair-logo.png" });
  
  // Duplicate array multiple times to ensure the carousel has enough content for a seamless infinite scroll, even if there are only 1-2 logos
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-secondary font-medium">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl text-gray-600">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative w-full py-20 lg:py-32 bg-cover bg-center"
        style={{
          backgroundImage: event.images?.[0]?.path 
            ? `url(${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${event.images[0].path})` 
            : "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')"
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        
        <div className="container mx-auto px-4 md:max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg leading-tight">{event.name}</h1>
            
            <div className="space-y-4 text-lg md:text-xl font-medium drop-shadow-md">
              {event.schedules?.map((schedule: any, idx: number) => (
                <div key={idx} className="bg-black/30 p-5 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-start gap-4 mb-3">
                     <svg className="w-6 h-6 shrink-0 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                     <span><strong className="text-orange-400">Venue:</strong> {schedule.location}</span>
                  </div>
                  <div className="flex items-start gap-4">
                     <svg className="w-6 h-6 shrink-0 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                     <span><strong className="text-orange-400">Date:</strong> {schedule.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content: Registration Form */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
            <h2 className="text-2xl font-bold text-orange-600 mb-6 pb-2 border-b border-gray-100">Register Now</h2>
            <form className="space-y-4 text-gray-800" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input type="text" placeholder="Full Name*" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors" required />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Email*" className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors" required />
                <div className="flex w-full sm:w-1/2 gap-2">
                  <select className="border border-gray-300 rounded-lg px-2 py-3 bg-white text-gray-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm w-20 shrink-0 transition-colors">
                    <option value="+91">🇮🇳 +91</option>
                  </select>
                  <input type="tel" placeholder="Phone No." className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors" required />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Your City" className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors" />
                <select className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors">
                  <option value="">Select Course</option>
                  <option value="ug">Undergraduate</option>
                  <option value="pg">Postgraduate</option>
                </select>
              </div>
              
              <div className="flex items-start gap-3 pt-2">
                <input type="checkbox" id="agree" className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-secondary cursor-pointer" required />
                <label htmlFor="agree" className="text-[12px] text-gray-600 leading-tight cursor-pointer">
                  I agree to receive notifications from Study In India Fairs through call, email, SMS & WhatsApp.
                </label>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between bg-gray-50 mt-2">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-6 w-6 rounded border-gray-300 text-blue-600 cursor-pointer" />
                  <span className="text-xs font-medium text-gray-700">I'm not a robot</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285f4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>
                  <span className="text-[10px] text-gray-500 mt-1">reCAPTCHA</span>
                </div>
              </div>

              <button type="submit" className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-10 rounded-full transition-colors text-sm shadow-md mt-4 inline-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Participating Universities */}
      <div className="py-20 bg-white container mx-auto px-4 max-w-7xl border-b border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-12">
          <div className="md:w-1/3 text-center md:text-left z-10">
            <h2 className="text-4xl font-bold text-secondary mb-4 leading-tight">Participating<br/><span className="text-orange-500">Universities</span></h2>
            <p className="text-base text-gray-600">Explore the prestigious Indian Universities joining us at our upcoming fair.</p>
          </div>
          
          <div className="md:w-2/3 w-full relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6 w-max py-4">
                {logos.map((logoItem: any, index: number) => {
                  const imageSrc = logoItem.path && !logoItem.path.startsWith("/images")
                    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${logoItem.path}`
                    : logoItem.path;
                    
                  return (
                    <a
                      key={index}
                      href={logoItem.link || "#"}
                      target={logoItem.link ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-40 h-24 flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 cursor-pointer p-4"
                    >
                      <img
                        src={imageSrc}
                        alt={logoItem.alt_text || `University Logo ${index + 1}`}
                        className="opacity-80 object-contain w-full h-full transition-all duration-500"
                        draggable="false"
                      />
                    </a>
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
      
      {/* Upcoming Expo */}
      <div className="bg-[#FDF8F3] py-20">
         <div className="container mx-auto px-4 max-w-7xl text-center mb-12">
           <h2 className="text-4xl font-bold text-secondary mb-6">Upcoming Expo</h2>
           <p className="text-gray-600 max-w-2xl mx-auto text-lg">Study in India Education Fairs brings a common platform where students can directly engage with premier Indian Institutions seeking quality education options.</p>
         </div>
         {/* Render the component without its own header */}
         <UpcomingEvents hideHeader={true} />
      </div>
    </div>
  );
}
