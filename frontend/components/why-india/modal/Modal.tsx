import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] md:w-[40%]  bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-gray-700 hover:text-black bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-md backdrop-blur-sm"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="w-full h-full overflow-y-auto custom-scrollbar">
          <img
            loading="lazy"
            decoding="async"
            src="/images/home/Highlights.jpeg"
            className="w-full h-auto block"
            alt="India at a Glance"
          />
        </div>
      </div>
    </div>
  );
}
