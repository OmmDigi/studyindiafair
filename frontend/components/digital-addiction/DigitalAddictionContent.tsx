import React from "react";
import { Users, Smile, HeartHandshake, Smartphone, ChevronsRight } from "lucide-react";

export default function DigitalAddictionContent() {
  const warningSigns = [
    <><strong>Anger or irritability</strong><br/>LOSE FOCUS/Difficulty concentrating.</>,
    "Does my teen skip or avoid social events or extracurricular activities to use the smartphone instead?",
    "Sleep disturbances",
    "Inability to Focus / Complete a Task/ur school work on time.",
    "Stress and Restless.",
    "Relationship Stress",
    "Eye Strain",
    "Neck Pain",
    "Social Anxiety",
    "You May develop Escapist Behaviour.(prefer to stay alone even prefer to not to communicate with own family rather give more time to phone)",
    <>Anger, Impatience, irritability, restlessness, Sleep disturbances, inability to focus, Complete a Task on time, Social Anxiety<br/>These are potential digital device overuse.</>
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4 uppercase">
            How Child Develop a "Digital Addiction"
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            <strong className="text-slate-900">Digital device overuse:</strong> Exploring the internet is great for students, but there’s a lot that’s inappropriate for you. For students it is difficult to understand which one is appropriate and which one is inappropriate.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column (3 Stacked Cards) */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6">
            
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex items-start gap-4">
              <div className="shrink-0 text-[#f68b54]">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">The need to produce and socialize</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  It’s a part of human nature to imitate, copy, and make models in the process of personal progression. Mobile devices help you with that. take pictures, select the best selfie or reels, socialize. Texting friends and googling information is the modern way of life what majority of students feel.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex items-start gap-4">
              <div className="shrink-0 text-[#f68b54]">
                <Smile className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Pleasure</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Smartphone addiction works similarly to game addiction. Every once in a while the user receives some sort of a reward and when you accept the challenge to reach next step, which keep you engage. Similarly it might be a message, a like, a notification, or anything else which is pleasurable to receive, but whose arrival is unpredictable. Whenever we get a reward like this you feel happy and desire more. It also causes a quick message check turn into endless Facebook, Tik Tok, snapchat, Instagram feed scrolling.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex items-start gap-4">
              <div className="shrink-0 text-[#f68b54]">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Recognition by the public</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All of us want to belong to a bigger group and to be accepted and recognized. Cell phones and social media provide just such an opportunity. In the digital world teenagers are able to join forums like Facebook, snapchat, Instagram etc, or other messaging groups. You receives your community acceptance by way of likes, comments, messages. So you check the cell phone again and again to get a reward. This is how the habit is formed and becomes hooked to the device.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (1 Tall Card) */}
          <div className="w-full lg:w-[55%]">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 h-full flex items-start gap-4">
              <div className="shrink-0 text-[#f68b54]">
                <Smartphone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">How to Know mobile addiction</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Smartphone addiction, also called <em>nomophobia</em> (fear of being without a phone), can increase social and emotional challenges. Common warning signs include:
                </p>
                <ul className="space-y-4">
                  {warningSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronsRight className="w-5 h-5 text-[#2da970] shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm leading-relaxed">{sign}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
