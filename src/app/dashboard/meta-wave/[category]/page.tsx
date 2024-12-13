'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import Image from 'next/image';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, RadialBar, RadialBarChart, LabelList } from 'recharts';

type CategoryData = {
  title: string;
  volume: string;
  growth: string;
  description: string;
  relatedTrends: { name: string; volume: string; growth: string; revenue: string }[];
  background: string;
  volumeData: { month: string; volume: number }[];
};

const categoryData: Record<string, CategoryData> = {
  "ai-transcription": {
    title: "AI Transcription",
    volume: "12.1K",
    growth: "+7600%",
    description: "Service that provides free, accurate AI-based transcriptions for audio and video content.",
    relatedTrends: [
      { name: "AI Image", volume: "45K", growth: "15%", revenue: "$20B" },
      { name: "AI Video", volume: "45K", growth: "07%", revenue: "$400B" },
      { name: "AI Text Editor", volume: "45K", growth: "07%", revenue: "$400B" }
    ],
    background: "AI transcription has become a very useful tool in a variety of industries, transforming how we process and analyze audio content.",
    volumeData: [
      { month: "Jan", volume: 5000 },
      { month: "Feb", volume: 6200 },
      { month: "Mar", volume: 7800 },
      { month: "Apr", volume: 9100 },
      { month: "May", volume: 10500 },
      { month: "Jun", volume: 12100 },
    ],
  },
  // Add other categories here...
};

const browserData = [
  { browser: "chrome", visitors: 135, fill: "hsl(var(--chart-1))" },
  { browser: "safari", visitors: 220, fill: "hsl(var(--chart-2))" },
  { browser: "firefox", visitors: 187, fill: "hsl(var(--chart-3))" },
  { browser: "edge", visitors: 173, fill: "hsl(var(--chart-4))" },
  { browser: "other", visitors: 90, fill: "hsl(var(--chart-5))" },
];

const chartConfig: ChartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
  safari: { label: "Safari", color: "hsl(var(--chart-2))" },
  firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
  edge: { label: "Edge", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
};

const CategoryPage = () => {
  const params = useParams();
  const { category } = params as { category: string };

  const data = categoryData[category];

  if (!data) {
    return <div className="container p-8">Category not found</div>;
  }

  return (
    <div className="container p-8 bg-gray-50 min-h-screen">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-bold">{data.volume} Volume</p>
              <p className="text-lg font-semibold text-green-500">{data.growth} Growth</p>
            </div>
            <p className="text-gray-600 mb-6">{data.description}</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.volumeData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="volume" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <RadialBarChart data={browserData} innerRadius="30%" outerRadius="90%" startAngle={180} endAngle={0}>
                <RadialBar minAngle={15} background dataKey="visitors">
                  <LabelList position="inside" fill="#fff" dataKey="browser" />
                </RadialBar>
                <ChartTooltip />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Background & Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{data.background}</p>
            <button className="text-primary hover:underline">Read More</button>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center gap-2">
            <Image src='/startups/rs.svg' alt='' width={30} height={30} />
            <CardTitle>Related Meta Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {data.relatedTrends.map((trend, i) => (
                <Card key={i} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Image src={`/${trend.name.toLowerCase().replace(' ', '-')}.svg`} alt={trend.name} width={20} height={20} />
                    </div>
                    <h3 className="font-semibold">{trend.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex flex-col items-center p-2 bg-gray-100 rounded">
                      <span className="text-gray-600">Volume</span>
                      <span className="font-medium">{trend.volume}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-100 rounded">
                      <span className="text-gray-600">Growth</span>
                      <span className={trend.growth.includes('-') ? 'text-red-500' : 'text-green-500'}>
                        {trend.growth.includes('-') ? '' : '+'}
                        {trend.growth}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-100 rounded">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-medium">{trend.revenue}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;

