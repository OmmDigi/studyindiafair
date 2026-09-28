import React from "react";
import { MessageCircle, Moon, Users, Clock, Power, BellOff, Ban, Palette } from "lucide-react";

export default function DigitalAddictionSolutions() {
  const solutions = [
    {
      title:
        "Understand the difference between interacting in-person and online",
      desc: "Human beings are social creatures. We’re not meant to be isolated or to rely on technology for human interaction. Socially interacting with another person face-to-face—making eye contact, responding to body language—can make you feel calm, safe, and understood, and quickly put the brakes on stress. Interacting through text, email or messaging bypasses these nonverbal cues so won’t have the same effect on your emotional well-being. Besides, online friends can’t hug you when a crisis hits, visit you when you’re sick, or celebrate a happy occasion with you.",
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Don’t bring your phone Not Right Before Bed",
      desc: "Kids need sleep and screens can keep you awake. The blue light emitted by the screens can disrupt your sleep if used within two hours of bed time. Not only do you get addicted to whatever you’re doing, the artificial light can interfere with your sleep patterns. Turn devices off and leave them in another room. Instead of reading eBooks on your phone at night, pick up a book. You’ll not only sleep better but research shows you’ll also remember more of what you’ve read.",
      icon: <Moon className="w-8 h-8 text-white" />,
      color: "bg-indigo-500",
    },
    {
      title: "Remove social media apps from your phone",
      desc: "So you can only check Facebook, Tik Tok, Snapchat, Instagram, Twitter and the like from your computer. Remember: what you see of others on social media is rarely an accurate reflection of their lives—people always try show the positive aspects of their lives, brushing over the doubts and disappointments that we all experience. Spending less time comparing yourself unfavourably to these stylized representations can help to boost your mood and sense of self-worth.",
      icon: <Moon className="w-8 h-8 text-white" />,
      color: "bg-red-500",
    },
    {
      title: "Strengthen your support network",
      desc: "Set aside dedicated time each week for friends and family. To find people with similar interests, try reaching out to FRIENDS, may be joining a sports team or book club, enrolling in an education class, or volunteering for a good cause. You’ll be able to interact with others like you, let relationships develop naturally, and form friendships that will enhance your life and strengthen your health.",
      icon: <Users className="w-8 h-8 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Limit checks",
      desc: "If you continue check your phone every few minutes, manage yourself off by limiting your checks to once every 15 minutes. Then once every 30 minutes, then once an hour. If you need help, there are apps that can automatically limit when you’re able to access your phone.",
      icon: <Clock className="w-8 h-8 text-white" />,
      color: "bg-orange-500",
    },
    {
      title: "Turn off your phone at certain times of the day",
      desc: "Turn off your phone at certain times of the day, such as when your in a meeting, having dinner, or playing. Don’t take your phone with you.",
      icon: <Power className="w-8 h-8 text-white" />,
      color: "bg-teal-500",
    },
    {
      title: "Turn off non-essential notifications",
      desc: "The constant buzzing and pinging is designed to draw you back into your device. By turning off push notifications for social media and games, you regain control over when you choose to look at your phone, rather than letting your phone dictate your attention.",
      icon: <BellOff className="w-8 h-8 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "Set phone-free zones",
      desc: "Establish specific areas or times in your daily routine where phones are strictly prohibited, such as the dining table, bathroom, or during family time. Creating physical boundaries helps train your brain to disconnect and focus on the present moment.",
      icon: <Ban className="w-8 h-8 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "Pick up a new offline hobby",
      desc: "Whenever you feel the urge to mindlessly scroll, redirect that energy toward a healthier habit. Pick up a new offline hobby like reading, painting, exercising, or simply taking a walk. Finding fulfillment outside of a screen is key to breaking the cycle of addiction.",
      icon: <Palette className="w-8 h-8 text-white" />,
      color: "bg-cyan-500",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 uppercase">
            SOLUTION
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto uppercase">
            <strong>
              IF YOU FOLLOW EVEN FEW POINT I WILL DISCUSS I CAN ASSURE YOU BE
              ABLE TO CONTROL YOUR
            </strong>{" "}
            digital device overuse <strong>REEL LIFE REAL LIFE</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md ${solution.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {solution.icon}
              </div>
              <h5 className="text-xl font-bold text-slate-800 mb-4 h-auto md:h-14 flex items-center justify-center">
                {solution.title}
              </h5>
              <p className="text-gray-600 leading-relaxed text-sm">
                {solution.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
