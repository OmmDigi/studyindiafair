import React from "react";
import ContactFormSection from "@/components/contact-us/ContactFormSection";
import MapSection from "@/components/contact-us/MapSection";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary py-3 md:py-6 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          Contact Us
        </h1>
        <p className="mt-4 text-tertiary-text max-w-2xl mx-auto px-4">
          We'd love to hear from you. Get in touch with us for any inquiries or assistance.
        </p>
      </div>

      <ContactFormSection />
      <MapSection />
    </main>
  );
}
