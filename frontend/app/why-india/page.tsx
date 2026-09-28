import React from "react";
import GlobalCEOs from "@/components/why-india/GlobalCEOs";
import IndiaAtAGlance from "@/components/why-india/IndiaAtAGlance";
import CostOfStudying from "@/components/why-india/CostOfStudying";
import WorldClassEducation from "@/components/why-india/WorldClassEducation";
import Scholarship from "@/components/why-india/Scholarship";
import EducationSystem from "@/components/why-india/EducationSystem";
import ExploreNewFields from "@/components/why-india/ExploreNewFields";

export default function WhyIndiaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary py-3 md:py-6 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          Why India
        </h1>
        <p className="mt-4 text-tertiary-text max-w-2xl mx-auto px-4">
          Discover why India is rapidly becoming a global hub for world-class
          education and innovation.
        </p>
      </div>

      <GlobalCEOs />
      <IndiaAtAGlance />
      <CostOfStudying />
      <WorldClassEducation />
      <Scholarship />
      <EducationSystem />
      <ExploreNewFields />
    </main>
  );
}
