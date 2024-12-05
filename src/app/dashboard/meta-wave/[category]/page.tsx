'use client';
import { useParams } from 'next/navigation';
import { PolarGrid, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 135, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 220, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "chrome", visitors: 220, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig


type CategoryData = {
  title: string;
  volume: string;
  growth: string;
  description: string;
  relatedTrends: string[];
  background: string;
};

type CategoryKeys =
  | 'AI Transcription'
  | 'AI in Education'
  | 'DevOps Spinoffs'
  | 'Climate FinTech'
  | 'Accessible Martech'
  | 'Electrolyte Supplements'
  | 'ADHD Products'
  | 'AI Presentation Makers'
  | 'Blog Post to Video'
  | 'Short-Form Video Editors'
  | 'Specialty Lotions';

const categoryData: Record<CategoryKeys, CategoryData> = {
  "AI Transcription": {
    title: "AI Transcription",
    volume: "12.1K",
    growth: "+7600%",
    description: "Service that provides free, accurate AI-based transcriptions for audio and video content...",
    relatedTrends: ["AI Presentation Makers", "AI in Education", "AI-Assisted Coding"],
    background: "AI transcription has become a very useful tool in a variety of industries...",
  },
  "AI in Education": {
    title: "AI in Education",
    volume: "8.3K",
    growth: "+4800%",
    description: "Innovative tools to assist with learning and teaching...",
    relatedTrends: ["AI Transcription", "AI-Assisted Learning", "AI for Teachers"],
    background: "AI in education is transforming how students and teachers interact...",
  },
  "DevOps Spinoffs": {
    title: "DevOps Spinoffs",
    volume: "4.5K",
    growth: "+2700%",
    description: "New trends in the DevOps ecosystem...",
    relatedTrends: ["Workflow Automation", "Cloud Technologies", "CI/CD Pipelines"],
    background: "DevOps Spinoffs represent a growing trend of specialized tools...",
  },
  "Climate FinTech": {
    title: "Climate FinTech",
    volume: "2.9K",
    growth: "+1800%",
    description: "FinTech solutions for climate-related issues...",
    relatedTrends: ["Green Finance", "Sustainable Tech", "ESG Investments"],
    background: "Climate FinTech is an emerging trend focused on sustainable finance...",
  },
  "Accessible Martech": {
    title: "Accessible Martech",
    volume: "3.8K",
    growth: "+3000%",
    description: "Tools to make marketing technology accessible...",
    relatedTrends: ["Headless CMS", "Automation Tools", "Content Personalization"],
    background: "Accessible Martech is revolutionizing the marketing space...",
  },
  "Electrolyte Supplements": {
    title: "Electrolyte Supplements",
    volume: "3.5K",
    growth: "+1600%",
    description: "Supplements to replenish electrolytes...",
    relatedTrends: ["Focus Supplements", "Hydration Products", "Sports Nutrition"],
    background: "Electrolyte supplements are widely used in sports and fitness...",
  },
  "ADHD Products": {
    title: "ADHD Products",
    volume: "2.4K",
    growth: "+1700%",
    description: "Tools to assist individuals with ADHD...",
    relatedTrends: ["Focus Supplements", "Mental Health Tech", "Cognitive Tools"],
    background: "ADHD products are gaining traction in mental health technology...",
  },
  "AI Presentation Makers": {
    title: "AI Presentation Makers",
    volume: "5.1K",
    growth: "+3500%",
    description: "Tools to create presentations using AI...",
    relatedTrends: ["AI Transcription", "AI in Education", "AI-Assisted Learning"],
    background: "AI Presentation Makers are transforming the way we create presentations...",
  },
  "Blog Post to Video": {
    title: "Blog Post to Video",
    volume: "7.2K",
    growth: "+4600%",
    description: "Converting blog posts into videos using AI...",
    relatedTrends: ["AI Video Editors", "Short-Form Video", "Content Monetization"],
    background: "Blog Post to Video tools are making content repurposing easier...",
  },
  "Short-Form Video Editors": {
    title: "Short-Form Video Editors",
    volume: "5.4K",
    growth: "+4100%",
    description: "AI-powered video editing tools for short-form content...",
    relatedTrends: ["TikTok Tools", "Content Creators", "Video Marketing"],
    background: "Short-form video editors are critical for fast-paced video creation...",
  },
  "Specialty Lotions": {
    title: "Specialty Lotions",
    volume: "2.4K",
    growth: "+1300%",
    description: "Lotions for specialized skincare needs...",
    relatedTrends: ["Snail Mucin Skincare", "Ingredient-Led Skincare", "TikTok Beauty"],
    background: "Specialty Lotions cater to targeted skin concerns...",
  },
};


const fromSlug = (slug: string): CategoryKeys | null => {
  switch (slug) {
    case 'ai-transcription':
      return 'AI Transcription';
    case 'ai-in-education':
      return 'AI in Education';
    case 'devops-spinoffs':
      return 'DevOps Spinoffs';
    case 'climate-fintech':
      return 'Climate FinTech';
    case 'accessible-martech':
      return 'Accessible Martech';
    case 'electrolyte-supplements':
      return 'Electrolyte Supplements';
    case 'adhd-products':
      return 'ADHD Products';
    case 'ai-presentation-makers':
      return 'AI Presentation Makers';
    case 'blog-post-to-video':
      return 'Blog Post to Video';
    case 'short-form-video-editors':
      return 'Short-Form Video Editors';
    case 'specialty-lotions':
      return 'Specialty Lotions';
    default:
      return null;
  }
};

const CategoryPage = () => {
  const params = useParams();
  const { category } = params as { category: string };

  const categoryKey = fromSlug(category);

  const data = categoryKey ? categoryData[categoryKey] : null;

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container flex flex-col gap-7 p-8 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white shadow-md rounded-md w-full">
        <h3 className="text-xl ">Analytics</h3>
        <div className="m-10">
            <CardHeader className="items-center pb-0">
              <CardTitle>Radial Chart - Grid</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-3">
              <ChartContainer
                config={chartConfig}
                className="mx-auto  h-[500px]"
              >
                <RadialBarChart data={chartData} innerRadius={30} outerRadius={250}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="browser" />}
                  />
                  <PolarGrid gridType="circle" />
                  <RadialBar dataKey="visitors" />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
        </div>
      </div>
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col space-y-6 w-full">
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl ">{data.title}</h2>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-600">{data.volume} Volume</p>
              <p className="text-green-500">{data.growth} Growth</p>
            </div>
            <p className="mt-4 text-gray-600">{data.description}</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-xl ">Background & Analysis</h3>
            <p className="mt-2 text-gray-600">{data.background}</p>
            <button className="mt-4 text-blue-500">Read More</button>
          </div>

          <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-xl ">Related Meta Trends</h3>
            <ul className="mt-2 space-y-2">
              {data.relatedTrends.map((trend, index) => (
                <li key={index} className="text-blue-500 cursor-pointer">{trend}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
