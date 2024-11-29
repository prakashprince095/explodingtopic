import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Organizing Your Favorites Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Insight Hub transforms the way you interact with startups and products, making it easier than ever to stay organized, informed, and ahead of the curve.
        </p>
        <Button size="lg" variant="secondary">
          Go to Insight Hub
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}

