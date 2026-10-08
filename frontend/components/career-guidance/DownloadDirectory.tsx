import React from "react";
import Image from "next/image";
import { Download, BookOpen } from "lucide-react";
import Link from "next/link";

const DownloadDirectory = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
          
          {/* Left Side - Book Image (Placeholder) */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3]">
              {/* In a real scenario, this would be the specific book mockup image */}
              <Image
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2187&auto=format&fit=crop"
                alt="Digital Career Directory"
                fill
                className="object-contain drop-shadow-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                 {/* Text overlay just for the placeholder to mimic the book cover */}
                 <div className="bg-white/90 p-4 rounded-lg text-center shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-[#1e3a8a] leading-tight">DIGITAL<br/>CAREER<br/>DIRECTORY</h3>
                    <p className="text-sm font-semibold text-gray-600 mt-2">FOR STUDENTS</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side - Call to Action */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6">
            <Link 
              href="#"
              className="group inline-flex items-center justify-between w-full max-w-md bg-[#f97316] text-white px-6 py-4 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Download size={24} />
                <span className="text-lg">Download the <br className="hidden md:block" /> Digital Career Directory</span>
              </div>
              <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            <div className="flex items-start gap-4 max-w-md">
              <div className="text-[#1e3a8a] mt-1">
                <BookOpen size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[#1e3a8a] text-lg leading-snug font-medium">
                  Your complete guide <br />
                  <span className="font-normal text-gray-600">to a brighter Tomorrow.</span>
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
