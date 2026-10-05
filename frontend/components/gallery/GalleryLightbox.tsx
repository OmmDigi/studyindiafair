"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { buildVariantSrcSet } from "@/lib/imageVariants";

export interface LightboxItem {
  type: "image" | "video";
  src: string; // image url, or YouTube id for videos
  thumb: string;
  caption?: string;
}

interface GalleryLightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const total = items.length;
  const current = items[index];

  const prev = useCallback(
    () => onChange((index - 1 + total) % total),
    [index, total, onChange]
  );
  const next = useCallback(
    () => onChange((index + 1) % total),
    [index, total, onChange]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  // Lock body scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Keep active thumbnail in view
  useEffect(() => {
    const active = thumbsRef.current?.children[index] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm font-medium tracking-wide">
          {index + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Main slide */}
      <div
        className="relative flex-1 flex items-center justify-center px-4 md:px-20 min-h-0"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {current.type === "video" ? (
          <div
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={current.src}
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${current.src}?rel=0&autoplay=1`}
              title={current.caption || "Gallery Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            key={current.src}
            src={current.src}
            srcSet={buildVariantSrcSet(current.src) ?? undefined}
            sizes="100vw"
            alt={current.caption || "Gallery Image"}
            className="max-w-full max-h-full object-contain rounded-lg select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        )}

        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-orange-500 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-orange-500 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <p className="text-center text-white/90 text-sm md:text-base px-4 pt-3">
          {current.caption}
        </p>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto px-4 py-4 justify-start md:justify-center"
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all ${
                i === index
                  ? "border-orange-500 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
              aria-label={`Go to item ${i + 1}`}
            >
              <img
                src={item.thumb}
                srcSet={
                  item.type === "image"
                    ? buildVariantSrcSet(item.thumb) ?? undefined
                    : undefined
                }
                sizes="80px"
                loading="lazy"
                decoding="async"
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-5 h-5 text-white fill-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
