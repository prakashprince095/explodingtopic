"use client";

import { AnimatedBeamMultipleInputDemo } from "@/app/pages/Data";
import { Button } from "./ui/button";
export default function AnalyticsSection() {
  return (
    <div className="">
      <h1 className="text-[40px] text-center">Our Data for <span className="text-gradient">Analytics</span></h1>
      <p className=" text-center text-[#686868] font-normal mb-5">
        Gain insights and make data-driven decisions with our advanced analytics tools.
      </p>
      <section className="flex flex-col lg:flex-row gap-5 mt-16">
        <div className="max-w-[600px]">
          <h1 className="text-[22px] font-medium">The Foundation of Reliable Insights</h1>
          <p className="text-[16px] text-[#686868] max-w-[500px] mt-4">Our data is sourced from trusted platforms like Crunchbase, Amazon, Twitter, Instagram and TikTok, enhanced with AI algorithms, and updated in real time to ensure accuracy and relevance.</p>
          <ul className="text-[16px] text-[#686868] list-disc px-6 mt-4">
            <li>Trusted sources and public databases</li>
            <li>AI-powered analysis for deeper insights</li>
            <li>Real-time updates for accuracy</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <Button>Get Started →</Button>
            <button className="bg-white z-50 border px-4 py-2 rounded-md shadow-sm hover:bg-gray-200">Try Free ↗</button>
          </div>
        </div>
        <div>
          <AnimatedBeamMultipleInputDemo />
        </div>
      </section>
    </div>
  );
}
