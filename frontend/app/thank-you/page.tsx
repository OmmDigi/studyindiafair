import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] bg-white flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-10 text-center flex flex-col items-center transform transition-all hover:scale-[1.02] duration-300">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Thank You!
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your submission has been successfully received. Our team will get back to you shortly!
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
