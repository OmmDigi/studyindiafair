import React from "react";

interface CostOfStudyingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CostOfStudyingModal({
  isOpen,
  onClose,
}: CostOfStudyingModalProps) {
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
            <div data-elementor-type="wp-page" data-elementor-id="2673" className="elementor elementor-2673">
              <div className="elementor-element elementor-element-75bfa90 e-con-full e-flex e-con e-parent e-lazyloaded" data-id="75bfa90" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-a7c87f6 elementor-widget elementor-widget-heading" data-id="a7c87f6" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h1 className="elementor-heading-title elementor-size-default bg-[#003399] p-4 text-white rounded text-2xl font-bold mb-4">Cost Of Studying In India</h1>
                  </div>
                </div>
                <div className="elementor-element elementor-element-9bfa8bb elementor-widget__width-initial elementor-widget elementor-widget-text-editor mb-8 bg-[#003399] p-4 rounded" data-id="9bfa8bb" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                  <div className="elementor-widget-container">
                    <p className="text-white">Indian universities provide high-quality education at nearly one-fourth the cost of Western universities.</p>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-30e731a row e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="30e731a" data-element_type="container" data-e-type="container">
                <div className="e-con-inner flex flex-col md:flex-row gap-6 p-4">
                  <div className="elementor-element elementor-element-5f1cf4e e-con-full e-flex e-con e-child md:w-1/3" data-id="5f1cf4e" data-element_type="container" data-e-type="container">
                    <div className="elementor-element elementor-element-2561d53 hangg elementor-widget elementor-widget-image" data-id="2561d53" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <img decoding="async" width="300" height="218" src="https://studyindiafair.com/wp-content/uploads/2025/09/cost-of-study-india-300x218.png" className="w-full h-auto rounded" alt="" srcSet="https://studyindiafair.com/wp-content/uploads/2025/09/cost-of-study-india-300x218.png 300w, https://studyindiafair.com/wp-content/uploads/2025/09/cost-of-study-india-1024x744.png 1024w, https://studyindiafair.com/wp-content/uploads/2025/09/cost-of-study-india-768x558.png 768w, https://studyindiafair.com/wp-content/uploads/2025/09/cost-of-study-india-1536x1116.png 1536w, https://studyindiafair.com/wp-content/uploads/2025/09/cost-of-study-india.png 1652w" sizes="(max-width: 300px) 100vw, 300px" />
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-8d80fbc e-con-full e-flex flex-col e-con e-child md:w-2/3" data-id="8d80fbc" data-element_type="container" data-e-type="container">
                    <div className="elementor-element elementor-element-fa85425 e-con-full e-flex e-con e-child mb-4" data-id="fa85425" data-element_type="container" data-e-type="container">
                      <div className="elementor-element elementor-element-c06dba1 elementor-widget elementor-widget-heading" data-id="c06dba1" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default text-2xl font-bold text-secondary">Cost Of Studying In India</h2>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-e9c9cd3 e-con-full e-flex e-con e-child" data-id="e9c9cd3" data-element_type="container" data-e-type="container">
                      <div className="elementor-element elementor-element-2549670 elementor-widget elementor-widget-text-editor" data-id="2549670" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container text-gray-700 leading-relaxed">
                          <p>The <strong>cost of studying in India</strong> is highly affordable compared to many other countries, making it an excellent choice for international and NRI students. Tuition fees vary depending on the university and course, but on average, professional programs like engineering, medicine, and management range between <strong>USD 2,000 to 8,000 per year</strong>, while arts and humanities programs may cost even less. Living expenses are also quite reasonable, with accommodation, food, and transportation costing around <strong>USD 1,000 to 3,000 per year</strong>, depending on the city and lifestyle. Many universities also offer scholarships and financial assistance to deserving students. By choosing India, students can access quality education, modern facilities, and a multicultural environment—<strong>all at a fraction of the cost</strong> compared to studying in Western countries.</p>
                        </div>
                      </div>
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
