"use client";

import React from "react";
import { useSiteSettings } from "@/hooks/api/useSiteSettings";

export default function SocialSidebar() {
  const { data: settings } = useSiteSettings();

  if (!settings || !settings.social_links || settings.social_links.length === 0) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 shadow-xl">
      {settings.social_links.map((link: any, index: number) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0B1E43] p-3 hover:w-16 transition-all duration-300 w-12 flex justify-center items-center rounded-r-md group border-b border-white/10 last:border-b-0"
          title={link.name}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ''}${link.icon_path}`}
            alt={link.name}
            className="w-5 h-5 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
      ))}
    </div>
  );
}
