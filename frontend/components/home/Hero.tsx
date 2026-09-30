"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      desktopVideoRef.current?.pause();
      mobileVideoRef.current?.pause();
    } else {
      desktopVideoRef.current?.play();
      mobileVideoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[80vh] lg:h-[100vh] min-h-[500px] overflow-hidden group">
      {/* Background Videos */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
          className="hidden lg:block absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://studyindiafair.com/wp-content/uploads/2025/12/study-in-india-homepage-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Mobile/Tablet Video */}
        <video
          ref={mobileVideoRef}
          className="block lg:hidden absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://studyindiafair.com/wp-content/uploads/2025/12/study-in-india-homepage-video-for-mobile.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for better button visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full flex flex-col justify-end lg:justify-center items-center pb-2 lg:pb-0">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-auto lg:mt-64">
            <Link
              href="/visitors-registration"
              className="w-full sm:w-auto px-4 py-2 md:py-4 md:px-8 bg-secondary hover:bg-white text-white hover:text-black rounded-full font-bold text-sm md:text-lg uppercase tracking-wide transition-all shadow-lg hover:shadow-red-600/30 hover:-translate-y-1 text-center"
            >
              Visitors Registration
            </Link>
            <Link
              href="/exhibitors"
              className="w-full sm:w-auto px-4 py-2 md:py-4 md:px-8 bg-secondary hover:bg-white text-white hover:text-black rounded-full font-bold text-sm md:text-lg uppercase tracking-wide transition-all shadow-lg hover:shadow-white/30 hover:-translate-y-1 text-center block"
            >
              Exhibitors Registration
            </Link>
          </div>
        </div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 w-12 h-12 bg-black/30 hover:bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all shadow-lg border border-white/20"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
