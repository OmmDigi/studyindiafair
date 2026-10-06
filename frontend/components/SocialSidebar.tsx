"use client";

import React from "react";
import { useSiteSettings } from "@/hooks/api/useSiteSettings";

export default function SocialSidebar() {
  const { data: settings } = useSiteSettings();

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

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-0 shadow-xl">
      {settings.social_links.map((link: any, index: number) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 hover:w-10 transition-all duration-300 w-7 flex justify-center items-center  group border-b border-white/10 last:border-b-0"
          style={{ backgroundColor: getBrandColor(link.name) }}
          title={link.name}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${link.icon_path}`}
            alt={link.name}
            className="w-5 h-5 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
      ))}
    </div>
  );
}
