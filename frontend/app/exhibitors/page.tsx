"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExhibitorsPage() {
  const router = useRouter();

  return (
    <div
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left Side: Why Exhibit */}
        <div className="flex-1 text-white w-full max-w-lg">
          <div className="mb-4">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-2 drop-shadow-md">
              <span className="text-gray-100 block text-3xl md:text-5xl">
                Why
              </span>
              Exhibit?
            </h1>
          </div>

          <ul className="space-y-4 md:space-y-6 text-lg md:text-xl font-medium drop-shadow-md">
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              Direct Access To Targeted Students
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              First Mover Advantage
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              Result Driven Platform
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              Enhance Institutions&apos; Brand Visibility
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              Cost Effective Enrollment Solution
            </li>
          </ul>

          <div className="mt-8 md:mt-12 bg-white/95 backdrop-blur text-blue-900 p-6 rounded shadow-xl text-center font-medium max-w-sm rotate-[-2deg] border border-gray-100">
            Coming together is a beginning
            <br />
            Staying together is a progress
            <br />
            and working together is{" "}
            <span className="text-orange-600 border-b-2 border-orange-600 pb-0.5">
              success
            </span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 relative">
          <form
            className="space-y-4 mt-2 text-black"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <input
                type="text"
                placeholder="Full Name*"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary w-28">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                placeholder="Ph. No.*"
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email*"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Institution Name*"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-400">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </span>
              <input
                type="url"
                placeholder="Institution's Official Website URL*"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="agree"
                className="mt-1 h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-secondary"
                required
              />
              <label
                htmlFor="agree"
                className="text-xs text-gray-600 leading-tight"
              >
                I agree to receive notifications from Study In India Fairs
                through call, email, SMS & WhatsApp.
              </label>
            </div>

            <div className="border border-gray-200 rounded p-4 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-7 w-7 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  I'm not a robot
                </span>
              </div>
              <div className="flex flex-col items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285f4">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
                <span className="text-[10px] text-gray-500 mt-1">
                  reCAPTCHA
                </span>
                <span className="text-[8px] text-gray-400">
                  Privacy - Terms
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              Submit
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
