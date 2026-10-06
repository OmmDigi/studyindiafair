import React from "react";

const reasons = [
  {
    id: "01",
    icon: "/images/why-india/topreason/1.jpeg",
    title: "Study at\n1/4 the Cost",
    desc: "World-class education\nat an affordable cost.",
  },
  {
    id: "02",
    icon: "/images/why-india/topreason/2-removebg-preview.png",
    title: "300+\nFuture-Ready Courses",
    desc: "From traditional to\nnew-age programs.",
  },
  {
    id: "03",
    icon: "/images/why-india/topreason/3-removebg-preview.png",
    title: "Global Degrees\nwith Wider Opportunities",
    desc: "Gain a globally recognised\ndegree and expand\nyour horizons.",
  },
  {
    id: "04",
    icon: "/images/why-india/topreason/4-removebg-preview.png",
    title: "Learn Beyond\nAcademics",
    desc: "Practical learning,\ninnovation and\nholistic development.",
  },
  {
    id: "05",
    icon: "/images/why-india/topreason/5-removebg-preview.png",
    title: "Scholarships\nThat Empower",
    desc: "Up to 100% merit-based\nscholarships.",
  },
  {
    id: "06",
    icon: "/images/why-india/topreason/6-removebg-preview.png",
    title: "Experience\nIndia's Diversity",
    desc: "A vibrant mix of cultures,\nlanguages and people.",
  },
  {
    id: "07",
    icon: "/images/why-india/topreason/7.jpeg",
    title: "Join a Global\nAlumni Network",
    desc: "Be part of a growing\nglobal community.",
  },
  {
    id: "08",
    icon: "/images/why-india/topreason/8-removebg-preview.png",
    title: "Live More,\nSpend Less",
    desc: "High-quality education\nand lifestyle at great value.",
  },
  {
    id: "09",
    icon: "/images/why-india/topreason/9.jpeg",
    title: "A Home\nAway From Home",
    desc: "A safe, welcoming and\nstudent-friendly environment.",
  },
  {
    id: "10",
    icon: "/images/why-india/topreason/10.jpeg",
    title: "Education Beyond\nthe Classroom",
    desc: "It gives you global exposure,\nnew perspectives and the\nconfidence to shape your future.",
  },
];

export default function TopReasons() {
  return (
    <section className="py-2 md:py-6 container mx-auto px-4 md:max-w-7xl">
      <h2 className="text-3xl md:text-[40px] font-bold text-[#0B2046] mb-2 md:mb-3 text-center md:text-left leading-tight">
        Your Top 10 Reasons to{" "}
        <span className="text-[#FF6A28]">Choose India.</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-gray-100 gap-2">
        {reasons.map((r) => (
          <div
            key={r.id}
            className="p-1 flex flex-col items-center text-center rounded-sm border border-gray-300 relative bg-white hover:bg-orange-50/20 transition-colors group"
          >
            <span className="absolute top-2 left-2 text-[#0B2046] font-bold text-lg">
              {r.id}
            </span>
            <img
              src={r.icon}
              alt={r.title}
              className="w-22 h-22 object-contain mb-4 mt-2 group-hover:scale-110 transition-transform duration-300"
            />
            <h3 className="text-[#0B2046] font-bold text-sm mb-2 whitespace-pre-line leading-tight">
              {r.title}
            </h3>
            <p className="text-[#555] text-[11px] whitespace-pre-line leading-relaxed">
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
