import AboutContent from "@/components/about/AboutContent";
import OurMission from "@/components/about/OurMission";
import EventPlanning from "@/components/about/EventPlanning";
import Specialization from "@/components/about/Specialization";
import AboutBanner from "@/components/about/AboutBanner";
import Team from "@/components/about/Team";

export default function AboutPage() {
  return (
    <main>
      {/* Page Header */}
      <div className="bg-primary py-3 md:py-6 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          About - US
        </h1>
      </div>
      {/* Page Content */}
      <AboutContent />
      <OurMission />
      <EventPlanning />
      <AboutBanner />
      <Specialization />
      <Team />
    </main>
  );
}
