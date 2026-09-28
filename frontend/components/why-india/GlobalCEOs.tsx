import React from "react";

const ceos = [
  {
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    image:
      "/images/why-india/why-india-img1.png",
    logo: "/images/why-india/Microsoft_logo.svg",
  },
  {
    name: "Shantanu Narayen",
    role: "CEO of Adobe Inc.",
    image:
      "/images/why-india/why-india-img2.png",
    logo: "/images/why-india/Adobe_Corporate_Logo.svg",
  },
  {
    name: "Sundar Pichai",
    role: "CEO of Google",
    image:
      "/images/why-india/why-india-img3.png",
    logo: "/images/why-india/google_logo.svg",
  },
  {
    name: "Leena Nair",
    role: "CEO of Chanel Group",
    image:
      "/images/why-india/why-india-img4.png",
    logo: "/images/why-india/g2452.svg",
  },
  {
    name: "Ajaypal Singh Bagha",
    role: "President of World Bank",
    image:
      "/images/why-india/why-india-img5.png",
    logo: "/images/why-india/world-bank.svg",
  },
  {
    name: "Arvind Krishna",
    role: "CEO of IBM",
    image:
      "/images/why-india/why-india-img6.png",
    logo: "/images/why-india/IBM_logo_in.svg",
  },
];

export default function GlobalCEOs() {
  return (
    <section className=" relative bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Top Global CEO&apos;s With Indian Degree
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-center">
          {ceos.map((ceo, index) => (
            <div
              key={index}
              className="bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-300 border border-slate-100 flex"
            >
              <div className="w-50 aspect-[3/3] rounded-t-2xl overflow-hidden bg-gray-100 relative">
                <img
                  src={ceo.image}
                  alt={ceo.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-0 relative flex flex-col items-center flex-1 justify-center bg-white rounded-b-2xl">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center p-3  border border-slate-100">
                  <img
                    src={ceo.logo}
                    alt={`${ceo.name} Company Logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="mt-6">
                  <h5 className="text-lg font-bold text-slate-900 mb-1">
                    {ceo.name}
                  </h5>
                  <span className="text-sm font-medium text-red-600">
                    {ceo.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
