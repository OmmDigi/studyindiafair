import React from "react";
import { Home, Phone, Mail } from "lucide-react";

export default function ContactFormSection() {
  return (
    <section className="py-3 md:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Side (Contact Info & Stats) */}
          <div
            className="w-full lg:w-1/2 p-3 md:p-6 relative text-white flex flex-col justify-between"
            style={{
              backgroundImage:
                "linear-gradient(rgba(83, 98, 129, 0.9), rgba(49, 51, 54, 0.85)), url(/images/contact-us/cheerful-students-celebrating.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row gap-8 mb-12 border-b border-white/20 pb-8">
              <div className="flex-1">
                <h4 className="text-4xl font-bold mb-2">
                  <span className="text-white">750,000</span>
                  <span className="text-tertiary ml-1">+</span>
                </h4>
                <h5 className="text-gray-300 font-medium tracking-wide">
                  Students
                </h5>
              </div>
              <div className="flex-1">
                <h4 className="text-4xl font-bold mb-2">
                  <span className="text-white">650</span>
                  <span className="text-tertiary ml-1">+</span>
                </h4>
                <h5 className="text-gray-300 font-medium tracking-wide">
                  Satisfied Institutions
                </h5>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Home className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Corporate Office</h4>
                  <p className="text-gray-300 leading-relaxed">
                    P287 Darga road, Ground floor, Park Circus, near 4 no.
                    bridge. Kolkata 700017
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Call us at</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>
                      <a
                        href="tel:+919830058408"
                        className="hover:text-tertiary transition-colors"
                      >
                        +91 9830058408
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+918017494833"
                        className="hover:text-tertiary transition-colors"
                      >
                        +91 8017494833
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+919830758408"
                        className="hover:text-tertiary transition-colors"
                      >
                        +91 9830758408
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Mail Us</h4>
                  <a
                    href="mailto:info@sapeevents.com"
                    className="text-gray-300 hover:text-tertiary transition-colors"
                  >
                    info@sapeevents.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 bg-zinc-50 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-8 leading-tight">
              Drop Us Your Contact To Start A Conversation To Share, Learn And
              Grow Together!
            </h3>

            <form className="space-y-2 text-black">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-5 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-5 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone No"
                  className="w-full px-5 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={2}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
