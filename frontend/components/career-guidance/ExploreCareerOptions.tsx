import React from "react";
import Image from "next/image";
import {
  Atom,
  BarChart3,
  BookOpen,
  Settings,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const streams = [
  {
    title: "SCIENCE",
    icon: Atom,
    iconColor: "text-blue-500",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
    options: [
      "Engineering & Technology",
      "Medical & Health Sciences",
      "Data Science & AI",
      "Aerospace & Drone Technology",
      "Biotech & Life Sciences",
      "Environmental Sciences",
    ],
  },
  {
    title: "COMMERCE",
    icon: BarChart3,
    iconColor: "text-orange-500",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2072&auto=format&fit=crop",
    options: [
      "Business Analytics",
      "Finance & Accounting",
      "Digital Marketing",
      "Entrepreneurship",
      "FinTech & Blockchain",
      "Global Business",
    ],
  },
  {
    title: "HUMANITIES",
    icon: BookOpen,
    iconColor: "text-green-600",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
    options: [
      "Psychology",
      "Design",
      "Media & Communication",
      "Liberal Arts",
      "International Relations",
      "Social Impact",
    ],
  },
  {
    title: "NEW-AGE PROGRAMS",
    icon: Settings,
    iconColor: "text-blue-600",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    options: [
      "Cybersecurity",
      "UI/UX Design & Development",
      "Game Design",
      "Film & Photography",
      "Robotics & Automation",
      "Cloud Computing",
    ],
  },
];

const ExploreCareerOptions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-1 w-12 bg-[#f97316]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#1e3a8a]">Explore Career Options by </span>
            <span className="text-[#f97316]">Stream</span>
          </h2>
          <p className="text-gray-600 text-lg">
            From traditional paths to new-age opportunities. Find the stream
            that matches your interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {streams.map((stream, index) => {
            const Icon = stream.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={stream.image}
                    alt={stream.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className={stream.iconColor} size={28} />
                    <h3 className="font-bold text-[#1e3a8a] text-lg tracking-wide">
                      {stream.title}
                    </h3>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {stream.options.map((option, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight
                          className="text-gray-400 mt-1 shrink-0"
                          size={16}
                        />
                        <span className="text-gray-600 text-sm leading-tight pt-0.5">
                          {option}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#"
                    className="inline-flex items-center text-[#f97316] font-medium hover:text-orange-600 transition-colors mt-auto text-sm"
                  >
                    Explore More
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreCareerOptions;
