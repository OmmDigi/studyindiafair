import React from "react";

interface DigitalHeroProps {
  heroImage?: string;
  mobileHeroImage?: string;
}

export default function DigitalHero({
  heroImage = "/images/digital-addiction/1.jpeg",
  mobileHeroImage = "/images/digital-addiction/digitaladdiction.jpeg",
}: DigitalHeroProps) {
  return (
    <section className="relative w-full h-[450px] md:h-[500px] bg-slate-20 flex items-center overflow-hidden">
      {/* Background Graphic / Image */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <img
            src={mobileHeroImage}
            alt="Go Digital or Go Dark"
            className="w-full h-full object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* Desktop / Tablet Background */}
        <div className="hidden md:block absolute inset-0">
          <img
            src={heroImage}
            alt="Go Digital or Go Dark"
            className="w-full h-full object-cover object-center lg:object-right"
          />
          {/* Ambient Gradient overlay on the left for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06152d]/90 via-[#06152d]/60 to-transparent lg:w-3/5" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-2 md:py-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            GO DIGITAL <br />
            <span className="text-white">or </span>
            <span className="text-[#ff6929]">GO DARK?</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold text-secondary md:text-white">
            Technology is your tool. The balance is yours.
          </p>
        </div>
      </div>
    </section>
  );
}
