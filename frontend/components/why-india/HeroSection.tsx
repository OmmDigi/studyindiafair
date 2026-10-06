import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[450px] md:h-[450px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/why-india/herosection/1.jpeg"
          alt="Students"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/70 to-transparent w-full md:w-[60%]"></div>
      </div>

      <div className="container mx-auto px-4 md:max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold text-[#0B2046] leading-[1.05] tracking-tight max-w-2xl">
          From <br />
          Different Roots <br />
          to One Shared <br />
          <span className="text-[#FF6A28] font-serif italic font-medium">
            Purpose.
          </span>
        </h1>
      </div>
    </section>
  );
}
