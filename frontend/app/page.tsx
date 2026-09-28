import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import StepsToAttend from "@/components/home/StepsToAttend";
import WhyIndia from "@/components/home/WhyIndia";
import OurAssociates from "@/components/home/OurAssociates";
import OurAlliance from "@/components/home/OurAlliance";
import Testimonials from "@/components/home/Testimonials";
import Faqs from "@/components/home/Faqs";

export default function Home() {
  return (
    <>
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
