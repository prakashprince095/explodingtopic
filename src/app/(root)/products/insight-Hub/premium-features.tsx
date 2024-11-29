import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

const premiumFeatures = [
  'Unlimited Saves',
  'Advanced Analytics',
  'Priority Notifications',
  'Team Collaboration'
]

export function PremiumFeatures() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Maximize Your Insights with Premium Features</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Premium Plan</h3>
          <ul className="mb-8">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full" size="lg">Upgrade to Premium</Button>
        </div>
      </div>
    </section>
  )
}

