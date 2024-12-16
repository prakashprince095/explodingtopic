"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useProductContext } from "@/context/ProductContext"
import Features from "./Features"
import Image from "next/image"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// const productData = {
//   id: 1,
//   name: "EcoWidget",
//   Volume: "300K",
//   short_description: "Eco-friendly gadget for energy savings.",
//   description: "An eco-friendly gadget designed to optimize energy usage in homes, helping to reduce costs and environmental impact.",
//   revenue: "$1M",
//   best_selling_rate: "+50%",
//   price: "$100",
//   avg_reviews_rating: "4.8 / 5",
//   twitter_url: "https://twitter.com/ecowidget",
//   amazon_url: "https://amazon.com/ecowidget",
//   selling_data: [
//     { year: "Jan", sales: 2000 },
//     { year: "Feb", sales: 3500 },
//     { year: "Mar", sales: 3000 },
//     { year: "Apr", sales: 4500 },
//     { year: "May", sales: 8000 },
//     { year: "Jun", sales: 6000 },
//   ],
//   growth_rate: "+20%",
//   search_volume: "15K",
//   category: ["Home", "Technology", "Eco-friendly"],
//   channels: [
//     { platform: "Instagram", value: "20K followers" },
//     { platform: "Facebook", value: "50K likes" },
//   ],
//   logo: "https://via.placeholder.com/150",
//   quantity: 500,
//   location: "USA",
// }
const productData = {
  id: 1,
  name: "EcoWidget",
  volume: "300K", // Corrected from 'Volume' to 'volume'
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
  growth: "+20%",  // Added missing field
  salesVolume: "20,000",  // Added missing field
  totalRevenue: "$2M",  // Added missing field
  latestVersion: "v1.2",  // Added missing field
  stock: "500",  // Added missing field
  categories: ["Eco-friendly", "Gadget"],  // Added missing field
};


export default function ProductList() {
  const router = useRouter()
  const { setProductItems } = useProductContext()

  const handleProductClick = () => {
    setProductItems([productData])
    router.push(`/dashboard/product-discovery/${productData.name}`)
  }

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(217, 91%, 60%)",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(217, 91%, 75%)",
    },
  }

  function generateChartData() {
    return productData.selling_data.map((data) => ({
      month: data.year,
      desktop: data.sales, // Replace with actual desktop data if available
      mobile: Math.floor(data.sales * 0.8), // Mock mobile data
    }));
  }


  return (
    <div className="p-3 min-h-scree border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl ">Trending Products</h1>
        <Input
          type="search"
          placeholder="Search Products"
          className="max-w-[300px]"
        />
      </div>

      <Features />
      <div className="bg-card rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center justify-start gap-4 p-2">
          <Card
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleProductClick}
          >
            <CardHeader>
              <div className='flex items-start  gap-2'>
                <div className='bg-white rounded-md shadow-md h-[50px] w-[60px]'>

                </div>
                <div className='w-full'>
                  <CardTitle className='font-normal text-[18px]'>{productData.name}</CardTitle>
                  <div className='bg-black justify-self-end text-white p-1 text-[12px] rounded-full w-fit'>
                    Revenue: $129B
                  </div>
                </div>
              </div>
              <CardDescription className='text-[14px]'>{productData.short_description}</CardDescription>
              <CardFooter className="flex justify-between items-center">
                <div className='flex gap-3'>
                  <Image src='/startups/saved.svg' alt='' height={20} width={20} />
                  <Image src='/startups/link.svg' alt='' height={20} width={20} />
                  <Image src='/startups/share.svg' alt='' height={20} width={20} />
                </div>
                <div className="mt-1 text-md border border-emerald-600 px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 w-fit">
                  + {productData.volume}
                </div>
              </CardFooter>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  data={generateChartData()}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

