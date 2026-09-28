import React from "react";

interface PlethoraOfCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlethoraOfCoursesModal({
  isOpen,
  onClose,
}: PlethoraOfCoursesModalProps) {
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
            <div data-elementor-type="wp-page" data-elementor-id="2698" className="elementor elementor-2698">
              <div className="elementor-element elementor-element-75bfa90 e-con-full e-flex e-con e-parent e-lazyloaded" data-id="75bfa90" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-a7c87f6 elementor-widget elementor-widget-heading" data-id="a7c87f6" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h1 className="elementor-heading-title elementor-size-default bg-[#003399] p-4 text-white rounded text-2xl font-bold mb-4">Explore New Fields Of Study</h1>
                  </div>
                </div>
                <div className="elementor-element elementor-element-9bfa8bb elementor-widget__width-initial elementor-widget elementor-widget-text-editor mb-8 bg-[#003399] p-4 rounded" data-id="9bfa8bb" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                  <div className="elementor-widget-container">
                    <p className="text-white">India offers advanced higher education infrastructure and globally respected degrees, producing professionals who contribute significantly to research worldwide.</p>
                  </div>
                </div>
              </div>
              
              <div className="elementor-element elementor-element-30e731a row e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="30e731a" data-element_type="container" data-e-type="container">
                <div className="e-con-inner flex flex-col md:flex-row gap-6 p-4">
                  <div className="elementor-element elementor-element-5f1cf4e e-con-full e-flex e-con e-child md:w-1/3" data-id="5f1cf4e" data-element_type="container" data-e-type="container">
                    <div className="elementor-element elementor-element-2561d53 hangg elementor-widget elementor-widget-image" data-id="2561d53" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <img decoding="async" width="300" height="197" src="https://studyindiafair.com/wp-content/uploads/2025/09/explore-new-field-of-study-300x197.png" className="w-full h-auto rounded" alt="" srcSet="https://studyindiafair.com/wp-content/uploads/2025/09/explore-new-field-of-study-300x197.png 300w, https://studyindiafair.com/wp-content/uploads/2025/09/explore-new-field-of-study-1024x673.png 1024w, https://studyindiafair.com/wp-content/uploads/2025/09/explore-new-field-of-study-768x504.png 768w, https://studyindiafair.com/wp-content/uploads/2025/09/explore-new-field-of-study-1536x1009.png 1536w, https://studyindiafair.com/wp-content/uploads/2025/09/explore-new-field-of-study.png 1687w" sizes="(max-width: 300px) 100vw, 300px" />
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-8d80fbc e-con-full e-flex flex-col e-con e-child md:w-2/3" data-id="8d80fbc" data-element_type="container" data-e-type="container">
                    <div className="elementor-element elementor-element-fa85425 e-con-full e-flex e-con e-child mb-4" data-id="fa85425" data-element_type="container" data-e-type="container">
                      <div className="elementor-element elementor-element-c06dba1 elementor-widget elementor-widget-heading" data-id="c06dba1" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default text-2xl font-bold text-secondary">Explore New Fields Of Study</h2>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-e9c9cd3 e-con-full e-flex e-con e-child" data-id="e9c9cd3" data-element_type="container" data-e-type="container">
                      <div className="elementor-element elementor-element-2549670 elementor-widget elementor-widget-text-editor" data-id="2549670" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container text-gray-700">
                          <p>India has one of the most advanced infrastructure for higher education. Indian degrees are treated with respect all over the world and professionals who have undertaken higher studies in India have made significant contribution to advanced and applied research in different disciplines all over the world.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="elementor-element elementor-element-7856459 e-flex e-con-boxed e-con e-parent e-lazyloaded mt-12" data-id="7856459" data-element_type="container" data-e-type="container">
                <div className="e-con-inner p-8 bg-gray-50 rounded-xl">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-secondary">Exposure to a plethora of new age courses</h2>
                  </div>
                  
                  {/* Course Slider using Horizontal Scroll */}
                  <div className="flex overflow-x-auto gap-6 pb-6 custom-scrollbar snap-x">
                    {/* Item 1 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/why-study-img1.png" alt="Artificial Intelligence" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Artificial Intelligence</h5>
                      </div>
                    </div>
                    
                    {/* Item 2 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/why-study-img2.png" alt="Cyber Security" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Cyber Security</h5>
                      </div>
                    </div>
                    
                    {/* Item 3 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/why-study-img3.png" alt="Data Science" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Data Science</h5>
                      </div>
                    </div>
                    
                    {/* Item 4 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/digital-marketing.jpg" alt="Digital Marketing" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Digital Marketing</h5>
                      </div>
                    </div>
                    
                    {/* Item 5 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/entrepreneurship.jpg" alt="Entrepreneurship" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Entrepreneurship</h5>
                      </div>
                    </div>
                    
                    {/* Item 6 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/film-making-scaled.jpg" alt="Film Making" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Film Making</h5>
                      </div>
                    </div>
                    
                    {/* Item 7 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/photography.jpg" alt="Photography" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Photography</h5>
                      </div>
                    </div>
                    
                    {/* Item 8 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/robotics.jpg" alt="Robotics" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Robotics</h5>
                      </div>
                    </div>
                    
                    {/* Item 9 */}
                    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center flex-shrink-0 border border-gray-100 transition-transform hover:-translate-y-1">
                      <img decoding="async" src="https://studyindiafair.com/wp-content/uploads/2023/10/virtual-reality.jpg" alt="Virtual Reality" className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <h5 className="font-bold text-[#003399] mb-0 text-lg">Virtual Reality</h5>
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
