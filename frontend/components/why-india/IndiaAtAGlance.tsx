import React from "react";

export default function IndiaAtAGlance() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              India At A Glance
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              A diverse country with a variety of people and culture, India attracts thousands of students from across the globe, thus providing opportunities for a multicultural interaction. Interacting with people from different cultures teaches tolerance, acceptance of diversity and helps to build close cultural connections, which consequently aids in the promoting teamwork and confidence. India’s world-class education system, which is regulated and monitored by the government, further makes the country a popular destination for foreign students pursuing higher education. Most of the students who go to India prefer engineering & IT, followed by management and medical.
            </p>
          </div>
          
          {/* Image */}
          <div className="hidden lg:block w-full lg:w-1/3 text-center">
            <img 
              src="/images/why-india/india-at-a-glance.png" 
              alt="India At A Glance" 
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
