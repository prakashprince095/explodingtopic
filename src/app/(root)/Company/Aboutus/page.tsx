'use client'

import HeroSection from './HeroSection'
import { AboutSection } from './AboutSection'
import { TeamSection } from './TeamSection'
import { TestimonialsSection } from './TestimonialsSection'
import { DataVisualizationSection } from './DataVisualizationSection'
import SignupSection from '@/components/SignupSection'
export default function AboutPage() {
  return (
    <div className=" bg-background">
      <main className="">
        <HeroSection />
        <div className="bg-gray-200 w-full h-[1px]"></div>
        <AboutSection />
        <div className="bg-gray-200 w-full h-[1px] my-14"></div>
        <TeamSection />
        <div className="bg-gray-200 w-full h-[1px] my-14"></div>
        <TestimonialsSection />
        <div className="bg-gray-200 w-full h-[1px] my-14"></div>
        <DataVisualizationSection />
        <div className="bg-gray-200 w-full h-[1px] my-14"></div>
        <SignupSection />
        <div className="bg-gray-200 w-full h-[1px] my-14"></div>
      </main>
    </div>
  )
}

