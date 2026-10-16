import React from "react";
import Image from "next/image";

const guidanceSteps = [
  {
    title: "Research your path",
    image: "/images/career-guidance/RightGuidance/Research your path.jpeg",
  },
  {
    title: "Understand your career choices",
    image:
      "/images/career-guidance/RightGuidance/Understand your career choices.jpeg",
  },
  {
    title: "Take one on one career counselling",
    image:
      "/images/career-guidance/RightGuidance/Take one on one career counselling.jpeg",
  },
  {
    title: "Get your college insights",
    image:
      "/images/career-guidance/RightGuidance/Get your college insights.jpeg",
  },
  {
    title: "Research well to avail scholarships",
    image:
      "/images/career-guidance/RightGuidance/Research well to avail scholarships.jpeg",
  },
  {
    title: "Make informed decisions",
    image: "/images/career-guidance/RightGuidance/Make informed decisions.jpeg",
  },
  {
    title: "Move forward with clarity & confidence",
    image: "/images/career-guidance/RightGuidance/Move forward.jpeg",
  },
];

const RightGuidance = () => {
  return (
    <section className="py-8 bg-[#f0f7ff]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="flex flex-col mb-2">
            <div className="h-1 w-12 bg-[#f97316] mb-2 hidden"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#1e3a8a]">How the </span>
              <span className="text-[#f97316]">Right Guidance </span>
              <span className="text-[#1e3a8a]">Can Help</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Turn confusion into clarity with the right support.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {guidanceSteps.map((step, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center group hover:-translate-y-1"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-[#1e3a8a] leading-snug">
                  {step.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightGuidance;
