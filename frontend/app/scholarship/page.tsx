import ScholarshipContent from "@/components/scholarship/ScholarshipContent";

export default function ScholarshipPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] relative">
      {/* Hero Section */}
      <div
        className="relative bg-[#001c44] overflow-hidden pt-4 pb-8 lg:pb-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/scholarship/scholarsheep.jpeg')",
        }}
      >
        {/* Dark gradient overlay on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001c44] via-[#001c44]/80 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
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
