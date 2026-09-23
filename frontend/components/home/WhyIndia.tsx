import Link from "next/link";

export default function WhyIndia() {
  return (
    <section className="py-6 md:py-10 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6 ">
            Why India
          </h2>
          <p className="text-sm md:text-lg text-tertiary-text ">
            India’s diverse culture attracts global students, offering
            multicultural interaction, tolerance, teamwork, and confidence. Its
            government-regulated education system makes it a hub for
            engineering, IT, management, and medicine.
          </p>
        </div>

        {/* Infographic Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3 lg:gap-4">
          {/* Left Column - 3 Cards */}
          <div className="w-full lg:w-[30%] flex flex-col gap-3 lg:gap-4 justify-center">
            {/* Card 1 */}
            <div className="flex items-center">
              <div className="p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 hover:-translate-y-1 transition-transform duration-300 bg-primary">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/why-india/india-at-a-glance/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    India At A Glance
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  A diverse country with a variety of people and culture
                  students{" "}
                  <Link
                    href="https://studyindiafair.com/why-india/india-at-a-glance/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
              <div className="hidden lg:block ml-4 w-16 flex-shrink-0 animate-pulse">
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow right"
                  className="w-full opacity-60"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center">
              <div className=" p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 hover:-translate-y-1 transition-transform duration-300 bg-primary">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/why-india/education-system-in-india/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Education System In India
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  PRIMARY, SECONDARY &amp; HIGHER SECONDARY EDUCATION - India
                  has a unique{" "}
                  <Link
                    href="https://studyindiafair.com/why-india/education-system-in-india/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
              <div
                className="hidden lg:block ml-4 w-16 flex-shrink-0 animate-pulse"
                style={{ animationDelay: "200ms" }}
              >
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow right"
                  className="w-full opacity-60"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-center">
              <div className=" p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 hover:-translate-y-1 transition-transform duration-300 bg-primary">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/why-india/world-class-education-at-affordable-cost/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    World Class Education At Affordable Cost
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  India offers world-class education at an affordable{" "}
                  <Link
                    href="https://studyindiafair.com/why-india/world-class-education-at-affordable-cost/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
              <div
                className="hidden lg:block ml-4 w-16 flex-shrink-0 animate-pulse"
                style={{ animationDelay: "400ms" }}
              >
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow right"
                  className="w-full opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Middle Column - Center Image & Bottom Card */}
          <div className="w-full lg:w-[40%] flex flex-col justify-start md:justify-center items-center md:items-start gap-0">
            <div className="hidden lg:block w-full max-w-sm xl:max-w-md transform hover:scale-105 transition-transform duration-500 md:p-20">
              <img
                src="https://studyindiafair.com/wp-content/uploads/2025/09/why-india-8.png"
                alt="Why India Central Graphic"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex flex-col items-center w-full">
              <div
                className="hidden lg:block mb-4 w-16 -rotate-90 animate-pulse"
                style={{ animationDelay: "600ms" }}
              >
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow up"
                  className="w-full opacity-60"
                />
              </div>
              <div className="bg-primary p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full sm:w-4/5 text-start md:text-center hover:-translate-y-1 transition-transform duration-300">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/why-india/explore-new-fields-of-study/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Explore New Fields Of Study
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  Every year, India’s vast higher education system attracts{" "}
                  <Link
                    href="https://studyindiafair.com/why-india/explore-new-fields-of-study/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - 3 Cards */}
          <div className="w-full lg:w-[30%] flex flex-col gap-2 md:p-3  lg:gap-4 justify-center">
            {/* Card 4 */}
            <div className="flex items-center flex-col-reverse sm:flex-row-reverse lg:flex-row">
              <div
                className="hidden lg:block mr-4 w-16 flex-shrink-0 rotate-180 animate-pulse"
                style={{ animationDelay: "800ms" }}
              >
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow left"
                  className="w-full opacity-60"
                />
              </div>
              <div className="bg-primary p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 hover:-translate-y-1 transition-transform duration-300">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/why-india/cost-of-studying-in-india/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Cost Of Studying In India
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  The cost of studying in India is highly affordable compared{" "}
                  <Link
                    href="https://studyindiafair.com/why-india/cost-of-studying-in-india/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flex items-center flex-col-reverse sm:flex-row-reverse lg:flex-row">
              <div
                className="hidden lg:block mr-4 w-16 flex-shrink-0 rotate-180 animate-pulse"
                style={{ animationDelay: "1000ms" }}
              >
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow left"
                  className="w-full opacity-60"
                />
              </div>
              <div className=" p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 hover:-translate-y-1 transition-transform duration-300 bg-primary">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/scholarship/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Scholarship
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  The Government of India provides a number of scholarships{" "}
                  <Link
                    href="https://studyindiafair.com/scholarship/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="flex items-center flex-col-reverse sm:flex-row-reverse lg:flex-row">
              <div
                className="hidden lg:block mr-4 w-16 flex-shrink-0 rotate-180 animate-pulse"
                style={{ animationDelay: "1200ms" }}
              >
                <img
                  src="https://studyindiafair.com/wp-content/uploads/2025/09/Arrow-right.gif"
                  alt="Arrow left"
                  className="w-full opacity-60"
                />
              </div>
              <div className=" p-2 md:p-3  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 hover:-translate-y-1 transition-transform duration-300 bg-primary">
                <h4 className="text-xl font-bold mb-3">
                  <Link
                    href="https://studyindiafair.com/why-india/top-global-ceos-with-indian-degree/"
                    className="text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Top Global CEO's With Indian Degree
                  </Link>
                </h4>
                <p className="text-tertiary-text text-sm leading-relaxed">
                  Known For There Diverse Academic Programs and Research{" "}
                  <Link
                    href="https://studyindiafair.com/why-india/top-global-ceos-with-indian-degree/"
                    className="text-red-500 hover:text-red-700 font-medium ml-1"
                  >
                    read more...
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
