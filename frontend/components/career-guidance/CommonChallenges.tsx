import React from "react";
import Image from "next/image";
import { Users, FileText, HelpCircle, Brain, Shuffle } from "lucide-react";

const challenges = [
  {
    title: "Peer Pressure",
    icon: Users,
    image: "/images/career-guidance/CommonChallenges/peer pressure.jpeg",
  },
  {
    title: "Information Overload",
    icon: FileText,
    image:
      "/images/career-guidance/CommonChallenges/Information overload.jpeg",
  },
  {
    title: "Career Confusion",
    icon: HelpCircle,
    image: "/images/career-guidance/CommonChallenges/Career confusion.jpeg",
  },
  {
    title: "Decision Anxiety",
    icon: Brain,
    image: "/images/career-guidance/CommonChallenges/Decision anxiety.jpeg",
  },
  {
    title: "Future Uncertainty",
    icon: Shuffle,
    image:
      "/images/career-guidance/CommonChallenges/Future uncertainty.jpeg",
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col items-center text-center flex-grow">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-[#1e3a8a] group-hover:bg-[#f97316]/10 group-hover:text-[#f97316] transition-colors">
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
