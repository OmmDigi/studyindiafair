"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 p-2 rounded-full shadow-lg bg-white backdrop-blur-sm border border-gray-200 hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Back to top"
        >
          <Image
            src="/favicon1.png"
            alt="Back to top"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </button>
      )}
    </>
  );
}
