import type { Metadata } from "next";
import ScholarshipContent from "@/components/scholarship/ScholarshipContent";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("scholarship", {
    title: "Scholarship | Study in India Fair",
    description: "Scholarships for a brighter tomorrow. Apply for Study in India Fair scholarships.",
  });
}

export default function ScholarshipPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] relative">
      <SeoSchema slug="scholarship" />
      {/* Hero Section */}
      <div className="relative bg-[#001c44] overflow-hidden pt-4 pb-8 lg:pb-16 min-h-[420px] md:min-h-0 flex items-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          {/* Mobile Background */}
          <div
            className="block md:hidden absolute inset-0 bg-cover bg-[center_top] bg-no-repeat"
            style={{
              backgroundImage: "url('/images/scholarship/scholership.jpeg')",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Desktop / Tablet Background */}
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/scholarship/scholarsheep.jpeg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#001c44] via-[#001c44]/80 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-2xl leading-[1.1]">
            Scholarships <br />
            for a <span className="text-[#f15a24]">Brighter</span> <br />
            <span className="text-[#f15a24]">Tomorrow</span>
          </h1>
          <div className="w-24 h-1 bg-[#f15a24] mt-6"></div>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('/images/scholarship/scholershipform.jpeg')" }}
      >
        <ScholarshipContent />
      </div>
    </main>
  );
}
