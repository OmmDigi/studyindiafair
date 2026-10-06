import React from "react";

const factsLeft = [
  {
    icon: "/images/why-india/IndiaAtAGlance/l1.jpeg",
    label: "Capital",
    value: "New Delhi",
    subValue: "",
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/l2.jpeg",
    label: "Population",
    value: "1.4+ Billion",
    subValue: "(World's largest)",
    highlight: true,
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/l3.jpeg",
    label: "GDP (Nominal)",
    value: "USD 3.7 Trillion",
    subValue: "(World's 5th largest)",
    highlight: true,
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/l4.jpeg",
    label: "Largest Economy",
    value: "5th",
    subValue: "in the World",
    highlight: true,
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/l5.jpeg",
    label: "Official Language",
    value: "22",
    subValue: "Official Languages",
    highlight: true,
  },
];

const factsRight = [
  {
    icon: "/images/why-india/IndiaAtAGlance/r1.jpeg",
    value: "1,000+",
    desc: "Universities & Higher\nEducation Institutions",
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/r2.jpeg",
    value: "50+",
    desc: "Globally Ranked Universities\n(QS World Rankings 2026)",
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/r3.jpeg",
    value: "4th",
    desc: "in IT & Engineering Talent\n(Global Talent Competitiveness Index)",
  },
  {
    icon: "/images/why-india/IndiaAtAGlance/r4.jpeg",
    value: "3rd",
    desc: "Largest Startup Ecosystem\n(Global Startup Ecosystem Index)",
  },
];

export default function IndiaAtAGlance() {
  return (
    <section className="py-2 md:py-3 bg-gradient-to-br from-blue-50/60 via-white to-orange-50/40 relative">
      <div className="container mx-auto px-4 md:max-w-9xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* Left Column */}
          <div className="w-full lg:w-[32%] flex flex-col gap-1">
            <h2 className="text-4xl md:text-[50px] font-bold text-[#0B2046] mb-6 text-center lg:text-left leading-tight tracking-tight">
              India at a <span className="text-[#FF6A28]">Glance</span>
            </h2>
            {factsLeft.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 py-1 px-3 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50/50"
              >
                <div className="w-8 flex justify-center flex-shrink-0">
                  <img
                    src={item.icon}
                    className="max-w-[54px] max-h-[54px] object-contain"
                    alt=""
                  />
                </div>
                <div className="w-32 flex-shrink-0">
                  <span className="text-[13px] text-[#0B2046] font-medium">
                    {item.label}
                  </span>
                </div>
                <div className="flex-1">
                  <div
                    className={`text-[15px] ${item.highlight ? "text-[#FF6A28] font-bold" : "text-[#0B2046] font-bold"}`}
                  >
                    {item.value}
                  </div>
                  {item.subValue && (
                    <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                      {item.subValue}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Center Image (Map) */}
          <div className="w-full lg:w-[36%] flex justify-center py-8 lg:py-0 mt-2 lg:mt-3">
            <img
              src="/images/why-india/IndiaAtAGlance\m1.png"
              className="w-full max-w-[340px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              alt="Map of India"
            />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[32%] flex flex-col gap-1 mt-2 lg:mt-3">
            {factsRight.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50/50 p-2"
              >
                <div className="w-10 flex justify-center flex-shrink-0">
                  <img
                    src={item.icon}
                    className="max-w-[56px] max-h-[56px] object-contain"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#FF6A28] font-bold text-[22px] leading-none mb-1.5">
                    {item.value}
                  </span>
                  <span className="text-[13px] text-[#0B2046] font-medium whitespace-pre-line leading-snug">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
