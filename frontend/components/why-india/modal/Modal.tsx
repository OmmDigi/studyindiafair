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
            src="https://studyindiafair.com/wp-content/uploads/2025/10/india-at-glance-why-india-1.png"
            className="w-full h-auto block"
            alt="India at a Glance"
            srcSet="https://studyindiafair.com/wp-content/uploads/2025/10/india-at-glance-why-india-1-1024x1024.png 1024w, https://studyindiafair.com/wp-content/uploads/2025/10/india-at-glance-why-india-1-300x300.png 300w, https://studyindiafair.com/wp-content/uploads/2025/10/india-at-glance-why-india-1-150x150.png 150w, https://studyindiafair.com/wp-content/uploads/2025/10/india-at-glance-why-india-1-768x768.png 768w, https://studyindiafair.com/wp-content/uploads/2025/10/india-at-glance-why-india-1.png 1420w"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>
    </div>
  );
}
