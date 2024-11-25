'use client'

import HeroSection from './HeroSection'
import TrendingStartups from './TrendingStartups'
import ImageSection from './ImageSection'
import RelatedTrends from './RelatedTrends'
import SignupSection from './SignupSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TrendingStartups />
      <ImageSection />
      <RelatedTrends />
      <SignupSection />
    </main>
  )
}

