"use client"

import { useRouter } from "next/navigation"
import { Bookmark, LinkIcon, Share2 } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"
import { useProductContext } from "@/context/ProductContext"
import Features from "./Features"

const productData = {
  uuid: "1",
  name: "EcoWidget",
  short_description: "Eco-friendly gadget for energy savings.",
  description: "An eco-friendly gadget designed to optimize energy usage in homes, helping to reduce costs and environmental impact.",
  revenue: "$1M",
  best_selling_rate: "+50%",
  price: "$100",
  avg_reviews_rating: "4.8 / 5",
  twitter_url: "https://twitter.com/ecowidget",
  amazon_url: "https://amazon.com/ecowidget",
  selling_data: [
    { year: "Jan", sales: 2000 },
    { year: "Feb", sales: 3500 },
    { year: "Mar", sales: 3000 },
    { year: "Apr", sales: 4500 },
    { year: "May", sales: 8000 },
    { year: "Jun", sales: 6000 },
  ],
  growth_rate: "+20%",
  search_volume: "15K",
  category: ["Home", "Technology", "Eco-friendly"],
  channels: [
    { platform: "Instagram", value: "20K followers" },
    { platform: "Facebook", value: "50K likes" },
  ],
  logo: "https://via.placeholder.com/150",
  quantity: 500,
  location: "USA",
}

export default function ProductList() {
  const router = useRouter()
  const { setProduct } = useProductContext()

  const handleProductClick = () => {
    setProduct(productData)
    router.push(`/dashboard/product-discovery/${productData.name}`)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Trending Products</h1>
        <Input
          type="search"
          placeholder="Search Products"
          className="max-w-[300px]"
        />
      </div>

      <Features />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        <Card
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          onClick={handleProductClick}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{productData.name}</h3>
              <span className="px-2 py-1 text-xs bg-black text-white rounded-full">
                Price: {productData.price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {productData.short_description}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <Bookmark className="w-4 h-4" />
              <LinkIcon className="w-4 h-4" />
              <Share2 className="w-4 h-4" />
              <span className="ml-auto text-sm text-muted-foreground">
                {productData.location}
              </span>
            </div>
            <div className="h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productData.selling_data}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

