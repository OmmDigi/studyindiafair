import React from "react";

export default function ExploreNewFields() {
  return (
    <section className="py-12 md:py-20 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Image */}
          <div className="hidden lg:block w-full lg:w-1/3 text-center">
            <img 
              src="/images/why-india/explore-new-field-of-study.png" 
              alt="Explore New Fields Of Study" 
              className="w-full max-w-[280px] mx-auto h-auto animate-[bounce_3s_infinite]" 
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Explore New Fields Of Study
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              <p>
                It exposes students to global perspectives and encourages them to embrace opportunities and experiences beyond their home countries.
              </p>
              <p>
                Choose the best way to find your top ranked university in Study In India Education Fair.
              </p>
              <p>
                The Government of India provides a number of scholarships for foreign students. However, students can also get information about additional scholarships offered from visiting India Education fair.
              </p>
              <p>
                Every year, India’s vast higher education system attracts large numbers of enthusiastic knowledge seekers from various parts of the world, particularly from fellow developing countries. The Indian education system has established a strong position internationally, both in terms of range and quality, and currently ranks amongst the top three in the world in terms of number of educational institutions.
              </p>
            </div>
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
