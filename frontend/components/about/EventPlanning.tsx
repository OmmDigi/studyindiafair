import React from "react";

const EventPlanning = () => {
  return (
    <section className="py-3 md:py-5 bg-white">
      <div className="container mx-auto px-4 md:max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column - Image (hidden on smaller screens) */}
          <div className="hidden lg:block lg:w-4/12">
            <div className="overflow-hidden bg-white flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/event.png"
                alt="Event Planning"
                className="w-full max-w-sm h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="w-full lg:w-8/12">
            <div className="bg-white p-6 md:p-8 h-full flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
                Planning Events
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                Planning a great event involves a lot of steps: hiring qualified
                staff, providing excellent customer service, using proven
                processes and technologies, capitalizing on solid industry
                relationships, and more. To keep everything on track, we assume
                responsibility for your event planning through seamless
                logistical coordination and flawless execution. We assist you in
                better defining conference objectives and guide you in selecting
                the site and developing timeline, budget, and all logistical
                details. Experience to offer, knowledge to share, and commitment
                to succeed — our administrative strength, event planning skills
                and association management expertise help our association clients
                anticipate and meet member needs. Our proven leadership
                practices position your organization to be the recognized
                association leader in your industry. Our experienced association
                management team ensures every detail is handled with precision
                -empowering your organization to grow & engage members
                effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPlanning;
