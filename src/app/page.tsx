"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/Auth";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturesSection from "@/components/FeaturesSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import { FeaturesSectionDemo } from "@/components/ui/FeaturesSectionDemo";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import SignupSection from "@/components/SignupSection";

export default function HomePage() {
  // const { isAuthenticated, verfiySession } = useAuthStore();
  const router = useRouter();

  // useEffect(() => {
  //   verfiySession();
  //   if (isAuthenticated) {
  //     router.push("/dashboard/insights-hub");
  //   }
  // }, [isAuthenticated, router, verfiySession]);

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <div className="relative flex flex-col gap-4 h-[400px]  w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20 ">
          <h1 className="z-10 whitespace-pre-wrap text-center text-[70px] max-w-[800px]  font-semibold tracking-tighter text-black dark:text-white">
            Stay ahead by spotting trends <span className="text-gradient">before they ignite</span>
          </h1>
          <div className="flex gap-4">
            <Button>Get Started →</Button>
            <button className="bg-white z-50 border px-4 py-2 rounded-md text-[12px] shadow-sm hover:bg-gray-200">Try Free ↗</button>
          </div>
          <AnimatedGridPattern
            numSquares={60}
            maxOpacity={0.3}
            duration={1}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-[20%] inset-y-[-10%] h-[100%] ",
            )}
          />
        </div>
        <ReviewsSection />
        <div className="bg-gray-200 w-screen h-[1px] my-14"></div>
        <FeaturesSection />
        <div className="bg-gray-200 w-screen h-[1px] my-14"></div>
        <AnalyticsSection />
        <div className="bg-gray-200 w-screen h-[1px] my-14"></div>
        <div className="flex flex-col items-center">
          <h1 className="text-[40px] text-center">Features Designed for <span className="text-gradient font-medium">Your Success</span></h1>
          <p className=" text-center w-[800px] text-[#686868] text-[16px] font-normal mb-5">Highlighting the platform’s standout features ensures users recognize its unique value proposition. Each feature card explains how it solves user pain points or creates opportunities.</p>
          <FeaturesSectionDemo />
        </div>
        <div className="bg-gray-200 w-screen h-[1px] my-14"></div>
        <SignupSection />
        <div className="bg-gray-200 w-screen h-[1px] my-14"></div>
      </main>
      <Footer />
    </>
  );
}
