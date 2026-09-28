import React from "react";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";

export default function DigitalAddictionFinalAdvice() {
  const points = [
    "I have heard about a number of cases where parents themselves are so much Beyond physical restriction, providing a good example of healthy phone usage is important. Parents should be mindful of the amount of time we spend on our own phones and be a role model for moderation. If parents also indulge in phones for long hours, the children are bound to copy this habit of theirs. It is advisable for parents to stay away from phones as much as possible so that they have a good example to present.",
    "Spending time together, one on one without the distraction of screens is also important in helping kids foster healthy relationships with tech. Encouraging creative outlets and hands-on activities is an integral part of maintaining a healthy balance.",
    "If, however, your profession demands a lot of phone usage, do it when the kids are out to play. You wouldn’t like to be blamed for triggering that bad habit in your child.",
    "Once you pay and subscribe like Netflix,Amazon Prime or any such paid channel,you always want to utilise your paid service as much as possible and sometimes this become never ending story to watch series one another and end of it which is not necessary."
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Message */}
        <div className="bg-primary rounded-2xl p-8 md:p-10 mb-12 shadow-sm text-center">
          <p className="text-secondary text-lg md:text-xl font-bold leading-relaxed uppercase">
            LAST POINT IF YOU ARE REALLY INTERESTED TO COMEOVER THIS DIGITAL OVERUSE PLEASE START USING WRIST WATCH FOR SEE THE TIME I AM SURE IF BUILT THIS HABBIT, WHEN I MEET YOU NEXT TIME YOU WILL DEFINITELY REDUCE THE DIGITAL USE.
          </p>
        </div>

        {/* Content Section: Image and Points */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg group">
              <Image 
                src="/images/digital-addiction/digital-addiction-2.jpg"
                alt="Digital Addiction Advice"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
            </div>
          </div>

          {/* Right: Points */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 uppercase">Advice for Parents & Families</h3>
              <div className="space-y-6">
                {points.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="shrink-0 mt-1">
                      <ChevronsRight className="w-6 h-6 text-[#2da970]" />
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
