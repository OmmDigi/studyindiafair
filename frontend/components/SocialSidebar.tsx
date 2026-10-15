"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSiteSettings } from "@/hooks/api/useSiteSettings";

export default function SocialSidebar() {
  const { data: settings } = useSiteSettings();
  const [side, setSide] = useState<"left" | "right">("left");
  const [topPercent, setTopPercent] = useState<number>(50);
  const currentTopRef = useRef<number>(50); // percentage
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialTopPx: number;
    deltaX: number;
    deltaY: number;
    moved: boolean;
  }>({
    startX: 0,
    startY: 0,
    initialTopPx: 0,
    deltaX: 0,
    deltaY: 0,
    moved: false,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const rAFRef = useRef<number | null>(null);

  if (!settings || !settings.social_links || settings.social_links.length === 0)
    return null;

  const getBrandColor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("facebook")) return "#1877F2";
    if (n.includes("twitter") || n === "x") return "#000000";
    if (n.includes("instagram")) return "#E4405F";
    if (n.includes("linkedin")) return "#0A66C2";
    if (n.includes("youtube")) return "#FF0000";
    if (n.includes("whatsapp")) return "#25D366";
    if (n.includes("telegram")) return "#229ED9";
    return "#0B1E43";
  };

  const updatePosition = () => {
    if (!sidebarRef.current || !isDraggingRef.current) return;
    const { deltaX, deltaY } = dragStartRef.current;
    sidebarRef.current.style.transform = `translate3d(${deltaX}px, calc(-50% + ${deltaY}px), 0)`;
    rAFRef.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left click
    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {}

    const rect = target.getBoundingClientRect();
    const initialTop = rect.top + rect.height / 2;

    isDraggingRef.current = true;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialTopPx: initialTop,
      deltaX: 0,
      deltaY: 0,
      moved: false,
    };

    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "none";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    dragStartRef.current.deltaX = deltaX;
    dragStartRef.current.deltaY = deltaY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      dragStartRef.current.moved = true;
    }

    if (!rAFRef.current) {
      rAFRef.current = requestAnimationFrame(updatePosition);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
      rAFRef.current = null;
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    const threshold = Math.min(200, windowWidth * 0.2);

    const { deltaX, deltaY, initialTopPx } = dragStartRef.current;

    // Horizontal snap
    let nextSide = side;
    if (side === "left" && deltaX > threshold) {
      nextSide = "right";
    } else if (side === "right" && deltaX < -threshold) {
      nextSide = "left";
    }
    setSide(nextSide);

    // Vertical clamping
    const newTopPx = initialTopPx + deltaY;
    const clampedPx = Math.max(60, Math.min(windowHeight - 60, newTopPx));
    const newPercent = (clampedPx / windowHeight) * 100;
    currentTopRef.current = newPercent;
    setTopPercent(newPercent);

    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)";
      sidebarRef.current.style.transform = "translateY(-50%)";
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed z-50 flex flex-col gap-0 shadow-xl ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{
        top: `${topPercent}%`,
        transform: "translateY(-50%)",
        transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
        borderRadius: side === "left" ? "0 8px 8px 0" : "8px 0 0 8px",
        overflow: "hidden",
        willChange: "transform, top",
      }}
    >
      {/* Drag handle */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="flex items-center justify-center py-1.5 bg-black/60 text-white cursor-grab active:cursor-grabbing hover:bg-black/80 transition-colors touch-none select-none"
        title="Drag to reposition (left/right or up/down)"
      >
        <div className="w-4 h-1 bg-white/80 rounded-full" />
      </div>

      {settings.social_links.map((link: any, index: number) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 md:p-1 md:hover:w-10 transition-all duration-300 w-8 md:w-7 flex justify-center items-center group border-b border-white/10"
          style={{ backgroundColor: getBrandColor(link.name) }}
          title={link.name}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${link.icon_path}`}
            alt={link.name}
            className="w-5 h-5 object-contain pointer-events-none"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
      ))}

      {/* Static Email Contact */}
      <a
        href="mailto:info@sapeevents.com"
        className="p-1.5 md:p-1 md:hover:w-10 transition-all duration-300 w-8 md:w-7 flex justify-center items-center group border-b border-white/10 last:border-b-0 bg-[#ea4335] hover:bg-[#d93025]"
        title="Email us at info@sapeevents.com"
      >
        <svg
          className="w-4 h-4 md:w-4 md:h-4 text-white pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </a>
    </div>
  );
}
