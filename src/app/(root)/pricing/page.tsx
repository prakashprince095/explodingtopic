'use client'

import { useState } from "react"
import { Check, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface PricingPlan {
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  highlighted?: boolean
}

const plans: PricingPlan[] = [
  {
    name: "Hobbyist",
    description: "Perfect for getting started with basic research needs",
    price: {
      monthly: 0,
      yearly: 0
    },
    features: [
      "10 lookups/mo",
      "Basic search data",
      "CSV export",
      "Email support"
    ]
  },
  {
    name: "Pro",
    description: "Ideal for professionals and small teams",
    price: {
      monthly: 49,
      yearly: 470
    },
    features: [
      "250 lookups/mo",
      "Search volume data",
      "People-Also-Search data",
      "Track 25 keywords",
      "Export to CSV",
      "Google Sheets integration"
    ],
    highlighted: true
  },
  {
    name: "Expert",
    description: "Advanced features for power users",
    price: {
      monthly: 249,
      yearly: 2390
    },
    features: [
      "Unlimited lookups",
      "Advanced search data",
      "People-Also-Search data",
      "Track 250 keywords",
      "Export to CSV",
      "Priority support",
      "CSV import & bulk tracking"
    ]
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: {
      monthly: -1,
      yearly: -1
    },
    features: [
      "Unlimited lookups",
      "Full data access",
      "Custom dashboards",
      "API access",
      "Priority support",
      "Pay by invoice",
      "Custom integrations"
    ]
  }
]

const featureCategories = [
  {
    name: "Lookups",
    features: [
      "Monthly lookups",
      "Search volume data",
      "People-Also-Search data",
      "Keyword tracking",
      "CSV export",
      "Google Sheets integration"
    ]
  },
  {
    name: "Discover",
    features: [
      "Trend analysis",
      "Growth filters",
      "Volume tracking",
      "Brand monitoring",
      "Export capabilities"
    ]
  },
  {
    name: "Alerts",
    features: [
      "Monthly alerts",
      "Custom notifications",
      "Real-time updates"
    ]
  },
  {
    name: "Add-ons",
    features: [
      "API access",
      "Priority support",
      "Custom dashboards",
      "Invoice payments"
    ]
  }
]

export default function Page() {
  const [isYearly, setIsYearly] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Supercharge your research</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Choose the perfect plan for your needs
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={cn("text-sm", !isYearly && "font-bold")}>Monthly</span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={cn("text-sm", isYearly && "font-bold")}>
            Yearly <span className="text-green-600">(Save 20%)</span>
          </span>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowComparison(!showComparison)}
          className="mb-8"
        >
          {showComparison ? "Show Plans" : "Compare Features"}
        </Button>
      </div>

      {!showComparison ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative",
                plan.highlighted && "border-primary shadow-lg"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {plan.price.monthly === -1 ? (
                    <div className="text-4xl font-bold">Custom</div>
                  ) : (
                    <div className="text-4xl font-bold">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{isYearly ? "year" : "mo"}
                      </span>
                    </div>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Features</TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.name} className="text-center">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureCategories.map((category) => (
                <>
                  <TableRow key={category.name}>
                    <TableCell className="font-bold bg-muted" colSpan={5}>
                      {category.name}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature) => (
                    <TableRow key={feature}>
                      <TableCell className="flex items-center gap-2">
                        {feature}
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Learn more about {feature}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      {plans.map((plan) => (
                        <TableCell key={plan.name} className="text-center">
                          {plan.features.some(f => 
                            f.toLowerCase().includes(feature.toLowerCase())
                          ) ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      )}

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-8">
          Trusted by thousands of companies in 132+ countries
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
          {/* Replace with actual company logos */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-32 h-12 bg-muted rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

