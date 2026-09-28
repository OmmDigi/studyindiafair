import React from "react";

export default function HowToChooseCourse() {
  return (
    <section className="py-3 md:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              How to Choose a Right Course and Career
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              <p>
                At times we come across certain decision-making stages of life,
                where we need to take a call which may have a major impact on
                the journey ahead, and thus we want it to be a well thought out
                decision.However, what some people neglect to consider is the
                fact that whatever they study will most knowing oneself is the
                most critical exercise that should never be ignored. This is
                where most people fail and take uninformed decision, likely be
                linked to the career they end up with for the rest of their
                lives. Most important task is to ask your heart to find out your
                true calling, we really do wonders when choices are made from
                our heart and implemented by our brain.
              </p>
              <p>
                With determination, will power and hard work, you will be able
                to follow your passion and be happy with the life that you will
                be leading. If you were choosing a career today, What
                opportunities do you see arising in this field in future.
              </p>
              <p>
                However, it might seem difficult to make that decision. Here are
                some pointers you can consider while choosing the right course.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 text-center flex justify-center">
            <img
              src="/images/career-guidance/career-1.png"
              alt="How to Choose a Right Course and Career"
              className="w-full max-w-[535px] h-auto object-contain animate-[bounce_3s_infinite]"
              style={{ animation: "float 3s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
