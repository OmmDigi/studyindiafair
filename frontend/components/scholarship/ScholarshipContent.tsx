"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  ChevronsRight,
  Search,
  PenTool,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function ScholarshipContent() {
  const [formData, setFormData] = useState({
    fullName: "",
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
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to submit form data
    alert("Form submitted successfully!");
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
                  name="fullName"
                  value={formData.fullName}
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

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone No.*"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
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
                className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/80 transition-colors shadow-md"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Comprehensive Guide Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Comprehensive Guide to Scholarships for Higher Studies
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed">
              <p>
                We frequently get mail from our readers to publish information
                about scholarship for studies. In this page, we fulfill a
                long-standing demand of readers details of various scholarships
                available for studies. Fortunately, there are some avenues of
                scholarships available. The only conditions that one must have a
                very good academic record and be able to compete with other
                candidates.
              </p>
              <p>
                A scholarship is a form of financial aid awarded to students for
                further education. Generally, scholarships are awarded based on
                a set of criteria such as academic merit, diversity and
                inclusion, athletic skill, and financial need. Not all
                scholarships are created equal. Some scholarships are in the
                form of tuition fee waivers only, some only cover living
                expenses, while some offer a partial cash grant but there are
                those scholarship programs that cover both tuition fee and
                living expenses and sometimes include travel costs, book
                allowance, insurance, etc.
              </p>
              <p>
                Scholarship criteria usually reflect the values and goals of the
                donor of the award, and while scholarship recipients are not
                required to repay scholarships, the awards may require that the
                recipient continue to meet certain requirements during their
                period of support, such maintaining a minimum grade point
                average or engaging in a certain activity.
              </p>
              <p>
                The best way to win a scholarship is to apply for those with
                criteria that fit your specific profile. But how do you find
                those elusive scholarships? Most of the develop countries
                provides scholarships to students from select countries who have
                no other source of financial help for their graduate and post
                graduate studies. The scholarships are 100 percent grant.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            {/* Fallback layout if image is missing */}
            <div className="relative w-full max-w-md aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Scholarship Image</span>
            </div>
          </div>
        </div>

        {/* Websites That Allow Search Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
            Websites That Allow International Students To Search For
            Scholarships
          </h2>
          <div className="text-center mb-10 max-w-3xl mx-auto space-y-4 text-gray-600">
            <p>
              Embassies/High commission of the respective countries’ websites
              will provide complete details regarding Scholarships.
            </p>
            <p>
              Don’t miss important scholarship announcements and other vital
              news follow Embassies/High commission WEBSITES regularly
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-xl mb-4 text-slate-800">
              The most common scholarships may be classified as:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Merit-based",
                  desc: "These awards are based on a student’s academic, artistic, athletic, or other abilities, and often a factor in an applicant’s extracurricular activities and community service record.",
                },
                {
                  title: "Need-based",
                  desc: "Some private need-based awards are confusingly called scholarships, and require the results of a FAFSA (the family’s expected family contribution).",
                },
                {
                  title: "Student-specific",
                  desc: "These are scholarships for which applicants must initially qualify based upon gender, race, religion, family, and medical history, or many other student-specific factors.",
                },
                {
                  title: "Career-specific",
                  desc: "These are scholarships a college or university awards to students who plan to pursue a specific field of study. Often, the most generous awards go to students who pursue careers in high-need areas.",
                },
                {
                  title: "College-specific",
                  desc: "College-specific scholarships are offered by individual colleges and universities to highly qualified applicants based on academic and personal achievement.",
                },
                {
                  title: "Athletic",
                  desc: "Awarded to students with exceptional skill in a sport. Often this is so that the student will be available to attend the school or college and play the sport on their team.",
                },
                {
                  title: "Brand",
                  desc: "These scholarships are sponsored by a corporation that is trying to gain attention to their brand, or a cause. Sometimes these scholarships are referred to as branded scholarships.",
                },
                {
                  title: "Creative contest",
                  desc: "These scholarships are awarded to students based on a creative submission. Contest scholarships are also called mini project-based scholarships.",
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <ChevronsRight className="w-5 h-5 text-[#2da970] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block mb-1">
                      {item.title}:
                    </strong>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#e8f5e9] border border-[#c8e6c9] p-6 rounded-xl text-gray-700 leading-relaxed text-center">
            <p className="mb-2">
              Applying to college as an international student can be daunting
              enough without thinking about how to pay for it. However, there
              are many countries with scholarships for prospective undergraduate
              to PHD students.
            </p>
            <p>
              International students should look for scholarships that accept
              international applicants. Most scholarships require an application
              process. Some may require an essay, proof of community involvement
              or examples of leadership skills. Some also require proof of
              language proficiency or other test scores.
            </p>
          </div>
        </div>

        {/* Tips / Process Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4 text-center">
            Scholarships For Study All Over The World
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Here Are Some Tips On How To Get Started:
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 items-center gap-8">
              <div className="w-20 h-20 shrink-0 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Start your search for scholarships like Embassies/High
                  commission, universities etc. websites. You can search
                  scholarships by location, subject of study, student origin, or
                  scholarships name. After you find an scholarships that you are
                  interested in, click on it. You will then be prompted to sign
                  into your account, or to create an account. After this is
                  complete you can contact the host institution directly to
                  apply.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 items-center gap-8">
              <div className="w-20 h-20 shrink-0 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
                <PenTool className="w-10 h-10" />
              </div>
              <div className="md:text-right">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  Register or Sign In
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create an account, or sign in when searching for scholarships,
                  so when you find an scholarships that you are interested in,
                  you have access to the information you need to apply- right at
                  your fingertips. To create an account, you simply need an
                  email and a password. You can also save awards that you are
                  interested in and come back later to apply!
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 items-center gap-8">
              <div className="w-20 h-20 shrink-0 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  Apply for scholarships
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Once you have created an account, logged in and decided on an
                  award you would like to apply for, you can view the contact
                  information for the host institution that offers the award;
                  contact that organization directly for more information; and
                  find out how to apply. If eligible, you can then apply for the
                  award directly through the host organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
