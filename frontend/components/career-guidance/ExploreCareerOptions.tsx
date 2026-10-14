import React from "react";
import Image from "next/image";
import {
  Atom,
  BarChart3,
  BookOpen,
  Settings,
  ChevronRight,
} from "lucide-react";

const streams = [
  {
    title: "SCIENCE",
    icon: Atom,
    iconColor: "text-blue-500",
    image: "/images/career-guidance/sciance.jpeg",
    options: [
      "Engineering & Technology",
      "Medical & Healthcare",
      "Pure & Applied Sciences",
      "Computer Science & Information Technology",
      "Biotechnology & Life Sciences",
      "Agriculture & Allied Sciences",
      "Pharmacy & Pharmaceutical Sciences",
      "Nursing & Allied Health Sciences",
      "Architecture & Planning",
      "Environmental & Earth Sciences",
      "Forensic Science",
      "Aviation & Aerospace",
      "Defence & Maritime Studies",
      "Interdisciplinary & Emerging Technologies",
    ],
  },
  {
    title: "COMMERCE",
    icon: BarChart3,
    iconColor: "text-orange-500",
    image: "/images/career-guidance/commerce.jpeg",
    options: [
      "Accounting & Finance",
      "Banking & Insurance",
      "Business Management & Administration",
      "Economics & Econometrics",
      "Commerce & Taxation",
      "Marketing & Advertising",
      "Human Resource Management",
      "International Business & Trade",
      "Entrepreneurship & Startups",
      "Business Analytics & Data Science",
      "Financial Markets & Investment Management",
      "Company Secretaryship & Corporate Governance",
      "Logistics & Supply Chain Management",
      "E-Commerce & Digital Business",
    ],
  },
  {
    title: "HUMANITIES",
    icon: BookOpen,
    iconColor: "text-green-600",
    image: "/images/career-guidance/humanity.jpeg",
    options: [
      "Psychology & Behavioural Sciences",
      "Sociology & Social Work",
      "Political Science & International Relations",
      "History & Archaeology",
      "Geography & Geospatial Studies",
      "Philosophy & Ethics",
      "Languages & Literature",
      "Journalism, Mass Communication & Media Studies",
      "Law & Legal Studies",
      "Education & Teaching",
      "Fine Arts & Performing Arts",
      "Design, Fashion & Creative Arts",
      "Public Administration & Governance",
      "Hotel Management, Tourism & Hospitality",
    ],
  },
  {
    title: "NEW-AGE PROGRAMS",
    icon: Settings,
    iconColor: "text-blue-600",
    image: "/images/career-guidance/newage.jpeg",
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

                  <ul className="space-y-3 flex-grow">
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
