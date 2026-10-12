import React from "react";
import { MessageCircle, Users, Shield, Heart } from "lucide-react";

interface ParentsHelpProps {
  customIcons?: {
    beInvolved?: string;
    goodExample?: string;
    environment?: string;
    guidance?: string;
  };
}

export default function HowParentsCanHelp({ customIcons }: ParentsHelpProps) {
  const points = [
    {
      title: "Be Involved",
      description: "Talk to your child about their online activities.",
      icon: (
        <div className="shrink-0 text-[#ff6929]">
          {customIcons?.beInvolved ? (
            <img
              src={customIcons.beInvolved}
              alt="Be Involved"
              className="w-8 h-8 object-contain"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[#ff6929]" />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Set a Good Example",
      description: "Practice healthy digital habits at home.",
      icon: (
        <div className="shrink-0 text-[#0b1d42]">
          {customIcons?.goodExample ? (
            <img
              src={customIcons.goodExample}
              alt="Set a Good Example"
              className="w-8 h-8 object-contain"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#0b1d42]" />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Create a Supportive Environment",
      description: "Encourage online activities and family time.",
      icon: (
        <div className="shrink-0 text-[#ff6929]">
          {customIcons?.environment ? (
            <img
              src={customIcons.environment}
              alt="Create a Supportive Environment"
              className="w-8 h-8 object-contain"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#ff6929]" />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Guide, Don't Restrict",
      description: "Offer guidance and understand their interests and needs.",
      icon: (
        <div className="shrink-0 text-[#ff6929]">
          {customIcons?.guidance ? (
            <img
              src={customIcons.guidance}
              alt="Guide Don't Restrict"
              className="w-8 h-8 object-contain"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#ff6929]" />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="py-3 md:py-6 bg-[#fffaf5] border-t border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1d42] tracking-tight mb-8">
          How Parents Can Help
        </h2>

        {/* 4 Items in Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {points.map((item, index) => (
            <div key={index} className="flex items-start gap-3.5">
              {item.icon}
              <div>
                <h3 className="text-base font-bold text-[#0b1d42] mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
