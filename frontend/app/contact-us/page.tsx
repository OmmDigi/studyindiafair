import type { Metadata } from "next";
import ContactHero from "@/components/contact-us/ContactHero";
import ContactFormSection from "@/components/contact-us/ContactFormSection";
import MapSection from "@/components/contact-us/MapSection";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("contact-us", {
    title: "Contact Us | Study in India Fair",
    description:
      "We'd love to hear from you. Get in touch with Study in India Fair for student admissions, institutional partnerships, and event support.",
  });
}

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SeoSchema slug="contact-us" />
      {/* Hero Banner matching mockup */}
      <ContactHero heroImage="/images/contact-us/1.jpeg" />

      {/* Main Form & Contact Info Section */}
      <ContactFormSection />

      {/* Find Our Office Map Section */}
      <MapSection />
    </main>
  );
}
