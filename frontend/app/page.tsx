import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import StepsToAttend from "@/components/home/StepsToAttend";
import WhyIndia from "@/components/home/WhyIndia";
import OurAssociates from "@/components/home/OurAssociates";
import OurAlliance from "@/components/home/OurAlliance";
import Testimonials from "@/components/home/Testimonials";
import Faqs from "@/components/home/Faqs";
import { generateDynamicMetadata } from "@/lib/seo";
import { SeoSchema } from "@/components/SeoSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata("home", {
    title: "Study in India Fair",
    description: "Study in India Fair - Connecting students with premier Indian educational institutions.",
  });
}

export default function Home() {
  return (
    <>
      <SeoSchema slug="home" />
      <Hero />
      <WhyIndia />
      <UpcomingEvents />
      <StepsToAttend />
      <OurAssociates />
      <OurAlliance />
      <Testimonials />
      <Faqs />
    </>
  );
}
