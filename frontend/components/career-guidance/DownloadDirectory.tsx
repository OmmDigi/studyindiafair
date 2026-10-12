import React from "react";
import Image from "next/image";
import { Download, BookOpen } from "lucide-react";
import Link from "next/link";

const DownloadDirectory = () => {
  return (
    <section className="relative w-full min-h-[420px] md:min-h-[460px] flex items-center overflow-hidden bg-[#faf8f5]">
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/career-guidance/2.jpeg"
          alt="Digital Career Directory Banner"
          fill
          className="object-cover object-left md:object-center"
          priority
        />
        {/* Subtle gradient for small screens so right-side text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent md:bg-gradient-to-r md:from-transparent md:via-white/20 md:to-white/90 lg:to-white/80 z-0 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-end">
          {/* Right Side - Call to Action */}
          <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-center md:items-start gap-6 bg-white/80 md:bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-orange-100/60">
            <Link 
              href="#"
              className="group inline-flex items-center justify-between w-full max-w-md bg-[#f97316] text-white px-6 py-4 rounded-full font-medium hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <Download size={24} />
                <span className="text-lg font-semibold leading-tight text-left">
                  Download the <br /> Digital Career Directory
                </span>
              </div>
              <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            <div className="flex items-start gap-4 max-w-md">
              <div className="text-[#1e3a8a] mt-1 shrink-0">
                <BookOpen size={32} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[#1e3a8a] text-lg leading-snug font-bold">
                  Your complete guide <br />
                  <span className="font-medium text-gray-600">to a brighter Tomorrow.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadDirectory;
