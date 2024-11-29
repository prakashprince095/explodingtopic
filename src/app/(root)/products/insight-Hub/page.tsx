'use client'

import HeroSection from './hero'
import Features from './features'
import { HowItWorks } from './how-it-works'
import { PremiumFeatures } from './premium-features'
import { CallToAction } from './call-to-action'

export default function Home() {
  return (
    <div className="min-h-screen ">
      <main>
        <HeroSection />
        <Features />
        <HowItWorks />
        <PremiumFeatures />
        <CallToAction />
      </main>
    </div>
  )
}

