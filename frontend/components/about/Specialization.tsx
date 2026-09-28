import React from "react";

const Specialization = () => {
  return (
    <section className="py-3 md:py-5 bg-gray-50">
      <div className="container mx-auto px-4 md:max-w-6xl -mt-[70px]">
        <div className="w-full lg:w-10/12 mx-auto">
          <div className="bg-white p-2 md:p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4 text-secondary">
              Specialization
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* SAPE Events Column */}
              <div className="flex flex-col h-full bg-transparent">
                <h5 className="text-xl font-bold text-green-600 mb-4">
                  SAPE Events
                </h5>
                <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed marker:text-green-500">
                  <li>
                    Expertise in bridging students with universities and
                    institutions globally.
                  </li>
                  <li>
                    Proven track record of hosting successful large-scale
                    education exhibitions for over two decades.
                  </li>
                  <li>
                    Specialised in end-to-end event management – from planning
                    and promotion to on-ground execution.
                  </li>
                  <li>
                    Strong network with premier institutions, embassies, and
                    education bodies.
                  </li>
                </ul>
              </div>

              {/* Study in India Fairs Column */}
              <div className="flex flex-col h-full bg-transparent">
                <h5 className="text-xl font-bold text-yellow-600 mb-4">
                  Study in India Fairs (Flagship Event by SAPE)
                </h5>
                <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed marker:text-yellow-500">
                  <li>
                    Exclusively focused on promoting Indian higher education
                    abroad.
                  </li>
                  <li>
                    Showcasing India’s premier universities, institutions of
                    national importance, and private universities.
                  </li>
                  <li>
                    Dedicated to connecting international students with quality
                    and affordable education opportunities.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialization;
