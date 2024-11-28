'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useStartup } from '@/context/StartupContext'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts'
import Link from 'next/link'
const chartData = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 4000 },
  { name: 'Apr', value: 2800 },
  { name: 'May', value: 3800 },
  { name: 'Jun', value: 3500 }
]

const KeyIndicator = ({ label, value }: { label: string; value: 'Low' | 'Medium' | 'High' }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-sm text-gray-600">{label}:</span>
    <div className="flex gap-2">
      <span className={`px-2 py-0.5 text-xs rounded ${value === 'Low' ? 'bg-blue-100' : 'bg-gray-100'}`}>Low</span>
      <span className={`px-2 py-0.5 text-xs rounded ${value === 'Medium' ? 'bg-blue-100' : 'bg-gray-100'}`}>Medium</span>
      <span className={`px-2 py-0.5 text-xs rounded ${value === 'High' ? 'bg-blue-100' : 'bg-gray-100'}`}>High</span>
    </div>
  </div>
)

const Channel = ({ name, value }: { name: string; value: number }) => (
  <div className="flex items-center gap-3 py-2">
    <img src={`/${name.toLowerCase()}.svg`} alt={name} className="w-5 h-5" />
    <span className="text-sm text-gray-600 min-w-[80px]">{name}</span>
    <Progress value={value} className="flex-1" />
  </div>
)

export default function StartupDetailsPage() {
  const { selectedStartup } = useStartup()
  const router = useRouter()
  const params = useParams()
  const [startup, setStartup] = useState(selectedStartup)

  useEffect(() => {
    if (!startup || startup.uuid !== params.slug) {
      router.push('/dashboard/trending-startups')
    }
  }, [params.slug, startup, router])

  if (!startup) {
    return (
      <div className="p-6">
        <p className="text-gray-600">No startup selected. Redirecting to the list...</p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <Link href='/dashboard/trending-startups'>back</Link>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-lg" />
        <div>
          <h1 className="text-xl font-semibold">{startup.name}</h1>
          <p className="text-sm text-gray-500">4 years in market</p> 
        </div>
      </div>
      {/* {startup.years_in_market} */}
      {/* Chart Section */}
      <Card className="p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Timeframe:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>1 year</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Forecast:</span>
            <span className="text-sm text-green-500">Volume: 5.5K</span>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="value" stroke="#2563eb" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Details Section */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold mb-4">Details:</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Founded:</span>
              <span className="text-sm">{startup.founded_on || '2015'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Employees:</span>
              <span className="text-sm">{startup.number_of_employees_min} - {startup.number_of_employees_max}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Funding:</span>
              <span className="text-sm">$ 157B</span>
            </div>
            {/* {startup.total_funding || '157B'} */}
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Latest Round:</span>
              <span className="text-sm">Series A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm">{startup.city}, {startup.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Product:</span>
              <a href={startup.web} className="text-sm text-blue-500 hover:underline">{startup.web}</a>
            </div>
            <div>
              <span className="text-sm text-gray-600">Social Platforms:</span>
              <div className="flex gap-2 mt-2">
                {startup.linkedin_url && (
                  <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                )}
                {startup.twitter_url && (
                  <img src="/twitter.svg" alt="Twitter" className="w-5 h-5" />
                )}
                {/* Add other social icons */}
              </div>
            </div>
          </div>
        </Card>

        {/* Key Indicators */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold mb-4">Key Indicators:</h2>
          <KeyIndicator label="Growth" value="Medium" />
          <KeyIndicator label="Seasonality" value="Low" />
          <KeyIndicator label="Speed" value="High" />
          <KeyIndicator label="Volatility" value="Medium" />
          <KeyIndicator label="Sentiment" value="High" />
          <KeyIndicator label="Forecast" value="Medium" />
        </Card>

        {/* Channels */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold mb-4">Channels:</h2>
          <Channel name="LinkedIn" value={75} />
          <Channel name="Instagram" value={60} />
          <Channel name="Facebook" value={45} />
          <Channel name="Reddit" value={30} />
          <Channel name="Youtube" value={25} />
          <Channel name="Pinterest" value={20} />
          <Channel name="TikTok" value={15} />
        </Card>
      </div>

      {/* Categories */}
      <Card className="p-6 mt-6">
        <h2 className="text-sm font-semibold mb-4">Categories:</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">AI</Badge>
          <Badge variant="secondary">Technology</Badge>
          <Badge variant="secondary">Software</Badge>
        </div>
      </Card>

      {/* Related Startups */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold mb-4">Related Startups:</h2>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded" />
                <span className="font-medium">Similar Startup {i + 1}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Volume:</span>
                  <span>45K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Growth Rate:</span>
                  <span className="text-green-500">+15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue:</span>
                  <span>$20B</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Trends */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold mb-4">Related Trends:</h2>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded" />
                  <span className="text-sm font-medium">Trend {i + 1}</span>
                </div>
                <span className="text-sm text-green-500">+10%</span>
              </div>
              <div className="h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

