import React from "react";
import HowToChooseCourse from "@/components/career-guidance/HowToChooseCourse";
import SmartCareerDecisions from "@/components/career-guidance/SmartCareerDecisions";

export default function CareerGuidancePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary py-3 md:py-6 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          Career Guidance
        </h1>
        <p className="mt-4 text-tertiary-text max-w-2xl mx-auto px-4">
          Discover the right path for your future and make informed decisions
          about your career.
        </p>
      </div>

      <HowToChooseCourse />
      <SmartCareerDecisions />
    </main>
  );
}
