"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
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
  const { isAuthenticated, verfiySession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    verfiySession();
    if (isAuthenticated) {
      router.push("/dashboard/insights-hub");
    }
  }, [isAuthenticated, router, verfiySession]);



  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <div className="relative flex flex-col gap-4 h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20 ">
          <h1 className="z-10 whitespace-pre-wrap text-center text-[70px] max-w-[700px] font-medium tracking-tighter text-black dark:text-white">
            Stay ahead by spotting trends before they ignite
          </h1>
          <Button>Get Started</Button>
          <AnimatedGridPattern
            numSquares={60}
            maxOpacity={0.3}
            duration={1}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-10%] h-[200%] ",
            )}
          />
        </div>
        <ReviewsSection />
        <FeaturesSection />
        <AnalyticsSection />
        <FeaturesSectionDemo />
        <SignupSection />
      </main>
      <Footer />
    </>
  );
}
