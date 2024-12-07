'use client'

import HeroSection from './HeroSection'
import TrendingStartups from './TrendingStartups'
import ImageSection from './ImageSection'
import RelatedTrends from './RelatedTrends'
import SignupSection from './SignupSection'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      <HeroSection />
      
      <div className="bg-gray-200 w-screen h-[1px] "></div>
      <TrendingStartups />
      <div className="bg-gray-200 w-screen h-[1px] my-14"></div>
      
      <ImageSection />
      <div className="bg-gray-200 w-screen h-[1px] my-14"></div>

      <RelatedTrends />
      <div className="bg-gray-200 w-screen h-[1px] my-14"></div>

      <SignupSection />
    </main>
  )
}

