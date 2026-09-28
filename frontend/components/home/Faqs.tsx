"use client";

import { useFaqs } from "@/hooks/api";
import { log } from "console";
import React, { useState } from "react";

const faqs = [
  {
    question:
      "When & Where the upcoming Study In India Education Fairs are happening?",
    answer: (
      <div className="space-y-4">
        <p>
          <strong>CHITTAGONG</strong>
          <br />
          DATE: 7 & 8 AUGUST 2026
          <br />
          VENUE: THE PENINSULA HOTEL
        </p>
        <p>
          <strong>DHAKA</strong>
          <br />
          DATE: 10 & 11 AUGUST 2026
          <br />
          VENUE: THE WESTIN DHAKA
        </p>
        <p>
          <strong>KATHMANDU</strong>
          <br />
          DATE: 8 & 9 JULY 2026
          <br />
          VENUE: THE EVEREST HOTEL
        </p>
        <p>
          <strong>BIRGUNJ</strong>
          <br />
          DATE: 11 JULY 2026
          <br />
          VENUE: SIDDHARTHA DIYALO HOTEL
        </p>
        <p>
          <strong>BIRATNAGAR</strong>
          <br />
          DATE: 13 JULY 2026
          <br />
          VENUE: NAMASKAR REGENCY
        </p>
        <p>
          <strong>SIERRA LEONE</strong>
          <br />
          DATE: 16th FEBRUARY, 2026
          <br />
          VENUE: CITY HALL, CITY COUNCIL, FREE TOWN
        </p>
        <p>
          <strong>LIBERIA</strong>
          <br />
          DATE: 18th FEBRUARY, 2026
          <br />
          VENUE: BELLA B CASA HOTEL, 2ND STREET SINKOR, MONROVIA
        </p>
        <p>
          <strong>GHANA</strong>
          <br />
          DATE: 20th FEBRUARY, 2026
          <br />
          VENUE: LANCASTER HOTEL, ACCRA
        </p>
        <p>
          <strong>YANGON</strong>
          <br />
          DATE: 27th & 28th MARCH, 2026
          <br />
          VENUE: INDIA CENTRE, YANGON
        </p>
        <p>
          <strong>MANDALAY</strong>
          <br />
          DATE: 30th MARCH, 2026
          <br />
          VENUE: HOTEL MINGALAR MANDALAY, MANDALAY
        </p>
      </div>
    ),
  },
  {
    question: "Why should I attend Study In India Education Fair?",
    answer: (
      <div>
        <p className="mb-2">
          CONSIDERING HIGHER EDUCATION IN INDIA BENEFITS IN SEVERAL WAYS, SOME
          OF THE MOST CRUCIAL REASONS ARE –
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>EXPLORE DIVERSE INSTITUTIONS</li>
          <li>
            FIRST-HAND INFORMATION FROM THE DIRECT REPRESENTATIVES OF THE
            VARIOUS INSTITUTIONS REGARDING COURSES, FEE, PLACEMENT
            OPPORTUNITIES, ADMISSION CRITERIA
          </li>
          <li>SCHOLARSHIP INFORMATION</li>
          <li>VISA & OTHER NECESSARY GUIDANCE</li>
          <li>HUGE CULTURAL EXPOSURE</li>
          <li>COMPARATIVE ANALYSIS OF DIFFERENT INSTITUTIONS IN A MOMENT</li>
          <li>APPLICATION PROCEDURE</li>
          <li>EXPLORING POSSIBILITIES UNDER ONE ROOF.</li>
        </ul>
      </div>
    ),
  },
];

import { EditorJsDescription } from "@/components/EditorJsDescription";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const {
    data: faqsData,
    isLoading,
    isError,
    error,
    status,
  } = useFaqs("home", 10);
  console.log("Faqs query status:", {
    status,
    isLoading,
    isError,
    error,
    faqsData,
  });

  const displayFaqs =
    (faqsData?.data || faqsData) && Array.isArray(faqsData?.data || faqsData)
      ? faqsData?.data || faqsData
      : faqs;

  return (
    <section className="py-3 md:py-5 bg-white">
      <div className="container mx-auto px-4 md:max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Frequently Asked Questions (FAQ&apos;s)
          </h2>
          <p className="text-sm md:text-md leading-relaxed text-tertiary-text">
            Got questions? Your queries clarified!
          </p>
        </div>

        <div className="space-y-2">
          {displayFaqs.map((faq: any, index: number) => (
            <div
              key={faq.id || index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-2 md:p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <h5 className="font-semibold text-gray-800 text-sm md:text-base">
                  {faq.question}
                </h5>
                <div
                  className={`w-6 h-6 flex-shrink-0 ml-4 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-[2000px] opacity-100 border-t border-gray-200"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 md:p-5 text-gray-600 text-sm md:text-base bg-white">
                  {faq.answer &&
                  typeof faq.answer === "object" &&
                  "blocks" in faq.answer ? (
                    <EditorJsDescription data={faq.answer} />
                  ) : (
                    faq.answer
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
