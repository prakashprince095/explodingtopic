import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const industries = [
  {
    name: "Artificial Intelligence",
    growth: "35%",
    topRegions: ["North America", "Europe", "Asia"],
  },
  {
    name: "Sustainable Energy",
    growth: "28%",
    topRegions: ["Europe", "North America", "Australia"],
  },
  {
    name: "Biotechnology",
    growth: "22%",
    topRegions: ["North America", "Europe", "Asia"],
  },
]

export default function IndustryHighlights() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Global Industry Trends</h2>
        <p className="text-xl mb-8">
          Explore the fastest-growing industries and the regions leading innovation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Card key={industry.name}>
              <CardHeader>
                <CardTitle>{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">{industry.growth} YoY Growth</p>
                <p className="font-semibold mb-2">Top Regions:</p>
                <ul className="list-disc list-inside">
                  {industry.topRegions.map((region) => (
                    <li key={region}>{region}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/industries" className="text-primary hover:underline">
            View All Industry Trends
          </Link>
        </div>
      </div>
    </section>
  )
}

