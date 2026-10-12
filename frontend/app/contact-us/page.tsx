import React from "react";
import ContactHero from "@/components/contact-us/ContactHero";
import ContactFormSection from "@/components/contact-us/ContactFormSection";
import MapSection from "@/components/contact-us/MapSection";
import { generateSEO } from "@/components/SEO";

export const metadata = generateSEO({
  title: "Contact Us | Study in India Fair",
  description:
    "We'd love to hear from you. Get in touch with Study in India Fair for student admissions, institutional partnerships, and event support.",
});

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner matching mockup */}
      <ContactHero heroImage="/images/contact-us/1.jpeg" />

      {/* Main Form & Contact Info Section */}
      <ContactFormSection />

      {/* Find Our Office Map Section */}
      <MapSection />
    </main>
  );
}
