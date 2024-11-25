import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const founders = [
  {
    name: "Aisha Patel",
    role: "CEO & Co-Founder",
    startup: "EcoTech Solutions",
    country: "Germany",
    quote: "Sustainable energy is not just a goal, it's a necessity for our planet's future.",
  },
  {
    name: "Carlos Rodriguez",
    role: "CTO",
    startup: "HealthAI",
    country: "United States",
    quote: "AI has the potential to democratize healthcare and save millions of lives.",
  },
  {
    name: "Li Wei",
    role: "Founder",
    startup: "FinRevolution",
    country: "Singapore",
    quote: "We're building the future of borderless finance, one transaction at a time.",
  },
]

export default function FoundersInFocus() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Global Innovators Spotlight</h2>
        <p className="text-xl mb-8">
          Meet the visionary founders driving innovation across the globe. Learn about their journeys, challenges, and visions for the future.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder) => (
            <Card key={founder.name}>
              <CardHeader>
                <Image
                  src={`/placeholder.svg?height=100&width=100&text=${founder.name.charAt(0)}`}
                  alt={founder.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>{founder.name}</CardTitle>
                <CardDescription>{founder.role} at {founder.startup}, {founder.country}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">"{founder.quote}"</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Read Full Story</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

