'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useStartup } from '@/context/StartupContext'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'

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
    <main className="p-6 min-h-screen  border border-gray-300 rounded-lg">
      <div className=''>
        <Link
          href="/dashboard/trending-startups"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
      </div>

      <section className='flex items-center h-[500px] my-5 gap-6 w-full'>
        <div>
          <div className="flex flex-col items-start gap-4 mb-4">
            <div className="flex  items-start gap-3">
              <div className="text-lg w-12 h-12 rounded-md bg-gray-200 font-medium flex items-center justify-center text-gray-400">
                {startup.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl  text-gray-900">{startup.name}</h1>
                <p className="text-sm text-gray-500">4 years in market</p>
              </div>
            </div>
            <div className='max-w-[700px]'>
              <p className="text-sm text-gray-500 mt-1">{startup.description}</p>
            </div>
            {/* Details Section */}
            <Card className="p-3 border border-gray-200 shadow-sm rounded-lg">
              <div className='flex items-center gap-2'>
                <Image src='/startups/detail.svg' alt='' width={30} height={30} />
                <h2 className="text-lg ">
                  Details:
                </h2>
              </div>
              <div className='border-b-2 my-2 border-dashed '></div>
              <div className="space-y-2 text-sm">
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
                <div className='border-b-2 my-2 border-dashed '></div>
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
                  <a href={startup.web} className="text-sx text-blue-500 hover:underline">{startup.web}</a>
                </div>
                <div className='border-b-2 my-2 border-dashed '></div>
                <div>
                  <span className="text-gray-600">Social Platforms:</span>
                  <div className="flex  mt-2">
                    <Image src="/startups/in.svg" alt="LinkedIn" height={30} width={30} />
                    <Image src="/startups/fb.svg" alt="Facebook" height={30} width={30} />
                    <Image src="/startups/x.svg" alt="Twitter" height={30} width={30} />
                    <Image src="/startups/tiktok.svg" alt="TikTok" height={30} width={30} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* Chart Section */}
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
      </section>
      {/* Main Content */}
      <section className="flex items-center gap-6 w-full h-[400px]">
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

        {/* Middle and Right Columns */}
        <div className="flex w-full min-w-[350px] h-full flex-col col-span-2 space-y-6">
          {/* Categories */}
          <Card className="p-4 border border-gray-200 shadow-sm rounded-lg">
            <h2 className="text-sm  mb-3">Categories:</h2>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">AI</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Technology</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Software</Badge>
            </div>
          </Card>
          {/* Reports */}
          <Card className="p-4 border border-gray-200 shadow-sm rounded-lg">
            <h2 className="text-sm  mb-3">Reports:</h2>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">AI</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Technology</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Software</Badge>
            </div>
          </Card>
        </div>
      </section>

      <div className='border-b-2 my-4 border-dashed '></div>

      {/* Related Startups */}
      <div className='mt-6'>
        <div className='flex items-center gap-2 mb-3'>
          <Image src='/startups/rs.svg' alt='' width={30} height={30} />
          <h2 className="text-lg ">
            Related Startups:
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
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

      <div className='border-b-[2px] my-4 border-dashed '></div>

      {/* Related Trends */}
      <div className='mt-6'>
        <div className='flex items-center gap-2 mb-3'>
          <Image src='/startups/rt.svg' alt='' width={30} height={30} />
          <h2 className="text-lg ">
            Related Trends:
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-3  flex justify-between border border-gray-200 shadow-sm rounded-lg">
              <div className="flex items-center  mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image src={`/${i % 2 === 0 ? 'openai' : 'microsoft'}.svg`} alt="" height={8} width={8} />
                  </div>
                  <span className="text-sm font-medium">
                    {i % 2 === 0 ? 'OpenAI' : 'Microsoft Cooperation'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col ">
                <ResponsiveContainer width="100%" height="100%" >
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-4 text-gray-400  mt-1">
                  <span className={`text-lg ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {i % 2 === 0 ? '+10%' : '-10%'}
                  </span>
                  <span className='text-lg'>
                    74K
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className='border-b-[2px] my-4 border-dashed '></div>
      {/* Footer */}
      <div className="mt-8 pt-6">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Terms & Conditions</Link>
            <Link href="#" className="hover:text-gray-900">Affiliates</Link>
          </div>
          <div>© 2024 Exploding GPT</div>
        </div>
      </div>
    </main>
  )
}

