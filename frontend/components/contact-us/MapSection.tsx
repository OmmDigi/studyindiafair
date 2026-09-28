import React from "react";

export default function MapSection() {
  return (
    <section className="pt-8 pb-0 md:pt-12 px-0 w-full">
      <div className="w-full h-[450px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.0293259371238!2d88.36805187526595!3d22.540574179514554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770064b1c703%3A0x16dd132246644256!2s287%2C%20Darga%20Rd%2C%20Park%20Circus%2C%20Beniapukur%2C%20Kolkata%2C%20West%20Bengal%20700017!5e0!3m2!1sen!2sin!4v1697202556317!5m2!1sen!2sin"
          className="w-full h-full border-0 absolute top-0 left-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Corporate Office Map"
        ></iframe>
      </div>
    </section>
  );
}
