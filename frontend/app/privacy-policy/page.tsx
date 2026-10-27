import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("privacy-policy", {
    title: "Privacy Policy | SAPE Events & Media Pvt. Ltd.",
    description:
      "Privacy Policy for SAPE Events & Media Pvt. Ltd. and Study in India Fair. Learn how we collect, use, and safeguard your personal information.",
    url: "https://studyindiafair.com/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-10 md:py-16">
      <SeoSchema slug="privacy-policy" />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Breadcrumb / Tag */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-500">Privacy Policy</span>
        </div>

        {/* Policy Content Card */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 md:p-12 text-gray-700 leading-relaxed">
          {/* Main Title */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2046] tracking-tight">
              Privacy Policy – SAPE Events &amp; Media Pvt. Ltd.
            </h1>
            <div className="w-16 h-1 bg-orange-500 rounded-full mt-4"></div>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-gray-600">
            <p className="leading-relaxed">
              At SAPE Events &amp; Media Pvt. Ltd. (&ldquo;SAPE&rdquo;,
              &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we are
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy outlines how we
              collect, use, disclose, and safeguard your information when you
              visit our website or participate in our events.
            </p>

            <p className="leading-relaxed">
              SAPE respects your privacy and is committed to protecting your
              personal information. When you use our website (sapeevents.com) or
              provide your contact details, we may collect information such as
              your name, mobile number, email address, and service-related
              details to provide healthcare services, respond to inquiries, and
              send important updates. By sharing your contact information and
              opting in, you consent to receive communications from us via RCS,
              SMS, WhatsApp, email, phone calls, or other electronic
              communication channels for purposes including appointment
              confirmations, reminders, service updates, and important
              notifications. You may opt out of promotional or non-essential
              communications at any time by replying &ldquo;STOP&rdquo; to
              messages or contacting us directly. We do not sell or rent your
              personal information and only share data with authorized service
              providers as necessary to deliver our services or comply with
              legal requirements. We implement reasonable administrative and
              technical safeguards to protect your information and retain it
              only for as long as required for operational, medical, or legal
              purposes.
            </p>

            {/* Section 1 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We may collect the following types of information:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-3">
                <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-4">
                  <h3 className="font-semibold text-orange-600 mb-2">
                    a. Personal Information
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Institution/Organization name</li>
                    <li>Designation</li>
                  </ul>
                </div>

                <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4">
                  <h3 className="font-semibold text-[#1877F2] mb-2">
                    b. Non-Personal Information
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Browser type</li>
                    <li>IP address</li>
                    <li>Device information</li>
                    <li>
                      Website usage data (via cookies and analytics tools)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>Register you for our education fairs and events</li>
                <li>Provide event-related updates and communication</li>
                <li>
                  Share relevant information about institutions and
                  opportunities
                </li>
                <li>Improve our website and services</li>
                <li>Respond to inquiries and provide support</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                3. Sharing of Information
              </h2>
              <p className="mb-2">
                We do not sell or rent your personal information. However, we
                may share your data with:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>
                  Participating educational institutions (with your consent)
                </li>
                <li>Event partners and service providers</li>
                <li>Government authorities if required by law</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="mb-2">
                Our website may use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>Enhance user experience</li>
                <li>Analyze website traffic</li>
                <li>Personalize content</li>
              </ul>
              <p className="mt-3">
                You can choose to disable cookies through your browser settings.
              </p>
            </div>

            {/* Section 5 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                5. Data Security
              </h2>
              <p>
                We take appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                loss, or misuse.
              </p>
            </div>

            {/* Section 6 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                6. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. SAPE is
                not responsible for the privacy practices or content of those
                websites.
              </p>
            </div>

            {/* Section 7 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                7. Your Rights
              </h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Request correction or deletion</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us at the details
                below.
              </p>
            </div>

            {/* Section 8 */}
            <div className="pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                8. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with the updated date.
              </p>
            </div>

            {/* Section 9 */}
            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2046] mb-3">
                9. Contact Us
              </h2>
              <p className="mb-4">
                For any questions or concerns regarding this Privacy Policy,
                please contact:
              </p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200/70 text-gray-800 space-y-2">
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
