import React from "react";
import { Clock, Activity, Users, BookOpen, Sparkles } from "lucide-react";

interface SimpleWaysProps {
  customIcons?: {
    timeLimits?: string;
    stayActive?: string;
    familyFriends?: string;
    goals?: string;
    takeBreaks?: string;
  };
}

export default function SimpleWaysToControl({ customIcons }: SimpleWaysProps) {
  const ways = [
    {
      title: "Set Time Limits",
      description: "Be mindful of how much time you spend online.",
      icon: (
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-[#2563eb]">
          {customIcons?.timeLimits ? (
            <img
              src={customIcons.timeLimits}
              alt="Set Time Limits"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <Clock className="w-7 h-7 text-blue-600" />
          )}
        </div>
      ),
    },
    {
      title: "Stay Active",
      description: "Engage in physical activities and hobbies you enjoy.",
      icon: (
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#ea580c]">
          {customIcons?.stayActive ? (
            <img
              src={customIcons.stayActive}
              alt="Stay Active"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <Activity className="w-7 h-7 text-[#ea580c]" />
          )}
        </div>
      ),
    },
    {
      title: "Spend Time with Family & Friends",
      description: "Build real connections beyond the screen.",
      icon: (
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-[#1d4ed8]">
          {customIcons?.familyFriends ? (
            <img
              src={customIcons.familyFriends}
              alt="Family & Friends"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <Users className="w-7 h-7 text-[#1d4ed8]" />
          )}
        </div>
      ),
    },
    {
      title: "Focus on Your Goals",
      description: "Give more time to your studies and future plans.",
      icon: (
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#ea580c]">
          {customIcons?.goals ? (
            <img
              src={customIcons.goals}
              alt="Focus on Goals"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <BookOpen className="w-7 h-7 text-[#ea580c]" />
          )}
        </div>
      ),
    },
    {
      title: "Take Breaks",
      description: "Disconnect, relax and refresh your mind.",
      icon: (
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#f97316]">
          {customIcons?.takeBreaks ? (
            <img
              src={customIcons.takeBreaks}
              alt="Take Breaks"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <Sparkles className="w-7 h-7 text-[#ea580c]" />
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="py-3 md:py-6 bg-[#edf6fc] border-y border-blue-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1d42] tracking-tight mb-8">
          Simple Ways to Be in Control
        </h2>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ways.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-sm p-5 sm:p-6 shadow-sm border border-blue-50 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-base font-bold text-[#0b1d42] mb-1.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
