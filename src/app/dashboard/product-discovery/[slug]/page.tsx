"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star } from 'lucide-react'
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"

const socialPlatforms = [
  { name: "LinkedIn", icon: "/linkedin-icon.png", progress: 75 },
  { name: "Instagram", icon: "/instagram-icon.png", progress: 60 },
  { name: "Facebook", icon: "/facebook-icon.png", progress: 85 },
  { name: "Reddit", icon: "/reddit-icon.png", progress: 45 },
  { name: "Youtube", icon: "/youtube-icon.png", progress: 70 },
  { name: "Pinterest", icon: "/pinterest-icon.png", progress: 55 },
  { name: "TikTok", icon: "/tiktok-icon.png", progress: 80 },
]

const keyIndicators = [
  { name: "Growth", options: ["Low", "Medium", "High"], selected: "Medium" },
  { name: "Seasonality", options: ["Low", "Medium", "High"], selected: "High" },
  { name: "Speed", options: ["Low", "Medium", "High"], selected: "Medium" },
  { name: "Volatility", options: ["Low", "Medium", "High"], selected: "Low" },
  { name: "Sentiment", options: ["Low", "Medium", "High"], selected: "High" },
  { name: "Forecast", options: ["Low", "Medium", "High"], selected: "Medium" },
]

const mockData = {
  name: "Shopping bags",
  logo: "/shopping-bag-icon.png",
  short_description: "OpenAI, founded in 2015, develops advanced AI technologies like ChatGPT and DALL·E to benefit humanity. It focuses on innovation, safety, and ethical AI use, shaping the future responsibly.",
  revenue: "$29,434.03",
  bsr: "12,000 piece",
  price: "$15.99",
  avg_reviews_rating: "4.1",
  search_volume: "5.5K",
  category: ["AI", "Technology", "Software"],
  selling_data: [
    { month: "Jan", sales: 220 },
    { month: "Feb", sales: 280 },
    { month: "Mar", sales: 350 },
    { month: "Apr", sales: 320 },
    { month: "May", sales: 280 },
    { month: "Jun", sales: 320 },
  ]
}

const topSellers = Array(6).fill({
  name: "Shopping bags for ladies and teenagers",
  quantity: "7,342",
  growth_rate: "+15%",
  price: "$20.99",
  rating: "4.5",
  bsr: "+24",
  listing: "Amazon"
})

export default function ProductDetails() {
  return (
    <main className="p-6 min-h-screen bg-background">
      <Link
        href="/dashboard/product-discovery"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Info */}
        <Card className="p-6 h-fit">
          <div className="flex items-start gap-4 mb-6">
            <Image
              src={mockData.logo}
              alt={mockData.name}
              width={64}
              height={64}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold">{mockData.name}</h1>
              <p className="text-sm text-muted-foreground">{mockData.short_description}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6 border-y py-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg Revenue</p>
              <p className="text-lg font-semibold">{mockData.revenue}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg BSR</p>
              <p className="text-lg font-semibold">{mockData.bsr}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Price</p>
              <p className="text-lg font-semibold">{mockData.price}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Reviews</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(parseFloat(mockData.avg_reviews_rating))
                        ? "fill-primary stroke-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-sm ml-2">{mockData.avg_reviews_rating}/5</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-2">See product on:</p>
          <div className="flex gap-2">
            <Image src="/amazon-icon.png" alt="Amazon" width={24} height={24} className="rounded" />
            <Image src="/tiktok-icon.png" alt="TikTok" width={24} height={24} className="rounded" />
            <Image src="/instagram-icon.png" alt="Instagram" width={24} height={24} className="rounded" />
          </div>
        </Card>

        {/* Center Column - Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium">Timeframe:</p>
              <Select defaultValue="1year">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="3months">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Volume:</span>
              <span className="text-sm text-green-500 font-medium">{mockData.search_volume}</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-8">January - June 2024</p>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.selling_data}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Key Indicators */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Image src="/indicator-icon.png" alt="" width={20} height={20} />
            <h2 className="text-lg font-semibold">Key Indicators:</h2>
          </div>
          <div className="space-y-4">
            {keyIndicators.map((indicator) => (
              <div key={indicator.name} className="flex justify-between items-center">
                <span className="text-sm">{indicator.name}:</span>
                <div className="flex gap-1">
                  {indicator.options.map((option) => (
                    <span
                      key={option}
                      className={`text-xs px-3 py-1 rounded-full ${
                        option === indicator.selected
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Channels */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Image src="/channels-icon.png" alt="" width={20} height={20} />
            <h2 className="text-lg font-semibold">Channels:</h2>
          </div>
          <div className="space-y-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Image src={platform.icon} alt={platform.name} width={20} height={20} />
                  <span className="text-sm">{platform.name}</span>
                </div>
                <Progress value={platform.progress} className="h-1.5" />
              </div>
            ))}
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Image src="/categories-icon.png" alt="" width={20} height={20} />
            <h2 className="text-lg font-semibold">Categories:</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockData.category.map((cat) => (
              <span
                key={cat}
                className="px-4 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Sellers */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Image src="/top-sellers-icon.png" alt="" width={20} height={20} />
          <h2 className="text-lg font-semibold">Top Sellers:</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSellers.map((seller, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <Image src="/shopping-bag-icon.png" alt="" width={40} height={40} className="rounded" />
                <h3 className="text-sm font-medium">{seller.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                  <p className="text-sm font-medium">{seller.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
                  <p className="text-sm font-medium text-green-500">{seller.growth_rate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Price</p>
                  <p className="text-sm font-medium">{seller.price}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rating</p>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-primary stroke-primary mr-1" />
                    <span className="text-sm font-medium">{seller.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">BSR</p>
                  <p className="text-sm font-medium text-green-500">{seller.bsr}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Listing</p>
                  <p className="text-sm font-medium">{seller.listing}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

