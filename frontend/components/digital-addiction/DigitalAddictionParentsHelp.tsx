import React from "react";
import { 
  Smartphone, 
  ShieldCheck, 
  Ban, 
  Activity, 
  MessageCircle, 
  Users, 
  ChevronsRight 
} from "lucide-react";

export default function DigitalAddictionParentsHelp() {
  const tips = [
    "Be interactive with your child. Try a game or app first and then play it with the child. Ask the child about it afterward to see what he or she is learning.",
    <><strong>Use parental controls to limit exposure to violence and pornography.</strong></>,
    <><strong>Use parental controls to monitor and limit the amount of time kids spend on tech devices.</strong></>,
    <><strong>Have plenty of non-tech interactive play experiences with your child like reading books to or with them, playing board games, or doing puzzles.</strong></>,
    <><strong>Get them into a sport or hobby, such as martial arts that encourages structured high energy exercise combined with key life skills such as Respect, Discipline, FOCUS, Self-Control and Communication Skills.</strong></>
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            How Parents Can Help?
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            While taking devices away completely may be tempting, monitoring and adapting usage might be a better option. Both Google/Android and iPhone platforms provide options to help families balance phone usage. <strong>Google Digital Wellness</strong> and <strong>Screen Time for iPhone</strong> show realtime data for device usage and provide tools for limiting phone use. Similarly, <strong>Android Family Link</strong> allows parents to remotely monitor phone and app usage, set screen-time limits, and even lock devices for set amounts of time.
          </p>
        </div>

        {/* Info Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Box 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-[#f68b54] mb-4">
              <Smartphone className="w-10 h-10" />
            </div>
            <h5 className="text-lg font-bold text-slate-800 mb-3">Be a Role Model in Screen Habits</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Be a good role model.</strong> Children have a strong impulse to imitate, so it’s important you manage your own smartphone and Internet use. It’s no good asking your child to unplug at the dinner table while you’re staring at your own phone or tablet. Don’t let your own smartphone use distract from parent-child interactions.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-[#f68b54] mb-4">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h5 className="text-lg font-bold text-slate-800 mb-3">Use Parental Control Apps</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Use apps to monitor and limit your child’s smartphone use.</strong> There are a number of apps available that can limit your child’s data usage or restrict texting and web browsing to certain times of the day. Other apps can eliminate messaging capabilities while in motion, so you can prevent your teen using a smartphone while driving.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-[#f68b54] mb-4">
              <Ban className="w-10 h-10" />
            </div>
            <h5 className="text-lg font-bold text-slate-800 mb-3">Set Up Phone-Free Zones</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Create “phone-free” zones.</strong> Restrict the use of smartphones or tablets to a common area of the house where you can keep an eye on your child’s activity and limit time online. Ban phones from the dinner table and bedrooms and insist they’re turned off after a certain time at night.
            </p>
          </div>

          {/* Box 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-[#f68b54] mb-4">
              <Activity className="w-10 h-10" />
            </div>
            <h5 className="text-lg font-bold text-slate-800 mb-3">Promote Offline Activities</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Encourage other interests and social activities.</strong> Get your child away from screens by exposing them to other hobbies and activities, such as team sports, Scouts, and after-school clubs. Spend time as a family unplugged.
            </p>
          </div>

          {/* Box 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-[#f68b54] mb-4">
              <MessageCircle className="w-10 h-10" />
            </div>
            <h5 className="text-lg font-bold text-slate-800 mb-3">Address Underlying Issues</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Talk to your child about underlying issues.</strong> Compulsive smartphone use can be the sign of deeper problems. Is your child having problems fitting in? Has there been a recent major change, like a move or divorce, which is causing stress? Is your child suffering with other issues at school or home?
            </p>
          </div>

          {/* Box 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-[#f68b54] mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h5 className="text-lg font-bold text-slate-800 mb-3">Seek Outside Support</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Get help.</strong> Teenagers often rebel against their parents, but if they hear the same information from a different authority figure, they may be more inclined to listen. Try a sports coach, doctor, or respected family friend. Don’t be afraid to seek professional counseling if you are concerned about your child’s smartphone use.
            </p>
          </div>
        </div>

        {/* Top 5 Tips Section */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
          <p className="text-lg text-slate-800 mb-6 font-medium">
            If you are concerned about device addiction in your children, here are our top 5 tips for minimising the effects their devices could be having:
          </p>
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <ChevronsRight className="w-5 h-5 text-[#2da970] shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
