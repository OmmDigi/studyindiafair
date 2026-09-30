"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSubmitEnquiry } from "@/hooks/api/useForms";

export default function ExhibitorsPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState<string>("");

  const { mutate: submitEnquiry, isPending: isSubmitting } = useSubmitEnquiry(
    "exhibitors",
    {
      onSuccess: () => {
        if (formRef.current) formRef.current.reset();
        setPhone("");
        router.push("/thank-you");
      },
      onError: (error: any) => {
        console.error(error);
        alert("Failed to submit. Please try again.");
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: phone,
      institution: formData.get("institution"),
      website: formData.get("website"),
      agree: formData.get("agree") === "on",
    };
    submitEnquiry(data);
  };

  return (
    <div className="min-h-screen relative flex bg-[#F9FBFC] overflow-hidden">
      {/* Background Image covering full width */}
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{ backgroundImage: `url('/images/home/ExhibitorsPage.jpeg')` }}
      >
        {/* Gradient overlay creating the creamy area on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9FBFC] via-[#F9FBFC]/95 to-transparent w-full lg:w-[80%] xl:w-[70%]"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 w-full lg:w-fill py-12 px-4 sm:px-8 lg:px-16 flex flex-col justify-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left Side: Why Exhibit */}
          <div className="flex-1 w-full ">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#003399] mb-5">
                Why <span className="text-[#E87A24]">Exhibit?</span>
              </h1>
            </div>

            <ul className="space-y-5">
              <li className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-lg md:text-xl">
                  Direct Access To Targeted Students
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-lg md:text-xl">
                  First Mover Advantage
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-lg md:text-xl">
                  Result Driven Platform
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-lg md:text-xl">
                  Enhance Institutions&apos; Brand Visibility
                </span>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#FFF2E5] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#FFE0C2]">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#E87A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[#003399] font-medium text-lg md:text-xl">
                  Cost Effective Enrollment Solution
                </span>
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
              ref={formRef}
              className="space-y-4 mt-2 text-black"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name*"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="react-phone-wrapper w-full">
                <style jsx global>{`
                  .react-phone-wrapper .react-tel-input .form-control {
                    width: 100%;
                    height: 50px;
                    border-radius: 0.375rem;
                    border: 1px solid #d1d5db;
                    font-size: 1rem;
                  }
                  .react-phone-wrapper .react-tel-input .form-control:focus {
                    border-color: #013fa4; /* using secondary ring color */
                    box-shadow: 0 0 0 2px rgba(1, 63, 164, 0.2);
                  }
                  .react-phone-wrapper .react-tel-input .flag-dropdown {
                    border-color: #d1d5db;
                    border-top-left-radius: 0.375rem;
                    border-bottom-left-radius: 0.375rem;
                    background-color: transparent;
                  }
                  .react-phone-wrapper .react-tel-input .flag-dropdown:hover {
                    background-color: #f9fafb;
                  }
                `}</style>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputProps={{
                    name: "phone",
                    required: true,
                    placeholder: "Ph. No.*",
                  }}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="institution"
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
                  name="website"
                  placeholder="Institution's Official Website URL*"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-10 rounded-full transition-colors text-sm shadow-md mt-4 inline-block disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
