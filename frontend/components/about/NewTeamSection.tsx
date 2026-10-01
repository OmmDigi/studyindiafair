"use client";

import { useTeamMembers } from "@/hooks/api";
import React, { useState } from "react";
import Image from "next/image";

export default function NewTeamSection() {
  const { data: teamData, isLoading } = useTeamMembers();
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const displayMembers = Array.isArray(teamData)
    ? teamData
    : teamData?.data || [];

  return (
    <section className="py-2 bg-white relative">
      <div className="container mx-auto px-4 md:max-w-7xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2046]">
            Our Team
          </h2>
          <p className="text-lg text-orange-500 font-semibold mt-1">
            People Behind the Journey.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {displayMembers.map((member: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-all shadow-md mb-3 bg-gray-100">
                  <img
                    src={
                      member.image_path
                        ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${member.image_path}`
                        : "/images/placeholder.jpg"
                    }
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h5 className="font-bold text-sm text-center text-[#0B2046] group-hover:text-orange-500 transition-colors line-clamp-1 max-w-[100px]">
                  {member.name}
                </h5>
                <span className="text-xs font-medium text-gray-500 text-center line-clamp-1 max-w-[100px]">
                  {member.designation}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-sm w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 rounded-full transition-colors z-10"
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

            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg mb-6">
                <img
                  src={
                    selectedMember.image_path
                      ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${selectedMember.image_path}`
                      : "/images/placeholder.jpg"
                  }
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2046] mb-1">
                {selectedMember.name}
              </h3>
              <p className="text-orange-500 font-semibold mb-6">
                {selectedMember.designation}
              </p>

              <div className="w-full h-px bg-gray-100 mb-6"></div>

              <p className="text-gray-600 leading-relaxed text-sm">
                {selectedMember.bio ||
                  "SAPE is managed by a team of qualified professionals having expertise in various fields. The members of the core team hold the experience in conceptualization of project, management of project and successful execution of the same."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
