import React from "react";
import { Clock, Frown, BarChart3, Users, Moon, Smartphone } from "lucide-react";

interface SignItem {
  title: string;
  icon: React.ReactNode;
  image?: string;
  fallbackGradient: string;
}

interface SignsOfDigitalAddictionProps {
  customImages?: {
    spendingTime?: string;
    anxious?: string;
    focus?: string;
    onlineInteraction?: string;
    sleep?: string;
    checkingPhone?: string;
  };
}

export default function SignsOfDigitalAddiction({
  customImages,
}: SignsOfDigitalAddictionProps) {
  const signs: SignItem[] = [
    {
      title: "Spending too much time online",
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      image: customImages?.spendingTime || "/images/digital-addiction/3.jpeg",
      fallbackGradient: "from-slate-900/90 via-slate-800/80 to-blue-950/90",
    },
    {
      title: "Feeling anxious or restless without a device",
      icon: <Frown className="w-6 h-6 text-amber-400" />,
      image: customImages?.anxious || "/images/digital-addiction/4.jpeg",
      fallbackGradient: "from-blue-950/90 via-slate-900/80 to-indigo-950/90",
    },
    {
      title: "Difficulty focusing on studies or other activities",
      icon: <BarChart3 className="w-6 h-6 text-amber-400" />,
      image: customImages?.focus || "/images/digital-addiction/5.jpeg",
      fallbackGradient: "from-amber-950/90 via-slate-900/80 to-stone-900/90",
    },
    {
      title: "Preferring online interaction over real-life relationships",
      icon: <Users className="w-6 h-6 text-amber-400" />,
      image:
        customImages?.onlineInteraction || "/images/digital-addiction/8.jpeg",
      fallbackGradient: "from-sky-950/90 via-slate-900/80 to-slate-950/90",
    },
    {
      title: "Disturbed sleep patterns",
      icon: <Moon className="w-6 h-6 text-amber-400" />,
      image: customImages?.sleep || "/images/digital-addiction/6.jpeg",
      fallbackGradient: "from-indigo-950/90 via-slate-900/80 to-purple-950/90",
    },
    {
      title: "Constantly checking phone or social media",
      icon: <Smartphone className="w-6 h-6 text-amber-400" />,
      image: customImages?.checkingPhone || "/images/digital-addiction/7.jpeg",
      fallbackGradient: "from-blue-950/90 via-slate-900/80 to-cyan-950/90",
    },
  ];

  return (
    <section className="py-3 md:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1d42] tracking-tight mb-8">
          Signs of Digital Addiction
        </h2>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {signs.map((item, index) => (
            <div
              key={index}
              className="relative h-56 sm:h-64 rounded-sm overflow-hidden shadow-md group flex flex-col justify-end p-3.5 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Photo or Fallback Gradient Background */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${item.fallbackGradient} w-full h-full`}
                />
              )}

              {/* Dark vignette overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10" />

              {/* Icon in Circle */}
              <div className="relative z-10 mx-auto mb-2 w-11 h-11 rounded-full border-2 border-amber-400/80 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-md">
                {item.icon}
              </div>

              {/* Card Label */}
              <p className="relative z-10 text-xs sm:text-[13px] font-semibold text-white leading-tight">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
