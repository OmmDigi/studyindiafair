import React from "react";
import Image from "next/image";
import { Users, User, FileText, HelpCircle, Map, Brain, Shuffle } from "lucide-react";

const challenges = [
  {
    title: "Peer Pressure",
    icon: Users,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Parent Pressure",
    icon: User,
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
  },
  {
    title: "Information Overload",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Career Confusion",
    icon: HelpCircle,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Course Selection",
    icon: Map,
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop",
  },
  {
    title: "Decision Anxiety",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=2071&auto=format&fit=crop",
  },
  {
    title: "Future Uncertainty",
    icon: Shuffle,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
];

const CommonChallenges = () => {
  return (
    <section className="py-16 bg-[#fdfaf6]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-1 w-12 bg-[#f97316]"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#1e3a8a]">Common </span>
              <span className="text-[#f97316]">Challenges</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            You&apos;re not alone. Many students feel the same way.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col items-center text-center flex-grow">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-[#1e3a8a]">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm text-[#1e3a8a] leading-tight">
                    {challenge.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommonChallenges;
