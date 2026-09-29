import React from "react";
import { CheckCircle, ChevronsRight } from "lucide-react";
import EditorJsDescription from "../EditorJsDescription";
import ScholarshipForm from "./ScholarshipForm";
import { get } from "@/utils/fetcher";

export default async function ScholarshipContent() {
  let scholarshipData = null;
  try {
    scholarshipData = await get<any>("/scholarship/public", {
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error("Failed to fetch scholarship data:", error);
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scholarship Form Client Component */}
        <ScholarshipForm />

        {/* Dynamic Scholarship Content */}
        {scholarshipData ? (
          <>
            {/* Comprehensive Guide Section */}
            <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center mt-12">
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-secondary mb-6">
                  {scholarshipData.about_heading}
                </h2>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                  <EditorJsDescription data={scholarshipData.about_description} />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                {scholarshipData.about_image_path ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${scholarshipData.about_image_path}`}
                    alt={scholarshipData.about_heading || "Scholarship"}
                    className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200"
                  />
                ) : (
                  <div className="relative w-full max-w-md aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Scholarship Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Websites That Allow Search Section */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
                {scholarshipData.eligibility_heading}
              </h2>
              <div className="text-center mb-10 max-w-3xl mx-auto space-y-4 text-gray-600">
                <EditorJsDescription data={scholarshipData.eligibility_description} />
              </div>

              {scholarshipData.eligibility_points?.length > 0 && (
                <div className="mb-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scholarshipData.eligibility_points.map(
                      (item: any, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                          <ChevronsRight className="w-5 h-5 text-[#2da970] shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 block mb-1">
                              {item.heading}:
                            </strong>
                            <div className="text-gray-600 text-sm leading-relaxed scholarship-editorjs-content">
                              <EditorJsDescription data={item.description} />
                            </div>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {scholarshipData.eligibility_notice && (
                <div className="bg-[#e8f5e9] border border-[#c8e6c9] p-6 rounded-xl text-gray-700 leading-relaxed text-center">
                  <EditorJsDescription data={scholarshipData.eligibility_notice} />
                </div>
              )}
            </div>

            {/* Tips / Process Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4 text-center">
                {scholarshipData.apply_heading}
              </h2>
              <div className="text-center text-gray-600 mb-12 text-lg">
                <EditorJsDescription data={scholarshipData.apply_description} />
              </div>

              <div className="space-y-8">
                {scholarshipData.apply_points?.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row${step.position === "right" ? "-reverse" : ""} bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 items-center gap-8`}
                  >
                    <div className="w-20 h-20 shrink-0 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center p-4">
                      {step.icon_path ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${step.icon_path}`}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      ) : (
                        <CheckCircle className="w-10 h-10" />
                      )}
                    </div>
                    <div
                      className={`flex-1 ${step.position === "right" ? "md:text-right" : ""}`}
                    >
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        {step.heading}
                      </h3>
                      <div className="text-gray-600 leading-relaxed scholarship-editorjs-content">
                        <EditorJsDescription data={step.description} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No scholarship information available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
