import React from "react";

const experiences = [
  {
    img: "/images/why-india/LifeChangingExperience/i1.jpeg",
    icon: "/images/why-india/exp-icon1.png",
    title: "Global Exposure",
    desc: "Interact with peers from different\ncountries and build a truly global network.",
  },
  {
    img: "/images/why-india/LifeChangingExperience/i2.jpeg",
    icon: "/images/why-india/exp-icon2.png",
    title: "Cultural Connection",
    desc: "Experience India's vibrant culture,\ntraditions and diversity.",
  },
  {
    img: "/images/why-india/LifeChangingExperience/i3.jpeg",
    icon: "/images/why-india/exp-icon3.png",
    title: "Future-Ready Courses",
    desc: "Gain industry-relevant skills and\nhands-on experience.",
  },
];

export default function LifeChangingExperience() {
  return (
    <section className="py-2 md:py-3 bg-gradient-to-b from-blue-50/40 to-white">
      <div className="container mx-auto px-4 md:max-w-7xl">
        <div className="mb-2 text-center md:text-left flex items-center justify-center md:justify-start gap-4">
          <div className="h-[1px] w-12 bg-gray-400"></div>
          <span className="uppercase tracking-[0.2em] text-[11px] text-gray-500 font-bold">
            More than a degree
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0B2046] mb-16 text-center md:text-left leading-tight tracking-tight">
          It's a Life-Changing <br />
          <span className="text-[#FF6A28]">Experience.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col group mt-2 md:mt-0"
            >
              <div className="h-56 overflow-hidden rounded-t-xl">
                <img
                  src={exp.img}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={exp.title}
                />
              </div>
              <div className="p-6 pt-0 flex-1 bg-white relative rounded-b-xl">
                <p className="text-gray-500 text-[13px] mb-2 whitespace-pre-line leading-relaxed">
                  {exp.desc}
                </p>

                <button className="absolute bottom-6 right-6 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#FF6A28] hover:border-[#FF6A28] transition-colors">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
