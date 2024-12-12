'use client'

import HeroSection from '../Deep-Dive-Analysis/HeroSection'
import TrendingProducts from '../Deep-Dive-Analysis/TrendingProducts'
import ImageSection from '../Deep-Dive-Analysis/ImageSection'
import RelatedTrends from '../Deep-Dive-Analysis/RelatedTrends'
import SignupSection from '../Deep-Dive-Analysis/SignupSection'
import RelatedProducts from '../Deep-Dive-Analysis/RelatedProducts'
export default function DeepDiveAnalysis() {
  return (
    <main className=" flex flex-col items-center max-w-[1280px] justify-center mx-auto bg-background">
      <HeroSection />
      <TrendingProducts />
      <div className="bg-gray-200 w-full h-[1px] my-14"></div>
      <ImageSection />
      <div className="bg-gray-200 w-full h-[1px] my-14"></div>
      <RelatedProducts />
      <div className="bg-gray-200 w-full h-[1px] my-14"></div>
      <RelatedTrends />
      <div className="bg-gray-200 w-full h-[1px] my-14"></div>
      <SignupSection />
    </main>
  )
}

