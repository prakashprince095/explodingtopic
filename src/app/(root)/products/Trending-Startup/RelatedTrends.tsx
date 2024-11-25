import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const trends = [
  {
    name: "AI in Healthcare",
    description: "Artificial Intelligence is revolutionizing healthcare with improved diagnostics and personalized treatment plans.",
  },
  {
    name: "Sustainable Energy Solutions",
    description: "Innovations in renewable energy and storage are accelerating the transition to a sustainable future.",
  },
  {
    name: "Decentralized Finance (DeFi)",
    description: "Blockchain-based financial services are disrupting traditional banking and creating new economic opportunities.",
  },
]

export default function RelatedTrends() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Related Trends</h2>
        <p className="text-xl mb-8">
          Explore the cutting-edge trends that are shaping the future of technology and business. These emerging fields are creating new opportunities and transforming industries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trends.map((trend) => (
            <Card key={trend.name}>
              <CardHeader>
                <CardTitle>{trend.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{trend.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

