import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("terms-conditions", {
    title: "Terms & Conditions | SAPE Events & Media Pvt. Ltd.",
    description:
      "Terms & Conditions for SAPE Events & Media Pvt. Ltd. and Study in India Fair. Read our guidelines for website use, event participation, and service policies.",
    url: "https://studyindiafair.com/terms-conditions",
  });
}

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-white py-10 md:py-16">
      <SeoSchema slug="terms-conditions" />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Breadcrumb / Tag */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-500">Terms &amp; Conditions</span>
        </div>

        {/* Terms Content Card */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 md:p-12 text-gray-700 leading-relaxed">
          {/* Main Title */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2046] tracking-tight">
              Terms &amp; Conditions – SAPE Events &amp; Media Pvt. Ltd.
            </h1>
            <div className="w-16 h-1 bg-orange-500 rounded-full mt-4"></div>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-gray-600">
            <p className="leading-relaxed">
              Welcome to the website of SAPE Events &amp; Media Pvt. Ltd.
              (&ldquo;SAPE&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
              &ldquo;us&rdquo;). By accessing or using our website and services,
              you agree to comply with and be bound by the following Terms &amp;
              Conditions.
            </p>

            <p className="leading-relaxed">
              By accessing and using sapeevents.com, you agree to comply with
              these terms. The information provided on this website is for
              general and healthcare-related purposes only and should not be
              considered medical advice. By submitting your contact details, you
              consent to receive communications from SAPE via RCS, SMS,
              WhatsApp, email, phone calls, or other electronic channels for
              appointments, updates, and service-related notifications. You may
              opt out of non-essential communications at any time. Users agree
              not to misuse the website or attempt unauthorized access.
            </p>

            <p className="leading-relaxed">
              SAPE reserves the right to update these terms at any time without
              prior notice. Continued use of the website indicates acceptance of
              the updated terms.
            </p>

            {/* Section 1 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                1. Use of Website
              </h2>
              <p className="mb-2">By using this website, you agree to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>Use the website only for lawful purposes</li>
                <li>
                  Provide accurate and complete information when registering or
                  submitting forms
                </li>
                <li>
                  Not engage in any activity that may harm or disrupt the
                  website or its services
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                2. Event Participation
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>
                  Participation in SAPE education fairs and events is subject to
                  registration and confirmation.
                </li>
                <li>
                  SAPE reserves the right to accept or reject any participation
                  request without prior notice.
                </li>
                <li>
                  Participants (institutions/students) must comply with all
                  event guidelines and instructions provided.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                3. Payments &amp; Fees
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>
                  All participation fees must be paid as per the agreed terms
                  and timelines.
                </li>
                <li>
                  Fees once paid are{" "}
                  <strong className="text-gray-900">non-refundable</strong>,
                  unless otherwise agreed in writing.
                </li>
                <li>
                  SAPE reserves the right to deny participation in case of
                  non-payment or delayed payment.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                4. Cancellation &amp; Changes
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>
                  SAPE reserves the right to reschedule, postpone, or cancel
                  events due to unforeseen circumstances (e.g., natural
                  disasters, political situations, government restrictions,
                  etc.).
                </li>
                <li>
                  In such cases, participants will be informed, and alternative
                  arrangements may be provided at SAPE&rsquo;s discretion.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                5. Intellectual Property
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>
                  All content on this website (text, logos, graphics, images) is
                  the property of SAPE and is protected by applicable copyright
                  laws.
                </li>
                <li>
                  Unauthorized use, reproduction, or distribution of content is
                  strictly prohibited.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                6. Limitation of Liability
              </h2>
              <p className="mb-2">
                SAPE shall not be held liable for any direct, indirect, or
                incidental damages arising from:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600 mb-3">
                <li>Participation in events</li>
                <li>Use of the website</li>
                <li>Interaction between students and institutions</li>
              </ul>
              <p>
                SAPE acts as a platform connecting students and institutions and
                does not guarantee admissions, placements, or outcomes.
              </p>
            </div>

            {/* Section 7 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                7. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. SAPE is
                not responsible for the content, policies, or practices of such
                websites.
              </p>
            </div>

            {/* Section 8 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                8. Privacy
              </h2>
              <p>
                Your use of our website is also governed by our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Privacy Policy
                </Link>
                . By using our website, you consent to the collection and use of
                your information as outlined in that policy.
              </p>
            </div>

            {/* Section 9 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                9. Governing Law
              </h2>
              <p>
                These Terms &amp; Conditions shall be governed by and construed
                in accordance with the laws of India. Any disputes shall be
                subject to the jurisdiction of courts in Kolkata, West Bengal.
              </p>
            </div>

            {/* Section 10 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                10. Changes to Terms
              </h2>
              <p>
                SAPE reserves the right to update or modify these Terms &amp;
                Conditions at any time without prior notice. Continued use of
                the website constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* Section 11 */}
            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                11. Contact Us
              </h2>
              <p className="mb-4">
                For any queries regarding these Terms &amp; Conditions, please
                contact:
              </p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200/70 text-gray-800 space-y-2">
                {/* <p className="font-bold text-[#0B2046]">
                  SAPE Events &amp; Media Pvt. Ltd.
                </p> */}
                <p className="text-sm text-gray-600">Kolkata, India</p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Email: </span>
                  <a
                    href="mailto:info@sapeevents.com"
                    className="text-orange-600 hover:text-orange-700 font-medium underline"
                  >
                    info@sapeevents.com
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Phone: </span>
                  <a
                    href="tel:+919830058408"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    +919830058408
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
