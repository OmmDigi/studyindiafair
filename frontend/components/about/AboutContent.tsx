import React from "react";

const AboutContent = () => {
  return (
    <section className="py-3 md:py-5 bg-white">
      <div className="container mx-auto px-4 md:max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 text-sm">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl h-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                <a
                  href="https://www.sapeevents.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mr-3 align-middle"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about/sape_india_logo.png"
                    alt="SAPE Events Logo"
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </a>
                is a leading education fair organiser with a proven track record
                of successfully bridging the gap between students and
                educational institutions with a strong presence across Asia,
                Africa and beyond. Over two decades, SAPE has been at the
                forefront of creating platforms that connect students, parents,
                and education providers, helping institutions expand their
                global reach while guiding students towards the right academic
                opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                Our flagship initiative, the Study in India Fairs, has
                established SAPE as a trusted name in international education
                events, bringing together premier Indian universities, colleges,
                and institutions with aspiring students worldwide.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify">
                With a proven track record of delivering impactful,
                well-structured, and result-oriented events, SAPE Events
                flagship initiative STUDY IN INDIA FAIR continues to shape the
                future of student mobility and educational exchange across
                borders.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl h-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                SAPE Study in India Fair is not just about fair; it was about
                future. Study in India Fair today became nourishment for young
                minds hungry for opportunity. SAPE Study in India Fair grew
                fearless, powerfull, and respected, carving its space in the
                education landscape.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                Through consistent innovation and commitment, SAPE continues to
                shape the future of educational outreach and remains a trusted
                name in education fair organisation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                This milestone is also a significant achievement as it signifies
                our commitment to reach SAPE vision to become the strongest
                medium between students and institutions.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify">
                After, 22 years, SAPE Study In India Fair is not just a
                organisation, it is a bridge of trust. A place where parents
                find clarity, students discover direction, and institutions
                connect with the brightest minds. Guided by its founder&apos;s
                spirit, SAPE, Study In India Fair stands as a testament that
                when dreams meet opportunity, a future without limits is
                possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
