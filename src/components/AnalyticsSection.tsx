"use client";

import { AnimatedBeamMultipleInputDemo } from "@/app/pages/Data";

export default function AnalyticsSection() {
  return (
    <div className="mt-7">
      <h1 className="text-[50px] text-center">Our Data for Analytics</h1>
      <p className="max-w-[800px] text-center text-[20px] font-normal mb-5">
        Gain insights and make data-driven decisions with our advanced analytics tools.
      </p>
      <AnimatedBeamMultipleInputDemo />
    </div>
  );
}
