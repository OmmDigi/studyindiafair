import React from "react";
import HeroSection from "@/components/career-guidance/HeroSection";
import CommonChallenges from "@/components/career-guidance/CommonChallenges";
import RightGuidance from "@/components/career-guidance/RightGuidance";
import ExploreCareerOptions from "@/components/career-guidance/ExploreCareerOptions";
import DownloadDirectory from "@/components/career-guidance/DownloadDirectory";

export default function CareerGuidancePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <CommonChallenges />
      <RightGuidance />
      <ExploreCareerOptions />
      <DownloadDirectory />
    </main>
  );
}
