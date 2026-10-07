"use client";

import { useUpcomingEvent } from "@/hooks/api";
import { useSubmitEnquiry } from "@/hooks/api/useForms";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Counter from "@/components/Counter";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  GraduationCap,
  BookOpen,
  HandCoins,
  MessageCircleQuestion,
  FileSearch,
  Users,
  Star,
  Signpost
} from "lucide-react";

// Helper function to determine default country code based on slug
const getCountryCode = (slug: string): string => {
  if (!slug) return "in";
  const s = slug.toLowerCase();
  if (s.includes("sri-lanka") || s.includes("srilanka")) return "lk";
  if (s.includes("bangladesh") || s.includes("dhaka")) return "bd";
  if (s.includes("nepal") || s.includes("kathmandu")) return "np";
  if (s.includes("bhutan")) return "bt";
  if (s.includes("maldives")) return "mv";
  if (s.includes("oman")) return "om";
  if (
    s.includes("uae") ||
    s.includes("dubai") ||
    s.includes("abudhabi") ||
    s.includes("abu-dhabi") ||
    s.includes("sharjah")
  )
    return "ae";
  if (s.includes("kenya")) return "ke";
  if (s.includes("nigeria")) return "ng";
  if (s.includes("qatar") || s.includes("doha")) return "qa";
  if (s.includes("saudi") || s.includes("riyadh") || s.includes("jeddah"))
    return "sa";
  if (s.includes("bahrain")) return "bh";
  if (s.includes("kuwait")) return "kw";
  if (s.includes("tanzania")) return "tz";
  if (s.includes("uganda")) return "ug";
  if (s.includes("malaysia")) return "my";
  if (s.includes("singapore")) return "sg";
  return "in";
};

export default function EventDetailsPage() {
  const { slug } = useParams();
  const { data: event, isLoading } = useUpcomingEvent(slug as string);
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let isHovered = false;
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => {
      isHovered = false;
      isDragging = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const handleMouseUp = () => {
      isDragging = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);

    const scroll = () => {
      if (!isHovered && !isDragging) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLoading]);

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
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: phone,
      city: formData.get("city"),
      course: formData.get("course"),
      agree: true, // Always agree based on the new design's implicit statement
    };
    submitEnquiry(data);
  };

  const apiLogos = event?.university_logos || [];
  const baseLogos =
    apiLogos.length > 0
      ? apiLogos
      : Array(12).fill({ path: "/images/common/Study-in-India-fair-logo.png" });

  const logos = baseLogos.slice(0, 12); // Show up to 12 logos in grid

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#003B7A] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#003B7A] font-medium">Loading Event Details...</p>
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

  // Extract and combine all schedules if there are multiple
  const displayDate =
    event.schedules && event.schedules.length > 0
      ? event.schedules
          .map((s: any) => s.date)
          .filter(Boolean)
          .join(", ")
      : "TBD";

  const displayLocation =
    event.schedules && event.schedules.length > 0
      ? event.schedules
          .map((s: any) => s.location)
          .filter(Boolean)
          .join(", ")
      : "Venue TBD";
  const heroImage = event.images?.[0]?.path
    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${event.images[0].path}`
    : "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] md:h-[450px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/70 to-transparent w-full md:from-white md:via-white/70 md:to-transparent w-full md:w-4/5">
            {" "}
          </div>
        </div>

        {/* Banner Content */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl mt-4">
            <p className="text-sm md:text-base font-semibold tracking-wider uppercase text-gray-700 mb-1">
              STUDY IN INDIA EDUCATION FAIR
            </p>
            <h1 className="text-6xl md:text-[5.5rem] leading-none   font-bold mb-3 uppercase text-[#002B5B]">
              {event.name}
            </h1>
            <p className="text-lg md:text-xl font-medium tracking-wide uppercase text-[#004B87] mb-10">
              DISCOVER YOUR HIGHER EDUCATION OPPORTUNITIES IN INDIA
            </p>

            {/* Schedule Info (Inline) */}
            <div className="flex flex-wrap gap-2 md:gap-2 items-end text-sm md:text-base">
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="w-10 h-10 text-[#f96d2b]" />
                <div className="leading-tight">
                  <div className="font-bold text-[#002B5B] whitespace-pre-wrap">
                    {displayDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-10 h-10 text-[#f96d2b]" />
                <div className="leading-tight">
                  <div className="font-bold text-[#002B5B] whitespace-pre-wrap">
                    {displayLocation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-10 flex flex-col lg:flex-row gap-10">
        {/* Left Column - Registration Form */}
        <div className="lg:w-[35%] shrink-0">
          <div className="bg-[#f0f6ff] rounded-xl p-5 md:p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#003B7A] mb-4">
              Visitor Registration
            </h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name*"
                  required
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  required
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="react-phone-wrapper w-full bg-white">
                <style jsx global>{`
                  .react-phone-wrapper .react-tel-input .form-control {
                    width: 100%;
                    height: 40px;
                    border-radius: 0.375rem;
                    border: 1px solid #e5e7eb;
                    font-size: 0.875rem;
                  }
                  .react-phone-wrapper .react-tel-input .form-control:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px #3b82f6;
                  }
                `}</style>
                <PhoneInput
                  country={getCountryCode(slug as string)}
                  value={phone}
                  onChange={setPhone}
                  inputProps={{
                    name: "phone",
                    required: true,
                    placeholder: "Mobile Number*",
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    name="city"
                    placeholder="City*"
                    required
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <select
                    name="course"
                    required
                    defaultValue=""
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500"
                  >
                    <option value="" disabled>
                      Course of Interest*
                    </option>
                    <option value="ug">Undergraduate</option>
                    <option value="pg">Postgraduate</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#f96d2b] hover:bg-[#e05b1c] text-white font-bold py-2.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2 mt-1 text-sm disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Register Now"}
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-start gap-2 text-xs text-[#003B7A]">
              <LockClosedIcon className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                <strong>Your information is safe with us.</strong>
                <br />
                <span className="opacity-80">
                  Your information will only be used to update you on fair
                  related details.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:w-[65%] space-y-12">
          {/* Universities You Will Meet */}
          <section>
            <h2 className="text-3xl font-bold text-[#003B7A] mb-3">
              Universities You Will Meet
            </h2>
            <p className="text-gray-600 mb-6">
              Meet top Indian universities and institutions offering a wide
              range of undergraduate and postgraduate programs.
            </p>

            <div className="w-full relative overflow-hidden mb-4">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-4 w-max py-2">
                  {[...logos, ...logos, ...logos].map(
                    (logoItem: any, index: number) => {
                      const imageSrc =
                        logoItem.path && !logoItem.path.startsWith("/images")
                          ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${logoItem.path}`
                          : logoItem.path;

                      return (
                        <div
                          key={index}
                          className="w-40 h-24 flex-shrink-0 bg-white border border-gray-200 rounded-md p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                        >
                          <img
                            src={imageSrc}
                            alt={logoItem.alt_text || `University ${index + 1}`}
                            className="max-h-full max-w-full object-contain pointer-events-none"
                            draggable="false"
                          />
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
              `}</style>
            </div>
          </section>
        </div>
      </div>

      {/* Why Should You Attend */}
      <section className="w-full py-12 bg-[#fff7f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-12 h-1 bg-[#f15a24] mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003399]">
              Why you should attend?
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center px-4 lg:border-r border-gray-200">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <GraduationCap className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Meet top Indian<br />Universities<br />under one roof
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center px-4 lg:border-r border-gray-200">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <BookOpen className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Explore 300+<br />UG & PG programs
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center px-4 lg:border-r border-gray-200">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <HandCoins className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Avail up to<br />100% merit-based<br />scholarships
              </p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <MessageCircleQuestion className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Get one-to-one<br />counselling from<br />admission experts
              </p>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col items-center text-center px-4 lg:border-r border-gray-200 mt-4 lg:mt-0">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <FileSearch className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                On-spot<br />admission guidance
              </p>
            </div>

            {/* Item 6 */}
            <div className="flex flex-col items-center text-center px-4 lg:border-r border-gray-200 mt-4 lg:mt-0">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <Users className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Interact with<br />faculty &<br />admission directors
              </p>
            </div>

            {/* Item 7 */}
            <div className="flex flex-col items-center text-center px-4 lg:border-r border-gray-200 mt-4 lg:mt-0">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <Star className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Learn about new-age<br />and future-ready<br />programs
              </p>
            </div>

            {/* Item 8 */}
            <div className="flex flex-col items-center text-center px-4 mt-4 lg:mt-0">
              <div className="w-20 h-20 rounded-full bg-[#fde9d7] text-[#003399] flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <Signpost className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="font-medium text-[#003399] text-sm md:text-base leading-snug">
                Make an informed<br />decision for<br />your future
              </p>
            </div>
          </div>
        </div>
      </section>

      {event?.past_edition?.is_active &&
        event.past_edition.cards &&
        event.past_edition.cards.length > 0 && (
          <div className="container mx-auto px-0 lg:px-8 max-w-7xl mt-12">
            <section className="bg-[#fef9f4] rounded-sm p-6 md:p-10 border border-[#f5eadb]">
              <h2 className="text-4xl font-bold text-[#002B5B] mb-3">
                {event.past_edition.heading || "Past Edition at a Glance"}
              </h2>
              {event.past_edition.description?.blocks &&
              event.past_edition.description.blocks.length > 0 ? (
                <div
                  className="text-gray-700 mb-8 max-w-4xl text-[15px]"
                  dangerouslySetInnerHTML={{
                    __html: event.past_edition.description.blocks
                      .map((b: any) => b.data.text)
                      .join("<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-700 mb-8 max-w-4xl text-[15px]">
                  Our previous editions have created meaningful opportunities
                  for Indian institutions to connect with aspiring students.
                </p>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                {event?.past_edition?.cards?.map((card: any, index: number) => (
                  <div
                    key={index}
                    className="flex-1 rounded-xl p-6 relative overflow-hidden border shadow-sm"
                    style={{
                      backgroundColor: card.bg_color || "#fef1e5",
                      borderColor: "rgba(0,0,0,0.05)",
                    }}
                  >
                    {card.bg_image_path && (
                      <div
                        className="absolute right-0 top-0 bottom-0 w-2/3 opacity-30 pointer-events-none mix-blend-multiply"
                        style={{
                          backgroundImage: `url('${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${card.bg_image_path}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "right",
                          maskImage:
                            "linear-gradient(to right, transparent, black 60%)",
                          WebkitMaskImage:
                            "linear-gradient(to right, transparent, black 60%)",
                        }}
                      ></div>
                    )}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                      <div className="bg-white rounded-full p-4 shrink-0 shadow-sm mt-1 flex items-center justify-center w-20 h-20">
                        {card.icon_path ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${card.icon_path}`}
                            alt="Icon"
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <svg
                            className="w-10 h-10 text-[#f96d2b]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-[3.5rem] font-bold text-[#002B5B] leading-none mb-2">
                          {(() => {
                            const val = String(card.value || "");
                            const match = val.match(
                              /^([^0-9.-]*)([\d.,]+)(.*)$/,
                            );
                            if (match) {
                              const num = parseFloat(
                                match[2].replace(/,/g, ""),
                              );
                              if (!isNaN(num)) {
                                return (
                                  <Counter
                                    end={num}
                                    prefix={match[1]}
                                    suffix={match[3]}
                                  />
                                );
                              }
                            }
                            return card.value;
                          })()}
                        </div>
                        <div className="text-lg font-bold text-[#002B5B] leading-tight mb-3 pr-4">
                          {card.title}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

      {/* Upcoming Events Section */}
      {/* <UpcomingEvents /> */}
    </div>
  );
}
