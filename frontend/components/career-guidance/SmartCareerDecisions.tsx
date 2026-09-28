import React from "react";
import { 
  User, 
  Search, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  Briefcase 
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discover Your Strengths",
    description: "Know yourself–your Strengths, Values, Personality, Passion and Skills. This will help you decide which choice best fits you.",
    icon: <User className="w-8 h-8 text-white" />,
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "Research Your Path",
    description: "Make a list of occupations to explore, Research extensively, Course prospects, Pay Attention to details.",
    icon: <Search className="w-8 h-8 text-white" />,
    bgColor: "bg-indigo-600",
  },
  {
    id: 3,
    title: "Identify your goal",
    description: "Set a clear goal to stay focused and move in the right direction.",
    icon: <Target className="w-8 h-8 text-white" />,
    bgColor: "bg-violet-600",
  },
  {
    id: 4,
    title: "Understand Your Choices",
    description: "Know your options and learn about each one. To learn about occupations.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    bgColor: "bg-purple-600",
  },
  {
    id: 5,
    title: "Make a good decision",
    description: "Evaluate your options carefully and choose the path that aligns best with your goals.",
    icon: <CheckCircle2 className="w-8 h-8 text-white" />,
    bgColor: "bg-fuchsia-600",
  },
  {
    id: 6,
    title: "Find Your Dream Career",
    description: "Discover your dream course and career.",
    icon: <Briefcase className="w-8 h-8 text-white" />,
    bgColor: "bg-pink-600",
  },
];

export default function SmartCareerDecisions() {
  return (
    <section className="py-16 md:py-24 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            Smart Career Decisions Start Here
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Choosing the right career starts with understanding yourself and exploring all possibilities. Follow these steps to discover your strengths, identify your goals, and make confident decisions about your dream course and career.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col items-center text-center hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
