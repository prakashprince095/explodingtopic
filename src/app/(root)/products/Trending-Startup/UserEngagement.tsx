import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function UserEngagement() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Stay Connected to Global Innovation</h2>
        <p className="text-xl mb-8">
          Get exclusive insights, trend reports, and investment opportunities from the world&apos;s most promising startups.
        </p>
        <form className="max-w-md mx-auto mb-8">
          <div className="flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit">Subscribe</Button>
          </div>
        </form>
        <div className="space-x-4">
          <Button variant="outline">Download Global Report</Button>
          <Button variant="secondary">Attend Virtual Demo Day</Button>
        </div>
      </div>
    </section>
  )
}

