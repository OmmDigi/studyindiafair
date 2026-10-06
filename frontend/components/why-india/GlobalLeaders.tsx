import React from 'react';

const ceos = [
  { name: "Sundar Pichai", role: "CEO, Google", logo: "/images/why-india/google_logo.svg", image: "/images/why-india/ceo1.png" },
  { name: "Satya Nadella", role: "CEO, Microsoft", logo: "/images/why-india/Microsoft_logo.svg", image: "/images/why-india/ceo2.png" },
  { name: "Neal Mohan", role: "CEO, YouTube", logo: "/images/why-india/youtube_logo.png", image: "/images/why-india/ceo3.png" },
  { name: "Leena Nair", role: "CEO, Chanel", logo: "/images/why-india/chanel_logo.png", image: "/images/why-india/ceo4.png" },
  { name: "Arvind Krishna", role: "CEO, IBM", logo: "/images/why-india/IBM_logo_in.svg", image: "/images/why-india/ceo5.png" },
  { name: "Shailesh Jejurikar", role: "COO, P&G", logo: "/images/why-india/pg_logo.png", image: "/images/why-india/ceo6.png" },
  { name: "Anil Chakravarthy", role: "CEO, Adobe", logo: "/images/why-india/Adobe_Corporate_Logo.svg", image: "/images/why-india/ceo7.png" },
];

export default function GlobalLeaders() {
  return (
    <section className="py-16 container mx-auto px-4 md:max-w-7xl border-b border-gray-100">
      <h2 className="text-4xl md:text-5xl font-bold text-[#0B2046] mb-12 text-center md:text-left leading-tight">
        Learn in India, <span className="text-[#FF6A28]">Lead Globally.</span>
      </h2>
      <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-4">
        {ceos.map((ceo, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-8 mb-4 flex items-center justify-center">
              <img src={ceo.logo} className="max-h-full max-w-[80px] object-contain" alt={`${ceo.name} company`} />
            </div>
            <div className="flex items-center gap-3">
              <img src={ceo.image} className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-100" alt={ceo.name} />
              <div className="text-left">
                <h4 className="text-[13px] font-bold text-[#0B2046] leading-tight">{ceo.name}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">{ceo.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
