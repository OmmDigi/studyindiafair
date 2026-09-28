import ScholarshipContent from "@/components/scholarship/ScholarshipContent";
import React from "react";

export default function ScholarshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary py-8 md:py-16 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary uppercase">
          Scholarship
        </h1>
        <p className="mt-4 text-tertiary-text max-w-2xl mx-auto px-4">
          Grab Your Chance! Apply now and take the first step toward a brighter
          future!
        </p>
      </div>

      <ScholarshipContent />
    </main>
  );
}
