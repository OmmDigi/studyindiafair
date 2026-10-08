import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] bg-slate-50 flex items-center overflow-hidden">
      {/* Background Image - Placeholder for students and India Gate */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="Students Background"
          fill
          className="object-cover opacity-30 object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] leading-tight mb-4">
            <span className="block">Till Grade 12,</span>
            <span className="block">the path seems clear.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-6">
            But once school ends, one big question <br className="hidden md:block"/>takes centre stage:
          </p>
          <div className="text-6xl md:text-8xl font-black mb-6 flex items-baseline">
            <span className="text-[#1e3a8a]">WHAT</span>
            <span className="text-[#f97316] ml-2">NEXT?</span>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-md">
            Explore. Discover. Get the right guidance for a brighter tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
