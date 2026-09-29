"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  ChevronsRight,
  GraduationCap,
  PenTool,
  Search,
} from "lucide-react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useScholarships, useSubmitEnquiry } from "@/hooks/api";
import EditorJsDescription from "../EditorJsDescription";

export default function ScholarshipContent() {
  const { data: scholarshipData, isLoading } = useScholarships();

  const initialFormState = {
    name: "",
    gender: "",
    dob: "",
    nationality: "",
    phone: "",
    email: "",
    address: "",
    courseSubject: "",
    courseInterested: "",
    examinationPassed: "",
    percentageGrade: "",
    agreeToNotifications: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  const { mutate: submitEnquiry, isPending: isSubmitting } = useSubmitEnquiry(
    "scholarship",
    {
      onSuccess: () => {
        alert("Registration successful!");
        setFormData(initialFormState);
      },
      onError: (error: any) => {
        console.error(error);
        alert("Failed to submit. Please try again.");
      },
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry(formData);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scholarship Form */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-secondary mb-6 text-center border-b pb-4">
            Scholarship Application Form
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                    />{" "}
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                    />{" "}
                    Female
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={handleChange}
                    />{" "}
                    Other
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth*:
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Nationality*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="react-phone-wrapper w-full">
                <style jsx global>{`
                  .react-phone-wrapper .react-tel-input .form-control {
                    width: 100%;
                    height: 50px;
                    border-radius: 0.5rem;
                    border: 1px solid #d1d5db;
                    font-size: 1rem;
                  }
                  .react-phone-wrapper .react-tel-input .form-control:focus {
                    border-color: #013fa4; /* secondary ring color */
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
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    required: true,
                    placeholder: "Phone No.*",
                  }}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Permanent Address*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="courseSubject"
                  value={formData.courseSubject}
                  onChange={handleChange}
                  placeholder="Course Subject*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <select
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary bg-white"
                >
                  <option value="">Course Interested*</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PHD">PHD</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="examinationPassed"
                  value={formData.examinationPassed}
                  onChange={handleChange}
                  placeholder="Examination Passed*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="percentageGrade"
                  value={formData.percentageGrade}
                  onChange={handleChange}
                  placeholder="Percentage / Grade obtained*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                name="agreeToNotifications"
                checked={formData.agreeToNotifications}
                onChange={handleChange}
                id="agree"
                required
                className="mt-1"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I agree to receive notifications from Study In India Fairs
                through call, email, SMS & WhatsApp.
              </label>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/80 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Scholarship Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-secondary font-medium">
                Loading Scholarship Details...
              </p>
            </div>
          </div>
        ) : scholarshipData ? (
          <>
            {/* Comprehensive Guide Section */}
            <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center mt-12">
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-secondary mb-6">
                  {scholarshipData.about_heading}
                </h2>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                  <EditorJsDescription
                    data={scholarshipData.about_description}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                {scholarshipData.about_image_path ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${scholarshipData.about_image_path}`}
                    alt={scholarshipData.about_heading || "Scholarship"}
                    className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200"
                  />
                ) : (
                  <div className="relative w-full max-w-md aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Scholarship Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Websites That Allow Search Section */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
                {scholarshipData.eligibility_heading}
              </h2>
              <div className="text-center mb-10 max-w-3xl mx-auto space-y-4 text-gray-600">
                <EditorJsDescription
                  data={scholarshipData.eligibility_description}
                />
              </div>

              {scholarshipData.eligibility_points?.length > 0 && (
                <div className="mb-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scholarshipData.eligibility_points.map(
                      (item: any, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                          <ChevronsRight className="w-5 h-5 text-[#2da970] shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 block mb-1">
                              {item.heading}:
                            </strong>
                            <div className="text-gray-600 text-sm leading-relaxed scholarship-editorjs-content">
                              <EditorJsDescription data={item.description} />
                            </div>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {scholarshipData.eligibility_notice && (
                <div className="bg-[#e8f5e9] border border-[#c8e6c9] p-6 rounded-xl text-gray-700 leading-relaxed text-center">
                  <EditorJsDescription
                    data={scholarshipData.eligibility_notice}
                  />
                </div>
              )}
            </div>

            {/* Tips / Process Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4 text-center">
                {scholarshipData.apply_heading}
              </h2>
              <div className="text-center text-gray-600 mb-12 text-lg">
                <EditorJsDescription data={scholarshipData.apply_description} />
              </div>

              <div className="space-y-8">
                {scholarshipData.apply_points?.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row${step.position === "right" ? "-reverse" : ""} bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 items-center gap-8`}
                  >
                    <div className="w-20 h-20 shrink-0 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center p-4">
                      {step.icon_path ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${step.icon_path}`}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      ) : (
                        <CheckCircle className="w-10 h-10" />
                      )}
                    </div>
                    <div
                      className={`flex-1 ${step.position === "right" ? "md:text-right" : ""}`}
                    >
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        {step.heading}
                      </h3>
                      <div className="text-gray-600 leading-relaxed scholarship-editorjs-content">
                        <EditorJsDescription data={step.description} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No scholarship information available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
