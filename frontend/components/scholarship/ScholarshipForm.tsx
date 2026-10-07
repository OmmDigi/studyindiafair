"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSubmitEnquiry } from "@/hooks/api";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

export default function ScholarshipForm() {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    currentClass: "",
    studyLevel: "",
    studyStream: "",
    preferredCountry: "",
    stateCity: "",
    additionalInfo: "",
    agreeToNotifications: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const router = useRouter();

  const { mutate: submitEnquiry, isPending: isSubmitting } = useSubmitEnquiry(
    "scholarship",
    {
      onSuccess: () => {
        setFormData(initialFormState);
        router.push("/thank-you");
      },
      onError: (error: any) => {
        console.error(error);
        alert("Failed to submit. Please try again.");
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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
    <div 
      className="rounded-2xl p-8 shadow-xl border border-gray-100 mb-16 max-w-4xl mx-auto relative z-20 -mt-24 md:-mt-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/scholarship/scholershipform.jpeg')" }}
    >
      <h3 className="text-3xl font-bold text-[#001c44] mb-8 text-center">
        Scholarship Enquiry
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm"
            />
          </div>

          <div className="react-phone-wrapper w-full">
            <style jsx global>{`
              .react-phone-wrapper .react-tel-input .form-control {
                width: 100%;
                height: 46px;
                border-radius: 0.5rem;
                border: 1px solid #e5e7eb;
                font-size: 0.875rem;
                padding-left: 58px;
              }
              .react-phone-wrapper .react-tel-input .form-control:focus {
                border-color: #f15a24;
                box-shadow: 0 0 0 1px #f15a24;
              }
              .react-phone-wrapper .react-tel-input .flag-dropdown {
                border-color: #e5e7eb;
                border-top-left-radius: 0.5rem;
                border-bottom-left-radius: 0.5rem;
                background-color: transparent;
              }
              .react-phone-wrapper .react-tel-input .flag-dropdown:hover {
                background-color: #f9fafb;
              }
            `}</style>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                required: true,
                placeholder: "Enter your mobile number",
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Current Class / Course <span className="text-red-500">*</span>
            </label>
            <select
              name="currentClass"
              value={formData.currentClass}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm bg-white"
            >
              <option value="">Select</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Interested Study Level <span className="text-red-500">*</span>
            </label>
            <select
              name="studyLevel"
              value={formData.studyLevel}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm bg-white"
            >
              <option value="">Select</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Preferred Study Stream <span className="text-red-500">*</span>
            </label>
            <select
              name="studyStream"
              value={formData.studyStream}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm bg-white"
            >
              <option value="">Select</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Management">Management</option>
              <option value="Arts & Humanities">Arts & Humanities</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Preferred Country <span className="text-red-500">*</span>
            </label>
            <select
              name="preferredCountry"
              value={formData.preferredCountry}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm bg-white"
            >
              <option value="">Select</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              State / City <span className="text-red-500">*</span>
            </label>
            <select
              name="stateCity"
              value={formData.stateCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm bg-white"
            >
              <option value="">Select</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Chennai">Chennai</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#001c44] mb-2">
              Any Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Type here..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f15a24] text-sm"
            ></textarea>
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
            className="mt-1 w-4 h-4 text-[#f15a24] border-gray-300 rounded focus:ring-[#f15a24]"
          />
          <label htmlFor="agree" className="text-sm text-gray-600">
            I agree to be contacted about scholarship opportunities and other relevant updates.
          </label>
        </div>

        {/* Dummy ReCAPTCHA for visual similarity */}
        <div className="flex justify-center md:justify-start">
          <div className="border border-gray-200 rounded p-2 flex items-center justify-between w-64 bg-gray-50">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-6 h-6 border-gray-300 rounded" />
              <span className="text-sm">I'm not a robot</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8" />
              <span className="text-[10px] text-gray-500">reCAPTCHA</span>
              <span className="text-[8px] text-gray-500">Privacy - Terms</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#f15a24] text-white font-semibold rounded-full hover:bg-[#d94a1a] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

