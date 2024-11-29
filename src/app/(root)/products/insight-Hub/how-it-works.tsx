import { CheckCircle } from 'lucide-react'

const steps = [
  'Discover and save startups or products while exploring.',
  'Access your Insight Hub on any device, anytime.',
  'Stay updated with built-in tracking for your saved items.',
  'Share insights with your network for easy collaboration.'
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">How Insight Hub Works</h2>
        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

