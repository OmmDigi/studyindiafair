import React from "react";

export default function CostOfStudying() {
  return (
    <section className="py-12 md:py-20 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Image */}
          <div className="hidden lg:block w-full lg:w-1/3 text-center">
            <img 
              src="/images/why-india/cost-of-study-india.png" 
              alt="Cost Of Studying In India" 
              className="w-full max-w-[280px] mx-auto h-auto animate-[bounce_3s_infinite]" 
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Cost Of Studying In India
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              Indian Universities offer great value for money compared to anywhere else in the world. The average cost of studying in India is almost one-fourth of that charged in most Western universities.
            </p>
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
