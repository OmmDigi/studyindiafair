import React from "react";

interface ContactHeroProps {
  heroImage?: string;
}

export default function ContactHero({
  heroImage = "/images/contact-us/1.jpeg",
}: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#071633] text-white py-12 md:py-16 lg:py-20 border-b border-blue-950/40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Contact Us Background"
          className="w-full h-full object-cover object-center lg:object-right"
        />
        {/* Subtle overlay on the left to guarantee optimal contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071633]/85 via-[#071633]/50 to-transparent lg:via-[#071633]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl py-2 md:py-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Contact <span className="text-[#ff6929]">Us</span>
          </h1>
          <div className="mt-3.5 space-y-1 text-base sm:text-lg lg:text-xl font-normal text-gray-200">
            <p>We&apos;d love to hear from you.</p>
            <p className="text-gray-300">Let&apos;s start a conversation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
