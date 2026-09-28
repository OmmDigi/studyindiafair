import React from "react";
import DigitalAddictionContent from "@/components/digital-addiction/DigitalAddictionContent";
import DigitalAddictionEffects from "@/components/digital-addiction/DigitalAddictionEffects";
import DigitalAddictionSolutions from "@/components/digital-addiction/DigitalAddictionSolutions";
import DigitalAddictionFinalAdvice from "@/components/digital-addiction/DigitalAddictionFinalAdvice";
import DigitalAddictionParentsHelp from "@/components/digital-addiction/DigitalAddictionParentsHelp";

export default function DigitalAddictionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary py-8 md:py-16 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          Digital Addiction
        </h1>
        <p className="mt-4 text-tertiary-text max-w-2xl mx-auto px-4">
          Understanding the impact of digital device overuse and how to identify
          the signs of smartphone dependency.
        </p>
      </div>

      <DigitalAddictionContent />
      <DigitalAddictionEffects />
      <DigitalAddictionSolutions />
      <DigitalAddictionFinalAdvice />
      <DigitalAddictionParentsHelp />
    </main>
  );
}
