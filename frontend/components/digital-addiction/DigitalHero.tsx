import React from "react";

interface DigitalHeroProps {
  heroImage?: string;
}

export default function DigitalHero({
  heroImage = "/images/digital-addiction/1.jpeg",
}: DigitalHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#06152d] text-white py-10 md:py-16 border-b border-blue-950/40">
      {/* Background Graphic / Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Go Digital or Go Dark"
          className="w-full h-full object-cover object-center lg:object-right"
        />

        {/* Ambient Gradient overlay on the left for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06152d]/90 via-[#06152d]/60 to-transparent lg:w-3/5" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-2 md:py-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            GO DIGITAL <br />
            <span className="text-white">or </span>
            <span className="text-[#ff6929]">GO DARK?</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-normal text-gray-200">
            Technology is your tool. The balance is yours.
          </p>
        </div>
      </div>
    </section>
  );
}
