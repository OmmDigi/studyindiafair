import React from "react";
import Image from "next/image";
import { Download, BookOpen } from "lucide-react";
import Link from "next/link";

const DownloadDirectory = () => {
  return (
    <>
      {/* Mobile Version - structured as shown in reference design */}
      <section className="block md:hidden relative w-full overflow-hidden bg-[#fdfaf7] py-8 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/career-guidance/Campus Yearbook at Golden Hour.png"
            alt="Digital Career Directory Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Top subtle tint to ensure text clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90 pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Accent Dash */}
          <div className="w-12 h-1 bg-[#f97316] rounded-full mb-4"></div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0a2558] mb-2">
            Download the <br />
            <span className="text-[#f97316]">Digital</span> <br />
            <span className="text-[#f97316]">Career Directory</span>
          </h2>

          {/* Subheading */}
          <p className="text-[#334155] text-base font-medium max-w-xs mb-8">
            Your complete guide <br />
            to a brighter Tomorrow.
          </p>

          {/* Book area with overlay text on book cover */}
          <div className="relative w-full max-w-sm h-[260px] my-2 flex items-center justify-center">
            {/* Overlay Title on Book Cover */}
            <div className="absolute left-[8%] top-[12%] z-20 text-left max-w-[130px] pointer-events-none select-none">
              <span className="block font-black text-xs uppercase tracking-tight text-[#0a2558] leading-tight">
                DIGITAL
              </span>
              <span className="block font-black text-sm uppercase tracking-tight text-[#0a2558] leading-none mt-0.5">
                CAREER
              </span>
              <span className="block font-black text-sm uppercase tracking-tight text-[#0a2558] leading-none mt-0.5">
                DIRECTORY
              </span>
              <span className="block font-semibold text-[9px] uppercase tracking-wider text-[#0a2558] mt-1 border-t border-[#f97316] pt-0.5">
                FOR STUDENTS
              </span>
            </div>
          </div>

          {/* Download CTA Button */}
          <div className="w-full max-w-xs mt-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white px-5 py-3.5 rounded-full font-bold shadow-lg shadow-orange-500/30 transition-all transform active:scale-95"
            >
              <Download size={22} className="shrink-0 stroke-[2.5]" />
              <span className="text-sm font-semibold text-left leading-tight">
                Download the <br />
                Digital Career Directory
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto shrink-0"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Desktop / Tablet Version */}
      <section className="hidden md:flex relative w-full min-h-[460px] items-center overflow-hidden bg-[#faf8f5]">
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/career-guidance/2.jpeg"
            alt="Digital Career Directory Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 md:to-white/90 lg:to-white/80 z-0 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-end">
            {/* Right Side - Call to Action & Header Content */}
            <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-center md:items-start text-center md:text-left">
              {/* Accent Dash */}
              <div className="w-12 h-1.5 bg-[#f97316] rounded-full mb-4"></div>

              {/* Main Heading */}
              <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-[#0a2558] mb-3">
                Download the <br />
                <span className="text-[#f97316]">Digital Career Directory</span>
              </h2>

              {/* Subheading */}
              <p className="text-gray-600 text-base lg:text-lg font-medium mb-6">
                Your complete guide to a brighter Tomorrow.
              </p>

              {/* CTA Button */}
              <Link
                href="#"
                className="group inline-flex items-center justify-between w-full max-w-md bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white px-6 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <Download size={24} className="stroke-[2.5]" />
                  <span className="text-base lg:text-lg font-bold leading-tight text-left">
                    Download the <br /> Digital Career Directory
                  </span>
                </div>
                <span className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition-colors shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadDirectory;
