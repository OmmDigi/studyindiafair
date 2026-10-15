import React from "react";

interface TopGlobalCEOsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ceos = [
  {
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    image: "/images/why-india/why-india-img1.png",
    logo: "/images/why-india/Microsoft_logo.svg",
  },
  {
    name: "Shantanu Narayen",
    role: "CEO of Adobe Inc.",
    image: "/images/why-india/why-india-img2.png",
    logo: "/images/why-india/Adobe_Corporate_Logo.svg",
  },
  {
    name: "Sundar Pichai",
    role: "CEO of Google & Alphabet",
    image: "/images/why-india/why-india-img3.png",
    logo: "/images/why-india/google_logo.svg",
  },
  {
    name: "Leena Nair",
    role: "CEO of Chanel Group",
    image: "/images/why-india/why-india-img4.png",
    logo: "/images/why-india/g2452.svg",
  },
  {
    name: "Ajaypal Singh Bagha",
    role: "President of World Bank",
    image: "/images/why-india/why-india-img5.png",
    logo: "/images/why-india/world-bank.svg",
  },
  {
    name: "Arvind Krishna",
    role: "CEO of IBM",
    image: "/images/why-india/why-india-img6.png",
    logo: "/images/why-india/IBM_logo_in.svg",
  },
  {
    name: "Neal Mohan",
    role: "CEO of YouTube",
    image: "/images/why-india/twg-content-original-images-neal-mohan-2x.png",
    logo: "/images/why-india/youtube-logo-png-46016-1.png",
  },
  {
    name: "Kunal Shah",
    role: "Global Head of WhatsApp",
    image: "/images/why-india/Kunal Shah.webp",
    logo: "/images/why-india/WhatsApp_Logo_green.svg.webp",
  },
];

export default function TopGlobalCEOsModal({
  isOpen,
  onClose,
}: TopGlobalCEOsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-0 md:p-2"
      onClick={onClose}
    >
      <div
        className="relative w-[95%] md:w-[80%] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-gray-700 hover:text-black bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-md backdrop-blur-sm"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="w-full h-full overflow-y-auto custom-scrollbar p-2">
          <section className="common-section p-0">
            <div
              data-elementor-type="wp-page"
              data-elementor-id="2703"
              className="elementor elementor-2703"
            >
              <div
                className="elementor-element elementor-element-75bfa90 e-con-full e-flex e-con e-parent e-lazyloaded"
                data-id="75bfa90"
                data-element_type="container"
                data-e-type="container"
              >
                <div
                  className="elementor-element elementor-element-a7c87f6 elementor-widget elementor-widget-heading"
                  data-id="a7c87f6"
                  data-element_type="widget"
                  data-e-type="widget"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h1 className="elementor-heading-title elementor-size-default bg-[#003399] p-4 text-white rounded text-2xl font-bold mb-4">
                      Top Global CEO's With Indian Degree
                    </h1>
                  </div>
                </div>
                <div
                  className="elementor-element elementor-element-9bfa8bb elementor-widget__width-initial elementor-widget elementor-widget-text-editor mb-8 bg-[#003399] p-4 rounded"
                  data-id="9bfa8bb"
                  data-element_type="widget"
                  data-e-type="widget"
                  data-widget_type="text-editor.default"
                >
                  <div className="elementor-widget-container">
                    <p className="text-white">
                      Many top global CEOs hold Indian degrees, highlighting the
                      country’s strong academic foundation and global impact in
                      leadership.
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center mb-8 px-4">
                  <img
                    src="/images/home/globalceo.jpeg"
                    alt="Global CEOs with Indian Degree"
                    className="w-full h-auto rounded-lg shadow-md max-w-5xl"
                  />
                </div>
              </div>

              <div
                className="elementor-element elementor-element-1d9b1fd e-flex e-con-boxed e-con e-parent e-lazyloaded"
                data-id="1d9b1fd"
                data-element_type="container"
                data-e-type="container"
              >
                <div className="e-con-inner">
                  <div
                    className="elementor-element elementor-element-df6604d elementor-widget elementor-widget-html"
                    data-id="df6604d"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="html.default"
                  >
                    <div className="elementor-widget-container">
                      <section className="why-india p-4">
                        <div className="container mx-auto">
                          <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-secondary mb-6">
                              Top Global CEO’s With Indian Degree
                            </h2>
                            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
                              India’s education system has produced some of the
                              world’s most influential business leaders — from
                              the CEOs of Google and Microsoft to Mastercard and
                              PepsiCo. Renowned for its strong foundation in
                              analytical thinking, problem-solving, and
                              leadership, Indian education combines academic
                              excellence with real-world adaptability. It’s no
                              surprise that nearly 30% of Fortune 500 CEOs have
                              an Indian educational background — a testament to
                              the country’s globally recognized learning
                              standards and leadership-driven mindset.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {ceos.map((ceo, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center justify-between"
                              >
                                <img
                                  decoding="async"
                                  src={ceo.image}
                                  alt={ceo.name}
                                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top border-4 border-gray-50 bg-gray-50"
                                />
                                <div className="w-full">
                                  <div className="h-8 flex items-center justify-center mb-3">
                                    <img
                                      decoding="async"
                                      src={ceo.logo}
                                      alt={`${ceo.name} Logo`}
                                      className="max-h-full max-w-[100px] object-contain"
                                    />
                                  </div>
                                  <h5 className="font-bold text-lg mb-1 text-[#003399]">
                                    {ceo.name}
                                  </h5>
                                  <span className="text-gray-500 text-sm">
                                    {ceo.role}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
