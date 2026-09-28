import React from "react";

interface EducationSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EducationSystemModal({
  isOpen,
  onClose,
}: EducationSystemModalProps) {
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
              data-elementor-id="2693"
              className="elementor elementor-2693"
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
                      EDUCATION SYSTEM IN INDIA
                      <br />
                      PRIMARY, SECONDARY &amp; HIGHER SECONDARY EDUCATION
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
                  <div className="elementor-widget-container space-y-4">
                    <p className="text-white">
                      India has a unique education system designed to uphold its
                      nation’s culture, history, values, and customs. India is
                      the largest education systems of the World, with a diverse
                      range of educational institutions catering to millions of
                      students across the world.
                    </p>
                    <p className="text-white">
                      In the Indian system, higher education includes the
                      education imparted after the 10 + 2 stage – ten years of
                      primary and secondary education followed by two years of
                      higher secondary education. In general the medium of
                      instructions in India is English. English is widely spoken
                      and understood in India.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-30e731a row e-flex e-con-boxed e-con e-parent e-lazyloaded"
                data-id="30e731a"
                data-element_type="container"
                data-e-type="container"
              >
                <div className="e-con-inner flex flex-col md:flex-row gap-6 p-4">
                  <div
                    className="elementor-element elementor-element-5f1cf4e e-con-full e-flex e-con e-child md:w-1/3"
                    data-id="5f1cf4e"
                    data-element_type="container"
                    data-e-type="container"
                  >
                    <div
                      className="elementor-element elementor-element-2561d53 hangg elementor-widget elementor-widget-image"
                      data-id="2561d53"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="image.default"
                    >
                      <div className="elementor-widget-container">
                        <img
                          decoding="async"
                          src="https://studyindiafair.com/wp-content/uploads/elementor/thumbs/EDUCATION-SYSTEM-IN-INDIA-rdmqds7g0zezody7mnik7tken6bvcvahyc0992kwp4.png"
                          title="EDUCATION-SYSTEM-IN-INDIA"
                          alt="EDUCATION-SYSTEM-IN-INDIA"
                          loading="lazy"
                          className="w-full h-auto rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="elementor-element elementor-element-8d80fbc e-con-full e-flex flex-col e-con e-child md:w-2/3"
                    data-id="8d80fbc"
                    data-element_type="container"
                    data-e-type="container"
                  >
                    <div
                      className="elementor-element elementor-element-fa85425 e-con-full e-flex e-con e-child mb-4"
                      data-id="fa85425"
                      data-element_type="container"
                      data-e-type="container"
                    >
                      <div
                        className="elementor-element elementor-element-c06dba1 elementor-widget elementor-widget-heading"
                        data-id="c06dba1"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default text-2xl font-bold text-secondary">
                            HIGHER EDUCATION SYSTEM IN INDIA
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div
                      className="elementor-element elementor-element-e9c9cd3 e-con-full e-flex e-con e-child"
                      data-id="e9c9cd3"
                      data-element_type="container"
                      data-e-type="container"
                    >
                      <div
                        className="elementor-element elementor-element-2549670 elementor-widget elementor-widget-text-editor"
                        data-id="2549670"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="text-editor.default"
                      >
                        <div className="elementor-widget-container text-gray-700 space-y-4">
                          <p>
                            <strong>
                              PRIMARY, SECONDARY &amp; HIGHER SECONDARY
                              EDUCATION-
                            </strong>
                            <br />
                            India has a unique education system designed to
                            uphold its nation’s culture, history, values and
                            customs. India is the largest education system of
                            the World, with a diverse range of educational
                            institutions catering to millions of students across
                            the world.
                            <br />
                            In the Indian system, higher education includes the
                            education imparted after the 10 + 2 stage – ten
                            years of primary and secondary education followed by
                            two years of higher secondary education.In general
                            the medium of instruction in India is
                            English.English is widely spoken and understood in
                            India.
                          </p>
                          <p>
                            Universities and specialized institutes are the
                            centres for higher education in India. The studies
                            and disciplines cover a wide range of subjects from
                            poetry to computer engineering to space research.
                            Most of the universities and higher centres of
                            learning and research are autonomous in function. A
                            good number of universities have a federal structure
                            composed of affiliated colleges on one tier and the
                            university departments on the other.
                          </p>
                          <p>
                            There are a number of colleges and universities in
                            India both government as well as private recognized
                            by government, which are imparting academic and
                            professional education. Detailed and elaborate
                            information on these colleges and universities can
                            be accessed on the website of the University Grants
                            Commission (UGC){" "}
                            <a
                              href="https://www.ugc.ac.in"
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600"
                            >
                              www.ugc.ac.in
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-e476d31 e-flex e-con-boxed e-con e-parent e-lazyloaded mt-8"
                data-id="e476d31"
                data-element_type="container"
                data-e-type="container"
              >
                <div className="e-con-inner p-6 bg-gray-50 rounded-xl">
                  <div
                    className="elementor-element elementor-element-18ed2b9 elementor-widget elementor-widget-heading mb-4"
                    data-id="18ed2b9"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default text-2xl font-bold text-secondary">
                        TYPE OF UNIVERSITIES
                      </h2>
                    </div>
                  </div>
                  <div
                    className="elementor-element elementor-element-3ee0404 elementor-widget elementor-widget-text-editor mb-6"
                    data-id="3ee0404"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="text-editor.default"
                  >
                    <div className="elementor-widget-container text-gray-700">
                      <p>
                        On the basis of management the universities are
                        classified as:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <img
                        decoding="async"
                        src="https://studyindiafair.com/wp-content/uploads/elementor/thumbs/graduation-1-rdmqds7airab709qh602nxzt5lowm4rg5to31xm9cw.png"
                        title="graduation (1)"
                        alt="graduation (1)"
                        loading="lazy"
                        className="mb-4 h-12"
                      />
                      <h5 className="font-bold text-lg mb-2 text-[#003399]">
                        Central Universities
                      </h5>
                      <p className="text-sm text-gray-600">
                        These are set up through an Act in Parliament. The
                        establishment and operation are funded by the Union
                        Government.{" "}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <img
                        decoding="async"
                        src="https://studyindiafair.com/wp-content/uploads/elementor/thumbs/school-2-rdmqdt54plblim8dboep8fr9qzk9ttv6hybkj7kv6o.png"
                        title="school (2)"
                        alt="school (2)"
                        loading="lazy"
                        className="mb-4 h-12"
                      />
                      <h5 className="font-bold text-lg mb-2 text-[#003399]">
                        State Universities
                      </h5>
                      <p className="text-sm text-gray-600">
                        These are set up through an Act in the State
                        Legislature. The state universities are primarily funded
                        and operated by the State Government.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <img
                        decoding="async"
                        src="https://studyindiafair.com/wp-content/uploads/elementor/thumbs/school-3-rdmqdr9gbx90veb3mnlg3g8ck7tjefnptp0lknnnj4.png"
                        title="school (3)"
                        alt="school (3)"
                        loading="lazy"
                        className="mb-4 h-12"
                      />
                      <h5 className="font-bold text-lg mb-2 text-[#003399]">
                        Private Universities
                      </h5>
                      <p className="text-sm text-gray-600">
                        These are set up through an Act in the State
                        Legislatures. It includes specialized institutions and
                        multidisciplinary research universities.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <img
                        decoding="async"
                        src="https://studyindiafair.com/wp-content/uploads/elementor/thumbs/university-rdmqdu2ywfcvu87066tbsxiqcdfn1iywu2z20hjh0g.png"
                        title="university"
                        alt="university"
                        loading="lazy"
                        className="mb-4 h-12"
                      />
                      <h5 className="font-bold text-lg mb-2 text-[#003399]">
                        Deemed Universities
                      </h5>
                      <p className="text-sm text-gray-600">
                        These are well-performing institutes that are declared
                        to be of equal standing as the universities by the
                        Central Government on the advice of the Union Grants
                        Commission (UGC).
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <img
                        decoding="async"
                        src="https://studyindiafair.com/wp-content/uploads/elementor/thumbs/university-1-rdmqdu2ywfcvu87066tbsxiqcdfn1iywu2z20hjh0g.png"
                        title="university (1)"
                        alt="university (1)"
                        loading="lazy"
                        className="mb-4 h-12"
                      />
                      <h5 className="font-bold text-lg mb-2 text-[#003399]">
                        Institutes of National Importance (INI)
                      </h5>
                      <p className="text-sm text-gray-600">
                        These are eminent institutions of India that are known
                        to develop highly skilled individuals. They are funded
                        by the Government of India and include all the IITs,
                        IIITs, NITs and AIIMs institutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-87cf1cf e-flex e-con-boxed e-con e-parent e-lazyloaded mt-12 p-4"
                data-id="87cf1cf"
                data-element_type="container"
                data-e-type="container"
              >
                <div className="e-con-inner">
                  <h2 className="elementor-heading-title elementor-size-default text-2xl font-bold text-secondary mb-6">
                    COURSES AND DEGREES
                  </h2>

                  <div className="flex flex-col md:flex-row gap-8 mb-8 items-center">
                    <div className="md:w-1/2">
                      <img
                        decoding="async"
                        width="1000"
                        height="667"
                        src="https://studyindiafair.com/wp-content/uploads/2025/10/109766.jpg"
                        className="w-full h-auto rounded-lg shadow-md"
                        alt="Undergraduate Courses"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="elementor-heading-title elementor-size-default text-xl font-bold text-[#003399] mb-4">
                        Undergraduate Courses
                      </h3>
                      <p className="text-gray-700">
                        Undergraduate courses, in general, are of three years
                        leading to the final examinations. The universities and
                        higher institutes award Bachelor’s degree in Arts,
                        Science, Commerce, etc. However, undergraduate courses
                        leading to a first degree in professional subjects like
                        Engineering, Medicine, Dentistry and Pharmacy are of a
                        longer duration ranging from four to five and a half
                        years.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                      <h3 className="elementor-heading-title elementor-size-default text-xl font-bold text-[#003399] mb-4">
                        Postgraduate Courses
                      </h3>
                      <p className="text-gray-700">
                        Courses in Arts, Science and Medicine usually last two
                        years ending with a Master’s degree. For Engineering and
                        Technology, the courses are for one and a half years.
                        Specialized fields for instance, for a Bachelor of
                        Education (B.Ed) degree, the possession of a Bachelor’s
                        degree in any other discipline is required before
                        admission can be obtained. Some universities and higher
                        institutes offer a diploma or a certificate course of
                        shorter duration in disciplines like Engineering,
                        Agricultural Sciences and Computer Technology. The
                        duration of these courses varies from university to
                        university.
                      </p>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        loading="lazy"
                        decoding="async"
                        width="1500"
                        height="857"
                        src="https://studyindiafair.com/wp-content/uploads/2025/10/25873.jpg"
                        className="w-full h-auto rounded-lg shadow-md"
                        alt="Postgraduate Courses"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 mt-12 bg-blue-50/50 rounded-xl">
                <h2 className="elementor-heading-title elementor-size-default text-2xl font-bold text-secondary mb-6">
                  Eligibility for Admission
                </h2>
                <img
                  loading="lazy"
                  decoding="async"
                  width="1920"
                  height="305"
                  src="https://studyindiafair.com/wp-content/uploads/2025/10/eligibilty-of-admission.png"
                  className="w-full h-auto mb-8 rounded shadow-sm"
                  alt="Eligibility"
                />
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    <strong>IMPORTANT: </strong>International students going to
                    India for higher education must deposit tuition fee for one
                    year to the concerned university/college. It may also be
                    ensured that the foreign student has a minimum amount of US$
                    2000 readily available to meet day to day expenses if the
                    duration of course is for more than one year and US$ 1000 if
                    the course is less than one year. International students
                    must register themselves with the Foreigners Regional
                    Registration Office of the concerned state immediately on
                    arrival in India (www.immigrationindia.nic.in).
                  </p>
                  <p>
                    For admission to undergraduate courses, in the universities
                    or institutions of higher education in India, the candidates
                    need to complete 12 years of schooling having passed in 5
                    subjects in the Senior Secondary or equivalent examination
                    with 60-70% marks in their qualifying examinations. For
                    admission to undergraduate technical courses, the candidates
                    should obtain 75-80% in their qualifying examinations which
                    should include the subjects: Physics, Chemistry, Biology,
                    Mathematics and English. Admission requirements to
                    undergraduate pass courses are not very rigid. Admission in
                    non-professional colleges is usually not difficult,except in
                    the case of some selected colleges in metropolitan towns
                    where there is strong competition.Entry into professional
                    colleges, e.g. in Medicine, Engineering, Pharmacy,
                    Dentistry, Architecture,Management or Agriculture is
                    difficult because of the limited number of seats available,
                    and is generally based on a separate admission test.
                    However, in some cases, overseas applicants can be admitted
                    against nominated seats/paid seats according to prescribed
                    guidelines of the Indian university concerned.
                  </p>
                  <p>
                    Foreign students need to get their year 12 certificate
                    equated by the Association of Indian Universities (AIU)
                    which has been accepted as an accredited agency at the
                    national level for undertaking the assessment/ for equating
                    of foreign academic credentials with the Senior Secondary
                    Examination (Class XII) in India and is considered to be the
                    minimum admission requirement for the first degree programme
                    (www.aiu.nic.in).
                  </p>
                  <p>
                    Indian universities do not give blanket recognition to the
                    degree/diploma/certificate awarded by foreign.
                  </p>
                  <p className="p-4 bg-white border-l-4 border-[#128C7E] rounded shadow-sm text-[#003399]">
                    <strong>MEDIUM OF INSTRUCTION: </strong>In most of
                    universities the medium of instruction is English. In case
                    of professional courses, and for science and technical
                    subjects, English is exclusively used for teaching. For the
                    Humanities, Social Sciences and Commerce faculties, the
                    medium of instruction is both in English and in regional
                    languages. Postgraduate education is conducted in English in
                    most of the centres.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
