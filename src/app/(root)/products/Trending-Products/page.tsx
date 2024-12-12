'use client'

import HeroSection from './HeroSection'
import TrendingProducts from './TrendingProducts'
import ImageSection from './ImageSection'
import RelatedTrends from './RelatedTrends'
import SignupSection from './SignupSection'
import RelatedProducts from './RelatedProducts'
import { TestimonialsSection } from '../../Company/Aboutus/TestimonialsSection'
export default function Home() {
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
      <div className="bg-gray-200 w-full h-[1px] my-14"></div><RelatedTrends />
      <TestimonialsSection />
      <div className="bg-gray-200 w-full h-[1px] my-14"></div>
      <SignupSection />
    </main>
  )
}

