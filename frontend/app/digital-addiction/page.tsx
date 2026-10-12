import React from "react";
import DigitalHero from "@/components/digital-addiction/DigitalHero";
import NavigatingDigitalLife from "@/components/digital-addiction/NavigatingDigitalLife";
import SignsOfDigitalAddiction from "@/components/digital-addiction/SignsOfDigitalAddiction";
import SimpleWaysToControl from "@/components/digital-addiction/SimpleWaysToControl";
import HowParentsCanHelp from "@/components/digital-addiction/HowParentsCanHelp";
import { generateSEO } from "@/components/SEO";

export const metadata = generateSEO({
  title: "Digital Addiction | Study in India Fair",
  description:
    "GO DIGITAL or GO DARK? Technology is your tool. The balance is yours. Understand digital addiction signs, solutions, and guidance for parents and students.",
});

export default function DigitalAddictionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section: GO DIGITAL or GO DARK? */}
      <DigitalHero heroImage="/images/digital-addiction/1.jpeg" />

      {/* 2. Navigating Digital Life & Quote */}
      <NavigatingDigitalLife quoteImage="/images/digital-addiction/2.jpeg" />

      {/* 3. Signs of Digital Addiction (6 cards) */}
      <SignsOfDigitalAddiction />

      {/* 4. Simple Ways to Be in Control (5 cards) */}
      <SimpleWaysToControl />

      {/* 5. How Parents Can Help (4 items) */}
      <HowParentsCanHelp />
    </main>
  );
}
