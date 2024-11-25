import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

const regions = [
  { 
    name: "North America", 
    topIndustries: ["AI & Machine Learning", "Biotech", "Fintech"],
    growthRate: "18%"
  },
  { 
    name: "Europe", 
    topIndustries: ["Clean Energy", "Healthtech", "Edtech"],
    growthRate: "15%"
  },
  { 
    name: "Asia-Pacific", 
    topIndustries: ["E-commerce", "Fintech", "Mobility"],
    growthRate: "22%"
  },
]

export default function RegionalTrends() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Global Startup Ecosystem</h2>
        <p className="text-xl mb-8">
          Explore how innovation thrives across different regions and the unique trends shaping each market.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region) => (
            <Card key={region.name}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" />
                  {region.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Top Industries:</p>
                <ul className="list-disc list-inside mb-4">
                  {region.topIndustries.map((industry) => (
                    <li key={industry}>{industry}</li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-primary">
                  {region.growthRate} Annual Growth
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

