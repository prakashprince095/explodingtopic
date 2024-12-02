"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"

const socialPlatforms = [
  { name: "LinkedIn", icon: "/startups/in.svg", progress: 75 },
  { name: "Instagram", icon: "/startups/insta.svg", progress: 60 },
  { name: "Facebook", icon: "/startups/fb.svg", progress: 85 },
  { name: "Reddit", icon: "/startups/rd.svg", progress: 45 },
  { name: "Youtube", icon: "/startups/yt.svg", progress: 70 },
  { name: "Pinterest", icon: "/startups/pin.svg", progress: 55 },
  { name: "TikTok", icon: "/startups/tiktok.svg", progress: 80 },
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
    <main className="p-3 min-h-scree border border-gray-300 rounded-lg">
      <Link
        href="/dashboard/product-discovery"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 h-fit">
          <div className="flex items-start 0 gap-4 mb-6">
            <Image
              src={mockData.logo}
              alt={mockData.name}
              width={64}
              height={64}
              className="rounded-lg bg-gray-10"
            />
            <div>
              <h1 className="text-xl ">{mockData.name}</h1>
              <p className="text-sm text-muted-foreground">{mockData.short_description}</p>
            </div>
          </div>
          <div className='border-b-2 my-4 border-dashed '></div>
          <div className="space-y-4 ">
            <div className="flex justify-between items-center">
              <p className="text-md text-muted-foreground">Avg Revenue</p>
              <p className="text-lg ">{mockData.revenue}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Avg BSR</p>
              <p className="text-lg ">{mockData.bsr}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Avg Price</p>
              <p className="text-lg ">{mockData.price}</p>
            </div>
            <div>
              <div className='border-b-2 my-4 border-dashed '></div>
              <p className="text-sm text-muted-foreground">Avg Reviews</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(parseFloat(mockData.avg_reviews_rating))
                        ? "fill-primary stroke-primary"
                        : "fill-muted stroke-muted-foreground"
                      }`}
                  />
                ))}
                <span className="text-sm ml-2">{mockData.avg_reviews_rating}/5</span>
              </div>
            </div>
          </div>
          <div className='border-b-2 my-4 border-dashed '></div>
          <p className="text-sm text-muted-foreground mb-2">See product on:</p>
          <div className="flex gap-2">
            <Image src="/amazon-icon.png" alt="Amazon" width={24} height={24} className="rounded" />
            <Image src="/startups/tiktok.svg" alt="TikTok" width={24} height={24} className="rounded" />
            <Image src="/startups/insta.svg" alt="Instagram" width={24} height={24} className="rounded" />
          </div>
        </Card>

        {/* Center Column - Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm ">Timeframe:</p>
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
              <span className="text-sm ">Volume:</span>
              <span className="text-sm text-green-500 ">{mockData.search_volume}</span>
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
        <Card className="p-3">
          <div className="flex items-center gap-2 ">
            <Image src="/startups/indicator.svg" alt="" width={20} height={20} />
            <h2 className="text-lg ">Key Indicators:</h2>
          </div>
          <div className='border-b-2 my-4 border-dashed '></div>
          <div className="space-y-4">
            {keyIndicators.map((indicator) => (
              <div key={indicator.name} className="flex items-center justify-between py-1.5">
                <span className="text-md text-gray-600">{indicator.name}:</span>
                <div className="flex gap-3 bg-gray-100 p-1 rounded-md">
                  {indicator.options.map((option) => (
                    <span
                      key={option}
                      className={`p-2 text-sm rounded-sm  ${option === indicator.selected
                          ? "bg-white text-blue-800"
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
        <Card className="p-4 w-full min-w-[350px] h-full border border-gray-200 shadow-sm rounded-lg">
          <div className="flex items-center gap-2 ">
            <Image src="/startups/channel.svg" alt="" width={20} height={20} />
            <h2 className="text-lg ">Channels:</h2>
          </div>
          <div className='border-b-2 my-4 border-dashed '></div>

          <div className="space-y-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="flex gap-10 items-center">
                <div className="flex items-center gap-2">
                  <Image src={platform.icon} alt={platform.name} width={34} height={34} />
                  <span className="text-sm text-gray-600 min-w-[80px]">{platform.name}</span>
                </div>
                <Progress value={platform.progress} className="h-[5px]  rounded-full" />
              </div>
            ))}
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Image src="/categories-icon.png" alt="" width={20} height={20} />
            <h2 className="text-lg ">Categories:</h2>
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
          <Image src="/product/TS.svg" alt="" width={20} height={20} />
          <h2 className="text-lg ">Top Sellers:</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSellers.map((seller, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <Image src="/shopping-bag-icon.png" alt="" width={40} height={40} className="rounded" />
                <h3 className="text-sm ">{seller.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="border p-1 rounded-md border-[D9D9D9]">
                  <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                  <p className="text-sm ">{seller.quantity}</p>
                </div>
                <div className="border p-1 rounded-md border-[D9D9D9]">
                  <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
                  <p className="text-sm  text-green-500">{seller.growth_rate}</p>
                </div>
                <div className="border p-1 rounded-md border-[D9D9D9]">
                  <p className="text-xs text-muted-foreground mb-1">Price</p>
                  <p className="text-sm ">{seller.price}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border p-1 rounded-md border-[D9D9D9]">
                  <p className="text-xs text-muted-foreground mb-1">Rating</p>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-primary stroke-primary mr-1" />
                    <span className="text-sm ">{seller.rating}</span>
                  </div>
                </div>
                <div className="border p-1 rounded-md border-[D9D9D9]">
                  <p className="text-xs text-muted-foreground mb-1">BSR</p>
                  <p className="text-sm  text-green-500">{seller.bsr}</p>
                </div>
                <div className="border p-1 rounded-md border-[D9D9D9]">
                  <p className="text-xs text-muted-foreground mb-1">Listing</p>
                  <p className="text-sm ">{seller.listing}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

