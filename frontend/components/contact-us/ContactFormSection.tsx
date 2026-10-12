"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Users,
  Building2,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useSubmitEnquiry, useSiteSettings } from "@/hooks/api";
import { useRouter } from "next/navigation";

interface ContactFormSectionProps {
  customIcons?: {
    location?: string;
    phone?: string;
    email?: string;
    students?: string;
    institutions?: string;
  };
}

export default function ContactFormSection({
  customIcons,
}: ContactFormSectionProps) {
  const router = useRouter();
  const { data: siteSettings } = useSiteSettings();
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const { mutate: submitEnquiry, isPending: isSubmitting } = useSubmitEnquiry(
    "contact-us",
    {
      onSuccess: () => {
        setSubmitted(true);
        setFormData(initialFormState);
        setTimeout(() => {
          router.push("/thank-you");
        }, 1200);
      },
      onError: (error: any) => {
        console.error("Failed to submit:", error);
        alert("Failed to send message. Please try again.");
      },
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry(formData);
  };

  return (
    <section className="relative py-10 md:py-14 lg:py-16 bg-white overflow-hidden">
      {/* Background World Map Vector Pattern Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#0b1d42_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Get in Touch Info & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-1">
            <div>
              {/* Header Badge & Title */}
              <div className="mb-6">
                <span className="text-[#ff6929] text-xs sm:text-[13px] font-bold uppercase tracking-widest block mb-1.5">
                  LET&apos;S BUILD BRIGHTER TOMORROWS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0b1d42] tracking-tight leading-tight">
                  Get in Touch
                </h2>
                <p className="mt-3 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                  Whether you are a student, parent, educational institution or
                  a school, feel free to reach out. Our team is here to assist
                  you with any inquiries or support you may need.
                </p>
              </div>

              {/* 3 Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {/* Visit Us Card */}
                <div className="bg-[#fef4ea] border border-[#fde1cb] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#fddbc2] flex items-center justify-center text-[#ff6929] mb-3">
                      {customIcons?.location ? (
                        <img
                          src={customIcons.location}
                          alt="Visit Us"
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <MapPin className="w-5 h-5 text-[#ff6929]" />
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0b1d42]">
                      Visit Us
                    </h3>
                    <p className="text-[11px] text-gray-700 font-semibold mb-1">
                      (Corporate Office)
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                      {siteSettings?.addresses?.[0]?.address ||
                        siteSettings?.addresses?.[0]?.label ||
                        "P287 Darga road, Ground floor, Park Circus, near 4 no. bridge, Kolkata 700017"}
                    </p>
                  </div>
                </div>

                {/* Call Us Card */}
                <div className="bg-[#eaf4fe] border border-[#d2e8fd] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#cce4fd] flex items-center justify-center text-[#1d4ed8] mb-3">
                      {customIcons?.phone ? (
                        <img
                          src={customIcons.phone}
                          alt="Call Us"
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <Phone className="w-5 h-5 text-[#1d4ed8]" />
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0b1d42] mb-1.5">
                      Call Us
                    </h3>
                    <div className="space-y-1 text-xs text-gray-700">
                      {siteSettings?.phones?.length > 0 ? (
                        siteSettings.phones.map((item: any, idx: number) => {
                          const rawNum = item.number || item.label || "";
                          const telLink = rawNum.startsWith("+")
                            ? rawNum
                            : `+91${rawNum.replace(/\D/g, "")}`;
                          const displayNum = rawNum.startsWith("+")
                            ? rawNum
                            : `+91 ${rawNum}`;
                          return (
                            <a
                              key={idx}
                              href={`tel:${telLink}`}
                              className="block font-medium hover:text-[#ff6929] transition-colors"
                            >
                              {displayNum}
                            </a>
                          );
                        })
                      ) : (
                        <>
                          <a
                            href="tel:+919830058408"
                            className="block font-medium hover:text-[#ff6929] transition-colors"
                          >
                            +91 9830058408
                          </a>
                          <a
                            href="tel:+918017494833"
                            className="block font-medium hover:text-[#ff6929] transition-colors"
                          >
                            +91 8017494833
                          </a>
                          <a
                            href="tel:+919038058408"
                            className="block font-medium hover:text-[#ff6929] transition-colors"
                          >
                            +91 9038058408
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Us Card */}
                <div className="bg-[#fef4ea] border border-[#fde1cb] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#fddbc2] flex items-center justify-center text-[#ff6929] mb-3">
                      {customIcons?.email ? (
                        <img
                          src={customIcons.email}
                          alt="Email Us"
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <Mail className="w-5 h-5 text-[#ff6929]" />
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0b1d42] mb-1.5">
                      Email Us
                    </h3>
                    <div className="space-y-1">
                      {siteSettings?.emails?.length > 0 ? (
                        siteSettings.emails.map((item: any, idx: number) => {
                          const emailAddr = item.email || item.label || "";
                          return (
                            <a
                              key={idx}
                              href={`mailto:${emailAddr}`}
                              className="text-xs text-gray-700 font-medium hover:text-[#ff6929] transition-colors break-all block"
                            >
                              {emailAddr}
                            </a>
                          );
                        })
                      ) : (
                        <a
                          href="mailto:demo@gmail.com"
                          className="text-xs text-gray-700 font-medium hover:text-[#ff6929] transition-colors break-all block"
                        >
                          demo@gmail.com
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slogan & Stats Section matching mockup */}
            <div className="pt-2">
              {/* Trust Slogan Banner with orange underline */}
              <div className="text-center mb-6">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0b1d42] max-w-lg mx-auto">
                  A TRUSTED PLATFORM BRINGING INDIA&apos;S EDUCATION
                  OPPORTUNITIES CLOSER TO THE WORLD
                </p>
                <div className="w-16 h-[2px] bg-[#ff6929] mt-2.5 mx-auto"></div>
              </div>

              {/* Stats Counters */}
              <div className="flex items-center justify-center gap-10 sm:gap-16 pt-1">
                {/* Students Stat */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0 text-[#ff6929]">
                    {customIcons?.students ? (
                      <img
                        src={customIcons.students}
                        alt="Students"
                        className="w-9 h-9 object-contain"
                      />
                    ) : (
                      <Users className="w-8 h-8 sm:w-9 sm:h-9 text-[#ff6929]" />
                    )}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0b1d42] leading-none">
                      750,000+
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
                      Students
                    </p>
                  </div>
                </div>

                {/* Partner Institutions Stat */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0 text-[#ff6929]">
                    {customIcons?.institutions ? (
                      <img
                        src={customIcons.institutions}
                        alt="Partner Institutions"
                        className="w-9 h-9 object-contain"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 sm:w-9 sm:h-9 text-[#ff6929]" />
                    )}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0b1d42] leading-none">
                      650+
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
                      Partner Institutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Connections */}
              {siteSettings?.social_links?.length > 0 && (
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Connect With Us:
                  </span>
                  <div className="flex items-center gap-2">
                    {siteSettings.social_links.map((link: any, idx: number) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#ff6929] flex items-center justify-center transition-all p-1.5 shadow-sm group"
                      >
                        {link.icon_path ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${link.icon_path}`}
                            alt={link.name}
                            className="w-4 h-4 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-700 group-hover:text-white">
                            {link.name?.[0]}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: "Tell us how we can help" Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-6 sm:p-7 relative">
              <div className="mb-5">
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0b1d42] tracking-tight">
                  Tell us how we can help
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Fill in the details and our team will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-[#0b1d42] mb-2">
                    Thank You!
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Your message has been sent successfully. We will get back to
                    you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-gray-800 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6929]/20 focus:border-[#ff6929] transition-all"
                      required
                    />
                  </div>

                  {/* Email & Phone in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-800 mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6929]/20 focus:border-[#ff6929] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-gray-800 mb-1"
                      >
                        Phone No. <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6929]/20 focus:border-[#ff6929] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-gray-800 mb-1"
                    >
                      Subject / I&apos;m enquiring about{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter your subject"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6929]/20 focus:border-[#ff6929] transition-all"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-800 mb-1"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6929]/20 focus:border-[#ff6929] transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-[#ff5a1f] hover:bg-[#e84910] text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>

                  {/* Security Footnote */}
                  <div className="pt-1.5 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-500 font-medium text-center">
                    <Lock className="w-3.5 h-3.5 text-gray-700 shrink-0" />
                    <span>
                      Your information is safe with us and will only be used to
                      respond to your enquiry.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
