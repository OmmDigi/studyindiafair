import React from "react";

interface NavigatingLifeProps {
  quoteImage?: string;
}

export default function NavigatingDigitalLife({
  quoteImage = "/images/digital-addiction/2.jpeg",
}: NavigatingLifeProps) {
  return (
    <section className="py-3 md:py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Text Box */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1d42] tracking-tight mb-4 ">
              Navigating Digital Life
            </h2>
            <div className="space-y-3.5 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                In today&apos;s world, the internet and digital devices are a
                big part of our daily lives. They help us learn, connect and
                explore new opportunities.
              </p>
              <p>
                However excessive use can lead to digital addiction, which may
                affect our health, studies and personal well-being. It is
                important to be aware, use technology responsibly and maintain a
                healthy balance.
              </p>
            </div>
          </div>

          {/* Right Quote Card with dark background and optional illustration/photo */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[190px] rounded-sm bg-gradient-to-br from-[#071633] via-[#0b1f48] to-[#122b5e] text-white p-6 sm:p-7 overflow-hidden flex flex-col justify-between shadow-lg shadow-slate-200">
              {/* Background silhouette or image if provided */}
              {quoteImage ? (
                <>
                  <img
                    src={quoteImage}
                    alt="Balanced digital life"
                    className="absolute inset-0 w-full h-full object-cover object-right opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071633]/90 via-[#0b1f48]/75 to-transparent" />
                </>
              ) : (
                <div className="absolute right-0 bottom-0 top-0 w-2/5 pointer-events-none opacity-25 flex items-end justify-end">
                  {/* Subtle Sunset / Silhouette Graphic */}
                  <svg
                    viewBox="0 0 160 160"
                    className="w-full h-full text-blue-300"
                    fill="currentColor"
                  >
                    <circle
                      cx="120"
                      cy="80"
                      r="35"
                      fill="#f97316"
                      opacity="0.4"
                    />
                    <path
                      d="M 60 160 Q 90 90 120 120 Q 140 140 160 160 Z"
                      fill="#061226"
                    />
                  </svg>
                </div>
              )}

              {/* Quote Icon */}
              <div className="relative z-10 text-[#f59e0b] mb-2">
                <svg
                  className="w-9 h-9"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote Text */}
              <div className="relative z-10">
                <p className="text-lg sm:text-xl font-bold leading-snug text-white">
                  A balanced digital life leads to a healthier, happier and more
                  successful you.
                </p>
                <div className="w-14 h-1 bg-[#ff6929] mt-3 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
