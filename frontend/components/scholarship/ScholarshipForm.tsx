"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSubmitEnquiry } from "@/hooks/api";

export default function ScholarshipForm() {
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
    }
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
  );
}
