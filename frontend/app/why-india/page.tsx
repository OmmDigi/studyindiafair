import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/why-india/HeroSection";
import TopReasons from "@/components/why-india/TopReasons";
import LifeChangingExperience from "@/components/why-india/LifeChangingExperience";
import GlobalLeaders from "@/components/why-india/GlobalLeaders";
import IndiaAtAGlance from "@/components/why-india/IndiaAtAGlance";
import GlobalCEOs from "@/components/why-india/GlobalCEOs";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("why-india", {
    title: "Why India | Study in India Fair",
    description: "Discover why studying in India is a life-changing educational experience.",
  });
}

export default function WhyIndiaPage() {
  return (
    <main className="min-h-screen bg-white">
      <SeoSchema slug="why-india" />
      <HeroSection />
      <TopReasons />
      <LifeChangingExperience />
      <GlobalCEOs />
      <IndiaAtAGlance />
    </main>
  );
}
