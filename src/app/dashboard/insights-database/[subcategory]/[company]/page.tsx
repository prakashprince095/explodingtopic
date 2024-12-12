"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { BadgeCheck } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { channels } from "@/data/channels"
import { categories } from '@/data/categories'
import { relatedStartups } from '@/data/relatedStartups'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from "next/image"
const chartData = [
  { name: 'Jan', value: 2000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 3500 },
  { name: 'Apr', value: 2000 },
  { name: 'May', value: 3000 },
  { name: 'Jun', value: 3200 }
]

const KeyIndicator = ({ label, value }: { label: string; value: 'Low' | 'Medium' | 'High' }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-md text-gray-600">{label}:</span>
    <div className="flex gap-3 bg-gray-100 p-1 rounded-md">
      {['Low', 'Medium', 'High'].map((level) => (
        <span
          key={level}
          className={`p-2 text-sm rounded-sm ${value === level ? 'bg-white text-blue-800' : 'bg-gray-100 text-gray-400'
            }`}
        >
          {level}
        </span>
      ))}
    </div>
  </div>
)

const Channel = ({ name, icon, value }: { name: string; icon: string; value: number }) => (
  <div className="flex items-center gap-3 py-1.5">
    <Image src={icon} alt={name} width={34} height={34} />
    <span className="text-sm text-gray-600 min-w-[80px]">{name}</span>
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
)


export default function CompanyInsightsPage() {
  const params = useParams()
  const subcategory = params?.subcategory
  const company = params?.company

  if (!subcategory || !company) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen w-full bg-gray-50/50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl  text-gray-900">{company}</h1>
          <p className="text-sm text-gray-500">AI-driven insights and performance metrics</p>
        </div>
        <Card className="p-4 border w-full h-full border-gray-200 shadow-sm rounded-lg">
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Timeframe:</span>
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
            <div className="flex items-center justify-between  gap-20">
              <span className="text-xl  text-emerald-600">5.5K</span>
              <span className="text-lg font-medium text-emerald-600">+15% Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Forecast:</span>
              <span className="text-sm text-green-500 font-medium">Volume: 5.5K</span>
            </div>
          </div>
          <h2 className="text-lg  mb-4">January - June 2024</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* Key Indicators */}
          <Card className="p-4 w-full min-w-[350px] h-full border border-gray-200 shadow-sm rounded-lg">
            <div className='flex items-center gap-2'>
              <Image src='/startups/indicator.svg' alt='' width={30} height={30} />
              <h2 className="text-lg ">
                Key Indicators:
              </h2>
            </div>
            <div className='border-b-2 my-2 border-dashed '></div>

            <KeyIndicator label="Growth" value="Medium" />
            <KeyIndicator label="Seasonality" value="Low" />
            <KeyIndicator label="Speed" value="High" />
            <KeyIndicator label="Volatility" value="Medium" />
            <KeyIndicator label="Sentiment" value="High" />
            <KeyIndicator label="Forecast" value="Medium" />
          </Card>

          {/* Channels */}
          <Card className="p-4 w-full min-w-[350px] h-full border border-gray-200 shadow-sm rounded-lg">
            <div className='flex items-center gap-2'>
              <Image src='/startups/channel.svg' alt='' width={30} height={30} />
              <h2 className="text-lg ">
                Channels:
              </h2>
            </div>
            <div className='border-b-2 my-2 border-dashed '></div>
            <Channel name="LinkedIn" icon="/startups/in.svg" value={75} />
            <Channel name="Instagram" icon="/startups/insta.svg" value={60} />
            <Channel name="Facebook" icon="/startups/fb.svg" value={45} />
            <Channel name="Reddit" icon="/startups/rd.svg" value={30} />
            <Channel name="Youtube" icon="/startups/yt.svg" value={25} />
            <Channel name="Pinterest" icon="/startups/pin.svg" value={20} />
            <Channel name="TikTok" icon="/startups/tiktok.svg" value={15} />
          </Card>
          {/* Categories */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <h2 className="text-lg ">
                  About the Topic:
                </h2>
              </div>
              <div className='border-b-2 my-2 border-dashed '></div>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos delectus ad quibusdam id ipsum? Doloribus voluptate itaque, omnis rem aliquid adipisci deleniti eaque eius nisi, cum, atque quia mollitia a expedita cupiditate similique molestiae eveniet error? Libero, molestiae! Veritatis voluptatibus sint a quibusdam aperiam quis exercitationem assumenda.</p>
            </CardContent>
          </Card>
        </div>

        {/* Related Startups */}
        <div className='mt-6'>
          <div className='flex items-center gap-2 mb-3'>
            <Image src='/startups/rs.svg' alt='' width={30} height={30} />
            <h2 className="text-lg ">
              Related Industries:
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "OpenAI", volume: "45K", growth: "15%", revenue: "$20B" },
              { name: "Microsoft", volume: "45K", growth: "07%", revenue: "$400B" },
              { name: "Microsoft", volume: "45K", growth: "07%", revenue: "$400B" },
              { name: "OpenAI", volume: "45K", growth: "15%", revenue: "$20B" },
              { name: "Microsoft", volume: "45K", growth: "07%", revenue: "$400B" },
              { name: "Microsoft", volume: "45K", growth: "07%", revenue: "$400B" }
            ].map((startup, i) => (
              <Card key={i} className="p-3 hover:bg-gray-50 border border-gray-200 shadow-sm rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image src={`/${startup.name.toLowerCase()}.svg`} alt={startup.name} width={10} height={10} />
                  </div>
                  <span className="font-medium text-sm">{startup.name}</span>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex w-fit items-center gap-2 border rounded-md border-[#D9D9D9] p-2">
                    <Image src="/startups/vloumn.svg" alt="" height={25} width={25} />
                    <div className='flex flex-col'>
                      <span className="text-gray-600 text-sm">Volume:</span>
                      <span>{startup.volume}</span>
                    </div>
                  </div>
                  <div className="flex w- items-center gap-2 border rounded-md border-[#D9D9D9] p-2">
                    <Image src="/startups/growth.svg" alt="" height={25} width={25} />
                    <div className='flex flex-col'>
                      <span className="text-gray-600 text-sm">Growth Rate:</span>
                      <span className={startup.growth.includes('-') ? 'text-red-500' : 'text-green-500'}>
                        {startup.growth.includes('-') ? '' : '+'}
                        {startup.growth}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-fit items-center gap-2 border rounded-md border-[#D9D9D9] p-2">
                    <Image src="/startups/revenue.svg" alt="" height={25} width={25} />
                    <div className='flex flex-col'>
                      <span className="text-gray-600 text-sm">Revenue:</span>
                      <span>{startup.revenue}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  OpenAI, founded in 2015, develops advanced AI technologies like ChatGPT and DALL·E to benefit humanity. It focuses on innovation, safety, and ethical AI use, shaping the future responsibly.
                </p>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

