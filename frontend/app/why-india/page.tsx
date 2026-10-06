import React from "react";
import HeroSection from "@/components/why-india/HeroSection";
import TopReasons from "@/components/why-india/TopReasons";
import LifeChangingExperience from "@/components/why-india/LifeChangingExperience";
import GlobalLeaders from "@/components/why-india/GlobalLeaders";
import IndiaAtAGlance from "@/components/why-india/IndiaAtAGlance";
import GlobalCEOs from "@/components/why-india/GlobalCEOs";

export default function WhyIndiaPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <TopReasons />
      <LifeChangingExperience />
      <GlobalCEOs />
      <IndiaAtAGlance />
    </main>
  );
}
