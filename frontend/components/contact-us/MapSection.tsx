"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/api";

export default function MapSection() {
  const { data: siteSettings } = useSiteSettings();

  const addressItem = siteSettings?.addresses?.[0];
  const addressText =
    addressItem?.address ||
    addressItem?.label ||
    "P287 Darga road, Ground floor, Park Circus, near 4 no. bridge, Kolkata 700017";

  const googleMapsDirectionsUrl =
    addressItem?.map_link && addressItem.map_link.startsWith("http")
      ? addressItem.map_link
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText)}`;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressText)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="relative w-full bg-[#f4f8fb] border-t border-slate-100 overflow-hidden">
      <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[450px] overflow-hidden">
        {/* Live Google Map with Address Pointer */}
        <iframe
          src={mapEmbedUrl}
          className="w-full h-full border-0 absolute inset-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Corporate Office Location"
        />

        {/* Floating Right Card: Find Our Office */}
        <div className="absolute top-6 right-4 sm:right-8 lg:right-14 z-10 max-w-sm sm:max-w-md bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-xl shadow-slate-900/15 border border-white/80">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b1d42] mb-1.5">
            Find Our Office
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
            {addressText}
          </p>
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ff5722] hover:bg-[#e64a19] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
