"use client";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "../why-india/modal/Modal";
import EducationSystemModal from "../why-india/modal/EducationSystemModal";
import WorldClassEducationModal from "../why-india/modal/WorldClassEducationModal";
import PlethoraOfCoursesModal from "../why-india/modal/PlethoraOfCoursesModal";
import CostOfStudyingModal from "../why-india/modal/CostOfStudyingModal";
import TopGlobalCEOsModal from "../why-india/modal/TopGlobalCEOsModal";

const features = [
  {
    title: "India at a Glance",
    link: "/why-india/india-at-a-glance/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-600"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    title: "Education System in India",
    link: "/why-india/education-system-in-india/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-600"
      >
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
      </svg>
    ),
  },
  {
    title: "World-Class Education ...",
    link: "/why-india/world-class-education-at-affordable-cost/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-600"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.43-2.81 3.11-3.14V3.98h2.67v1.95c1.24.26 2.53 1.14 2.82 2.8l-1.95.22c-.17-.97-.9-1.62-2.22-1.62-1.32 0-2.25.68-2.25 1.54 0 .7.42 1.25 2.72 1.81 2.92.73 4.14 1.93 4.14 3.99 0 1.92-1.43 2.96-3.26 3.42z" />
      </svg>
    ),
  },
  {
    title: "Plethora of Courses",
    link: "/why-india/explore-new-fields-of-study/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-600"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Cost of Studying in India",
    link: "/why-india/cost-of-studying-in-india/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-600"
      >
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Scholarship Benefits",
    link: "/scholarship/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-600"
      >
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
    ),
  },
  {
    title: "Top Global CEOs with ...",
    link: "/why-india/top-global-ceos-with-indian-degree/",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-600"
      >
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
];

export default function WhyIndia() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section className="py-3 md:py-6 relative overflow-hidden bg-[#FFF9F2]">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/images/footer-skyline.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* Left Content */}
          <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-blue-700 font-bold tracking-widest text-xs md:text-sm uppercase mb-3">
              Why Study in India?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#0B2046] mb-4 leading-tight">
              A Brighter <br className="hidden lg:block" />
              Tomorrow in{" "}
              <span className="text-orange-500 italic font-serif">India</span>
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8 max-w-sm font-medium">
              Globally recognised education, diverse programs and a vibrant
              learning environment to shape your future.
            </p>
            <Link
              href="/why-india"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-6 py-2.5 font-medium transition-colors"
            >
              Learn More <span>&rarr;</span>
            </Link>
          </div>

          {/* Center Graphic */}
          <div className="w-full lg:w-[20%] flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-orange-100/60 rounded-full blur-3xl -z-10"></div>

            <img
              src="/images/home/why-india-8.png"
              alt="Why India Map"
              className="w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Right Grid of Cards */}
          <div className="w-full lg:w-[35%] flex justify-center lg:justify-end">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
              {features.map((feature, idx) => (
                <Link
                  key={idx}
                  href={feature.link}
                  onClick={(e) => {
                    if (feature.title === "India at a Glance") {
                      e.preventDefault();
                      setActiveModal("glance");
                    } else if (feature.title === "Education System in India") {
                      e.preventDefault();
                      setActiveModal("education");
                    } else if (feature.title === "World-Class Education ...") {
                      e.preventDefault();
                      setActiveModal("world-class");
                    } else if (feature.title === "Plethora of Courses") {
                      e.preventDefault();
                      setActiveModal("plethora-of-courses");
                    } else if (feature.title === "Cost of Studying in India") {
                      e.preventDefault();
                      setActiveModal("cost-of-studying");
                    } else if (feature.title === "Top Global CEOs with ...") {
                      e.preventDefault();
                      setActiveModal("top-global-ceos");
                    }
                  }}
                  className="bg-white rounded-sm p-1 shadow-[0_4px_15px_rgb(0,0,0,0.05)] flex flex-col items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden aspect-square w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] mx-auto"
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300 w-full h-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-[9px] md:text-[10px] font-bold text-[#1B3679] text-center leading-tight mb-4 px-1">
                    {feature.title}
                  </h4>

                  {/* Arrow Icon Indicator */}
                  <div className="absolute bottom-2 right-2 text-orange-500 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16l4-4-4-4" />
                      <path d="M8 12h8" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "glance"}
        onClose={() => setActiveModal(null)}
      />
      <EducationSystemModal
        isOpen={activeModal === "education"}
        onClose={() => setActiveModal(null)}
      />
      <WorldClassEducationModal
        isOpen={activeModal === "world-class"}
        onClose={() => setActiveModal(null)}
      />
      <PlethoraOfCoursesModal
        isOpen={activeModal === "plethora-of-courses"}
        onClose={() => setActiveModal(null)}
      />
      <CostOfStudyingModal
        isOpen={activeModal === "cost-of-studying"}
        onClose={() => setActiveModal(null)}
      />
      <TopGlobalCEOsModal
        isOpen={activeModal === "top-global-ceos"}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
}
