"use client";

import { useUpcomingEvent } from "@/hooks/api";
import { useSubmitEnquiry } from "@/hooks/api/useForms";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function EventDetailsPage() {
  const { slug } = useParams();
  const { data: event, isLoading } = useUpcomingEvent(slug as string);
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutate: submitEnquiry, isPending: isSubmitting } = useSubmitEnquiry(
    slug as string,
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
    console.log("fshdffhsfdhsd");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: phone,
      city: formData.get("city"),
      course: formData.get("course"),
      agree: formData.get("agree") === "on",
    };
    submitEnquiry(data);
  };

  // Use real data if available from the API, otherwise fallback to mock logos
  const apiLogos = event?.university_logos || [];
  const baseLogos =
    apiLogos.length > 0
      ? apiLogos
      : Array(6).fill({ path: "/images/common/Study-in-India-fair-logo.png" });

  // Duplicate array multiple times to ensure the carousel has enough content for a seamless infinite scroll, even if there are only 1-2 logos
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];

  // The CSS marquee handles the auto-slide and hover stop seamlessly!

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-secondary font-medium">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl text-gray-600">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative w-full py-3 lg:py-6 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: event.images?.[0]?.path
            ? `url(${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${event.images[0].path})`
            : "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

        <div className="container mx-auto px-4 md:max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg leading-tight">
              {event.name}
            </h1>

            <div className="space-y-4 text-lg md:text-xl font-medium drop-shadow-md">
              {event.schedules?.map((schedule: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-black/30 p-5 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <svg
                      className="w-6 h-6 shrink-0 mt-1 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span>
                      <strong className="text-white">Venue:</strong>{" "}
                      {schedule.location}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 shrink-0 mt-1 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>
                      <strong className="text-white">Date:</strong>{" "}
                      {schedule.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Registration Form */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
            <h2 className="text-2xl font-bold text-orange-600 mb-6 pb-2 border-b border-gray-100">
              Register Now
            </h2>
            <form
              ref={formRef}
              className="space-y-4 text-gray-800"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name*"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                  required
                />
              </div>
              <div className="react-phone-wrapper w-full">
                <style jsx global>{`
                  .react-phone-wrapper .react-tel-input .form-control {
                    width: 100%;
                    height: 46px;
                    border-radius: 0.5rem;
                    border: 1px solid #d1d5db;
                    font-size: 0.875rem;
                  }
                  .react-phone-wrapper .react-tel-input .form-control:focus {
                    border-color: #013fa4;
                    box-shadow: 0 0 0 1px #013fa4;
                  }
                  .react-phone-wrapper .react-tel-input .flag-dropdown {
                    border-color: #d1d5db;
                    border-top-left-radius: 0.5rem;
                    border-bottom-left-radius: 0.5rem;
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
                    placeholder: "Phone No.*",
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="Your City"
                  className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                />
                <select
                  name="course"
                  className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                >
                  <option value="">Select Course</option>
                  <option value="ug">Undergraduate</option>
                  <option value="pg">Postgraduate</option>
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-secondary cursor-pointer"
                  required
                />
                <label
                  htmlFor="agree"
                  className="text-[12px] text-gray-600 leading-tight cursor-pointer"
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

      {/* Participating Universities */}
      <div className="py-3 lg:py-6 bg-white container mx-auto px-4 max-w-7xl border-b border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-12">
          <div className="md:w-1/3 text-center md:text-left z-10">
            <h2 className="text-4xl font-bold text-secondary mb-4 leading-tight">
              Participating
              <br />
              <span className="text-orange-500">Universities</span>
            </h2>
            <p className="text-base text-gray-600">
              Explore the prestigious Indian Universities joining us at our
              upcoming fair.
            </p>
          </div>

          <div className="md:w-2/3 w-full relative overflow-hidden">
            <div className="flex w-max animate-marquee hover:paused">
              <div className="flex gap-6 py-2 pr-6">
                {logos.map((logoItem: any, index: number) => {
                  const imageSrc =
                    logoItem.path && !logoItem.path.startsWith("/images")
                      ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${logoItem.path}`
                      : logoItem.path;

                  return (
                    <a
                      key={index}
                      href={logoItem.link || "#"}
                      target={logoItem.link ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-40 h-24 flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer p-1"
                    >
                      <img
                        src={imageSrc}
                        alt={
                          logoItem.alt_text || `University Logo ${index + 1}`
                        }
                        className="opacity-100 hover:scale-105 object-contain w-full h-full transition-all duration-500"
                        draggable="false"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Upcoming Expo */}
      <div className="bg-[#FDF8F3] py-5">
        <div className="container mx-auto px-4 max-w-7xl text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-6">
            Upcoming Expo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Study in India Education Fairs brings a common platform where
            students can directly engage with premier Indian Institutions
            seeking quality education options.
          </p>
        </div>
        {/* Render the component without its own header */}
        <UpcomingEvents hideHeader={true} />
      </div>
    </div>
  );
}
