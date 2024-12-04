import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Bookmark, Share2, Link } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Image from "next/image"
interface StartupCardProps {
  name: string
  description: string
  funding: string
  volume: string
  chartData: Array<{ name: string; value: number }>
  logo: string
}

export function StartupCard({
  name,
  description,
  funding,
  volume,
  chartData,
  logo
}: StartupCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={logo}
                alt={`${name} logo`}
                width={25}
                height={25}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">
            Funding: {funding}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link className="h-4 w-4" />
          </Button>
          <Badge variant="secondary" className="ml-auto bg-pink-100 text-pink-700 hover:bg-pink-100/90">
            Volume: {volume}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full px-6 pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563eb" }}
              />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}K`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

