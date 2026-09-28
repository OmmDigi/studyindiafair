import React from "react";

const AboutBanner = () => {
  return (
    <section
      className="w-full h-48 md:h-80 lg:h-[400px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/about/about-bg-1.png')",
      }}
    />
  );
};

export default AboutBanner;
