import React from "react";

export default function WorldClassEducation() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              World Class Education At Affordable Cost
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              India has one of the most advanced infrastructure for higher education. Indian degrees are treated with respect all over the world and professionals who have undertaken higher studies in India have made significant contribution to advanced and applied research in different disciplines all over the world. In addition to accommodation, the cost of living expenses (food and others) in India range from USD 100-150 a month, depending on the location.
            </p>
          </div>
          
          {/* Image */}
          <div className="hidden lg:block w-full lg:w-1/3 text-center">
            <img 
              src="/images/why-india/world-class-education.png" 
              alt="World Class Education At Affordable Cost" 
              className="w-full max-w-[280px] mx-auto h-auto animate-[bounce_3s_infinite]" 
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
