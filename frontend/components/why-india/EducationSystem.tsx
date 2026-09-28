import React from "react";

export default function EducationSystem() {
  return (
    <section className="py-12 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Education System In India
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              <p>
                World class education at affordable cost
                India leads the world in the production of world-class professionals and indian institutions both public &amp; private are emerging as centres of attraction for students around the world.
              </p>
              <p>
                Education in india is not only comparable to the best institutions in The world but also available at a relatively affordable cost. The high Quality of education at affordable cost.
              </p>
              <p>
                India has one of the most advanced infrastructure for higher education. Indian degrees are treated with respect all over the world and professionals who have undertaken higher studies in India have made significant contribution to advanced and applied research in different disciplines all over the world.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="hidden lg:block w-full lg:w-1/3 text-center">
            <img 
              src="/images/why-india/education-system-in-india-scaled.png" 
              alt="Education System In India" 
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
