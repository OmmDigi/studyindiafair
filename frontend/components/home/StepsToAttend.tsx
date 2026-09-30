import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const StepsToAttend = () => {
  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative">
          {/* Header */}
          <div className="flex flex-wrap mb-6">
            <div className="w-full mx-auto text-start">
              <h2 className="text-xl md:text-2xl font-bold text-secondary uppercase tracking-wider">
                3 Steps To Attend
              </h2>
            </div>
          </div>

          {/* Steps Container */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 lg:gap-4">
            {/* Step 1 */}
            <Link
              href="/visitors-registration"
              className="flex-1 w-full bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-50 p-4 lg:p-6 flex items-center gap-3 lg:gap-4"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 shrink-0 bg-secondary text-white rounded-full flex items-center justify-center text-lg lg:text-xl font-bold">
                01
              </div>
              <div className="shrink-0">
                {/* Clipboard Icon */}
                <img
                  src="/images/steps/task.gif"
                  alt="Pre Registration"
                  width="40"
                  height="40"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm lg:text-base font-bold text-secondary leading-tight mb-1">
                  Pre Registration
                </h3>
                <p className="text-[11px] lg:text-xs text-secondary/80 leading-snug">
                  Fill in a simple form
                  <br />
                  to confirm your visit.
                </p>
              </div>
            </Link>

            {/* Arrow 1 */}
            <div className="hidden md:flex shrink-0">
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-secondary" />
            </div>

            {/* Step 2 */}
            <Link
              href={"/visitors-registration"}
              className="flex-1 w-full bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-50 p-4 lg:p-6 flex items-center gap-3 lg:gap-4"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 shrink-0 bg-secondary text-white rounded-full flex items-center justify-center text-lg lg:text-xl font-bold">
                02
              </div>
              <div className="shrink-0">
                {/* WhatsApp Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="#128C7E"
                  stroke="none"
                  className="text-[#128C7E]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm lg:text-base font-bold text-secondary leading-tight mb-1">
                  Save the QR Code
                </h3>
                <p className="text-[11px] lg:text-xs text-secondary/80 leading-snug">
                  You will receive a QR code
                  <br />
                  on WhatsApp. Save it for entry.
                </p>
              </div>
            </Link>

            {/* Arrow 2 */}
            <div className="hidden md:flex shrink-0">
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-secondary" />
            </div>

            {/* Step 3 */}
            <Link
              href={"/visitors-registration"}
              className="flex-1 w-full bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-50 p-4 lg:p-6 flex items-center gap-3 lg:gap-4"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 shrink-0 bg-secondary text-white rounded-full flex items-center justify-center text-lg lg:text-xl font-bold">
                03
              </div>
              <div className="shrink-0">
                {/* Entry Icon */}
                <img
                  src="/images/steps/metal-detector.gif"
                  alt="Show it During Entry"
                  width="40"
                  height="40"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm lg:text-base font-bold text-secondary leading-tight mb-1">
                  Show it During Entry
                </h3>
                <p className="text-[11px] lg:text-xs text-secondary/80 leading-snug">
                  Show the QR code at the
                  <br />
                  registration desk during entry.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsToAttend;
