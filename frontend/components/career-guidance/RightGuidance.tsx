import React from "react";
import { Search, Lightbulb, MapPin, Users, Building2, GraduationCap, CheckSquare, TrendingUp } from "lucide-react";

const guidanceSteps = [
  {
    title: "Research your path",
    icon: Search,
  },
  {
    title: "Understand your choices",
    icon: Lightbulb,
  },
  {
    title: "Map your career choice",
    icon: MapPin,
  },
  {
    title: "Take one to one counselling",
    icon: Users,
  },
  {
    title: "Get college insights",
    icon: Building2,
  },
  {
    title: "Avail scholarship facilities",
    icon: GraduationCap,
  },
  {
    title: "Make informed decision",
    icon: CheckSquare,
  },
  {
    title: "Move ahead with clarity & confidence",
    icon: TrendingUp,
  },
];

const RightGuidance = () => {
  return (
    <section className="py-16 bg-[#f0f7ff]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="flex flex-col mb-2">
            <div className="h-1 w-12 bg-[#f97316] mb-2 hidden"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#1e3a8a]">How the </span>
              <span className="text-[#f97316]">Right Guidance </span>
              <span className="text-[#1e3a8a]">Can Help</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Turn confusion into clarity with the right support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {guidanceSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center aspect-square"
              >
                <div className="mb-4 text-[#1e3a8a]">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-[#1e3a8a] leading-tight">
                  {step.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightGuidance;
