import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/career-guidance/HeroSection";
import CommonChallenges from "@/components/career-guidance/CommonChallenges";
import RightGuidance from "@/components/career-guidance/RightGuidance";
import ExploreCareerOptions from "@/components/career-guidance/ExploreCareerOptions";
import DownloadDirectory from "@/components/career-guidance/DownloadDirectory";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("career-guidance", {
    title: "Career Guidance | Study in India Fair",
    description: "Expert guidance for students to make smart career decisions.",
  });
}

export default function CareerGuidancePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <SeoSchema slug="career-guidance" />
      <HeroSection />
      <CommonChallenges />
      <RightGuidance />
      <ExploreCareerOptions />
      <DownloadDirectory />
    </main>
  );
}
