import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const startups = [
  {
    name: "GreenTech Solutions",
    industry: "Clean Energy",
    description: "Revolutionizing renewable energy storage with advanced battery technology.",
  },
  {
    name: "HealthAI",
    industry: "Healthcare",
    description: "Using artificial intelligence to improve early disease detection and treatment planning.",
  },
  {
    name: "FinRevolution",
    industry: "Fintech",
    description: "Democratizing access to financial services through blockchain and smart contracts.",
  },
]

export default function TrendingStartups() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center mb-4">Trending Startups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {startups.map((startup) => (
            <Card key={startup.name}>
              <CardHeader>
                <CardTitle>{startup.name}</CardTitle>
                <CardDescription>{startup.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{startup.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xl mb-8">
          Discover the most innovative startups that are shaping the future of technology and business. These companies are at the forefront of their industries, developing groundbreaking solutions to some of the world's most pressing challenges.
        </p>
        
        <div className="prose max-w-none">
          <p>
            The startup ecosystem is constantly evolving, with new players emerging and established ones pivoting to meet changing market demands. In today's fast-paced business environment, staying informed about the latest trends and innovations is crucial for entrepreneurs, investors, and industry professionals alike.
          </p>
          <p>
            In the healthcare industry, HealthAI is leveraging the power of artificial intelligence to revolutionize patient care. Their advanced algorithms are capable of analyzing vast amounts of medical data to detect patterns and anomalies that might be missed by human practitioners. This technology has the potential to significantly improve early diagnosis rates and treatment outcomes, ultimately saving lives and reducing healthcare costs.
          </p>
          <p>
            FinRevolution is disrupting the financial services industry by harnessing the power of blockchain technology. Their platform is making complex financial instruments and services accessible to a broader audience, potentially democratizing access to wealth-building opportunities. By using smart contracts, FinRevolution is also increasing transparency and reducing the costs associated with traditional financial transactions.
          </p>
          <p>
            These startups represent just a fraction of the innovation happening across various industries. From artificial intelligence and machine learning to biotechnology and space exploration, entrepreneurs are pushing the boundaries of what's possible. They're not just creating new products and services; they're reshaping entire industries and challenging established norms.
          </p>
        </div>
      </div>
    </section>
  )
}

