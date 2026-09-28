import React from "react";
import { ChevronsRight } from "lucide-react";

export default function DigitalAddictionEffects() {
  const effects = [
    {
      title: "Depression and anxiety",
      desc: "A recent study shows that teens who prefer virtual to real-life communication tend to have a high level of social anxiety or even depression. Cell phone addiction affects relationships with friends and family in a negative way."
    },
    {
      title: "Worse sleep quality or taking a long time to fall asleep",
      desc: "This might be caused by staying up late to play games and watch videos, waking up during the night to check notifications or due to using screens during the hour before sleep which can disrupt the body’s cycles. Excessive smartphone use can disrupt your sleep, It can impact your memory, affect your ability to think clearly, and reduce your learning skills."
    },
    {
      title: "Obsessive-compulsive disorder",
      desc: "Cell phone addicted students constantly feel the pressing need to use their mobile devices all the time. Turning the phone off can cause increased anxiety and even panic. The obsessive idea of staying connected round the clock is a real problem that might require expert care."
    },
    {
      title: "Distraction from the real world",
      desc: "Mobile phone engagement might reach such a degree that a student becomes distracted from being present in the real world. It will affects all all aspects of your live – school, family and other responsibilities. A child might isolate from friends and family, spending time absorbed in the digital world. The danger hides in the fact that while it’s crucial for teens to gain social skills and interact in person, they prefer virtual communication."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            Impacts of Digital Addiction
          </h2>
          
          <div className="space-y-6">
            {effects.map((effect, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors">
                <div className="shrink-0 mt-1">
                  <ChevronsRight className="w-6 h-6 text-[#2da970]" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-slate-900">{effect.title} - </strong>
                    {effect.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
