"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Hls from "hls.js";

const DESKTOP_SRC = "/uploads/m3u8-hero-banner-desktop/master.m3u8";
const MOBILE_SRC = "/uploads/m3u8-hero-banner-mobile/master.m3u8";
const DESKTOP_POSTER = "/uploads/m3u8-hero-banner-desktop/poster.webp";
const MOBILE_POSTER = "/uploads/m3u8-hero-banner-mobile/poster.webp";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mql = window.matchMedia("(min-width: 1024px)");
    let hls: Hls | null = null;

    const loadSource = () => {
      const src = mql.matches ? DESKTOP_SRC : MOBILE_SRC;

      hls?.destroy();
      hls = null;
      setIsVideoReady(false);

      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          capLevelToPlayerSize: true,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari / iOS native HLS
        video.src = src;
      }

      video.play().catch(() => {});
      setIsPlaying(true);
    };

    loadSource();
    mql.addEventListener("change", loadSource);

    return () => {
      mql.removeEventListener("change", loadSource);
      hls?.destroy();
    };
  }, []);

  return (
    <div className="relative aspect-[9/16] lg:aspect-video overflow-hidden group">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => setIsVideoReady(true)}
        />

        {/* Poster shown until the first video frame plays */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={DESKTOP_POSTER} />
          <img
            src={MOBILE_POSTER}
            alt=""
            fetchPriority="high"
            className={`absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
              isVideoReady ? "opacity-0" : "opacity-100"
            }`}
          />
        </picture>

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
