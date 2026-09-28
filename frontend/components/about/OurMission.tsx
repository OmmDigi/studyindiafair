import React from "react";

const OurMission = () => {
  return (
    <section className="py-3 md:py-5 bg-gray-50">
      <div className="container mx-auto px-4 md:max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column - Text */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 md:p-8 h-full flex flex-col justify-center ">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                Our mission is to exceed your expectations by establishing
                lasting partnerships based on the highest levels of service,
                loyalty, and integrity. As a company, we foster an environment
                that enables team members to achieve personal and professional
                growth and success while providing consistently superior
                services. Your needs and objectives are paramount.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-5/12">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/74300.jpg"
                alt="Our Mission"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
