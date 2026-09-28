import React from "react";

export default function Scholarship() {
  return (
    <section className="py-12 md:py-20 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Image */}
          <div className="hidden lg:block w-full lg:w-1/3 text-center">
            <img 
              src="/images/why-india/scholarship-scaled.png" 
              alt="Scholarship" 
              className="w-full max-w-[280px] mx-auto h-auto animate-[bounce_3s_infinite]" 
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Scholarship
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
              <p>
                A scholarship is a form of financial aid awarded to students for further education. Generally, scholarships are awarded based on a set of criteria such as academic merit, diversity and inclusion, athletic skill, and financial need. Not all scholarships are created equal. Some scholarships are in the form of tuition fee waivers only, some only cover living expenses, while some offer a partial cash grant but there are those scholarship programs that cover both tuition fee and living expenses and sometimes include travel costs, book allowance, insurance, etc.
              </p>
              <p>
                Scholarship criteria usually reflect the values and goals of the donor of the award, and while scholarship recipients are not required to repay scholarships, the awards may require that the recipient continue to meet certain requirements during their period of support, such maintaining a minimum grade point average or engaging in a certain activity.
              </p>
              <p>
                Scholarships For Study All Over The World. Here Are Some Tips On How To Get Started - Search, Register or Sign In &amp; Apply for scholarships.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
