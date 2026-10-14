import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[450px] md:h-[500px] bg-slate-20 flex items-center overflow-hidden">
      {/* Background Image - Students and India Gate */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/career-guidance/careerguide.jpeg"
            alt="Career Guidance Students"
            fill
            className="object-cover object-[center_top]"
            priority
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>

        {/* Desktop / Tablet Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/career-guidance/1.jpeg"
            alt="Career Guidance Students"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r   md:from-white/20 md:via-white/30 md:to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] leading-tight mb-4">
            <span className="block">Till Grade 12,</span>
            <span className="block">the path seems clear.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-6">
            But once school ends, one big question{" "}
            <br className="hidden md:block" />
            takes centre stage:
          </p>
          <div className="text-4xl md:text-6xl font-bold mb-6 flex items-baseline">
            <span className="text-[#1e3a8a]">WHAT</span>
            <span className="text-[#f97316] ml-2">NEXT?</span>
          </div>
          <div className="text-secondary text-lg md:text-xl font-bold max-w-md">
            Explore. Discover. Get the right guidance for a brighter tomorrow.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
