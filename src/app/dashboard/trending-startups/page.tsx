"use client";

import { useState, useMemo } from "react";
import { saveAs } from "file-saver"; // For CSV export
import StartupDetail from "./[startups]/page";
import { useHub } from "@/context/HubContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


// Define the types for the segment data
type KeyIndicators = {
  growth: string;
  speed: string;
  seasonality: string;
  volatility: string;
  sentiment: string;
  forecast: string;
};

export type Segment = {
  id: number;
  title: string;
  description: string;
  foundedDate: string;
  website: string;
  socialPlatforms: string[];
  growth: string;
  volume: string;
  totalFunding: string;
  latestRound: string;
  employees: string;
  category: string[];
  location: string;
  growthData?: number[];
  relatedStartups?: {
    id: number;
    logo: string;
    name: string;
    description: string;
    growthRate: string;
  }[];
  channels?: { name: string; volume: number }[];
  keyIndicators?: KeyIndicators;
};

// Mock data for segments
const segmentsData: Segment[] = [
  {
    id: 1,
    title: "DocuClipper",
    description: "OCR software designed for financial document management.",
    foundedDate: "2020-01-01",
    website: "https://docuclipper.com",
    socialPlatforms: ["Twitter", "LinkedIn"],
    growth: "+99%",
    volume: "4.4K",
    totalFunding: "Undisclosed",
    latestRound: "Bootstrapped",
    employees: "1-10",
    category: ["Business", "Technology", "Finance"],
    location: "USA",
    growthData: [120, 150, 180, 210, 250, 300], // Example growth data
    keyIndicators: {
      growth: "High",
      speed: "Fast",
      seasonality: "Low",
      volatility: "Medium",
      sentiment: "Positive",
      forecast: "Stable",
    },
  },
  {
    id: 2,
    title: "Livekit",
    description: "Realtime platform enabling developers to build applications.",
    foundedDate: "2021-05-15",
    website: "https://livekit.io",
    socialPlatforms: ["Twitter", "GitHub"],
    growth: "+99%",
    volume: "9.9K",
    totalFunding: "$36.5M",
    latestRound: "Series A",
    employees: "11-50",
    category: ["Technology", "Software", "Programming"],
    location: "USA",
    growthData: [200, 150, 170, 120, 80, 40],
    keyIndicators: {
      growth: "High",
      speed: "Moderate",
      seasonality: "Low",
      volatility: "High",
      sentiment: "Neutral",
      forecast: "Growing",
    },
  },
];

// Chart configuration function for growth data
export function GrowthChart({ growthData }: { growthData: number[] }) {
  if (!growthData || growthData.length === 0) return null;

  return (
    <Card className="mt-4 p-1 border border-gray-300 ">
      <CardContent>
        <div className="h-[100px] max-w-[300px] ">
          <ResponsiveContainer>
            <LineChart data={growthData.map((val, index) => ({ name: `Month ${index + 1}`, value: val }))}>
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


export default function Trending() {
  const [selectedStartup, setSelectedStartup] = useState<Segment | null>(null);
  const [savedSegments, setSavedSegments] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    timeframe: "5 Years",
    category: "All",
    growth: "All",
    volume: "All",
    totalFunding: "All",
    employees: "All",
    location: "All",
  });
  const { addToHub } = useHub();
  const [sortBy, setSortBy] = useState<keyof Segment | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showDetail, setShowDetail] = useState(false);

  // Apply filters to segments
  const applyFilters = (segment: Segment) => {
    const matchesCategory =
      filters.category === "All" || segment.category.includes(filters.category);
    const matchesLocation =
      filters.location === "All" || segment.location === filters.location;
    return matchesCategory && matchesLocation;
  };

  // Filtered segments
  const filteredSegments = useMemo(() => {
    return segmentsData
      .filter((segment) =>
        segment.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(applyFilters);
  }, [searchQuery, filters]);

  // Sort segments
  const sortedSegments = useMemo(() => {
    if (!sortBy) return filteredSegments;
    return [...filteredSegments].sort((a, b) => {
      const valA = a[sortBy] as string | number;
      const valB = b[sortBy] as string | number;

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [filteredSegments, sortBy, sortOrder]);

  // Export to CSV
  const exportToCSV = () => {
    let csvContent =
      "Company Name,Growth,Volume,Total Funding,Latest Round,Employees,Categories,Location\n";
    sortedSegments.forEach((segment) => {
      const row = [
        segment.title,
        segment.growth,
        segment.volume,
        segment.totalFunding,
        segment.latestRound,
        segment.employees,
        segment.category.join(", "),
        segment.location,
      ].join(",");
      csvContent += row + "\n";
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "segments.csv");
  };

  // Function to generate the SVG for the growth chart
  const renderGrowthChart = (growthData: number[]) => {
    return <GrowthChart growthData={growthData} />;
  };

  const handleStartupClick = (segment: Segment) => {
    setSelectedStartup(segment); // Set the clicked startup as the selected one
    setShowDetail(true); // Show detailed view when clicked
  };

  return (
    <div className="min-h-screen bg-white border border-gray-300 p-3 rounded-lg">
      {/* 1. Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Trending Startups</h2>
        <input
          type="text"
          placeholder="Search Segments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-sm min-w-[400px] border-gray-400 bg-transparent"
        />
        <Button
          onClick={exportToCSV}
        >
          Export to CSV
        </Button>
      </div>

      {/* 2. Filter Options */}
      <div className=" flex items-center gap-5 flex-wrap">
        <select
          value={filters.timeframe}
          onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[200px] border-gray-400"
        >
          <option value="5 Years">5 Years</option>
          <option value="1 Year">1 Year</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[200px] border-gray-400"
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[200px] border-gray-400"
        >
          <option value="All">All Locations</option>
          <option value="USA">USA</option>
        </select>

        <select
          value={filters.growth}
          onChange={(e) => setFilters({ ...filters, growth: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[200px] border-gray-400"
        >
          <option value="All">All Growth</option>
          <option value="+99%">+99%</option>
          <option value="+50%">+50%</option>
        </select>

        <select
          value={filters.volume}
          onChange={(e) => setFilters({ ...filters, volume: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[200px] border-gray-400"
        >
          <option value="All">All Volumes</option>
          <option value="4.4K">4.4K</option>
          <option value="9.9K">9.9K</option>
        </select>
      </div>


      {/* 4. Grid/List Toggle */}
      <div className="my-4 flex gap-1 justify-end">
        <button
          onClick={() => setIsGridView(true)}
          className={`p-1  ${isGridView ? "bg-gray-200 rounded-md" : ""}`}
        >
          <Image
            src="/startups/grid.svg"
            width={30}
            height={25}
            alt="Picture of the grid items"
          />
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`p-1  ${!isGridView ? "bg-gray-200 rounded-md" : ""}`}
        >
          <Image
            src="/startups/list.svg"
            width={30}
            height={25}
            alt="Picture of the grid items"
          />
        </button>
      </div>

      {/* 5. Startup Grid/List */}
      <div className={`flex ${isGridView ? " flex-row flex-wrap gap-3" : "flex flex-col gap-3"}`}>
        {sortedSegments.map((segment) => (
          <div key={segment.id} className="border p-4 rounded-lg  hover:shadow-xl  bg-zinc-100 cursor-pointer">
            {isGridView && (
              <div className="flex flex-col  max-w-[350px]">
                <div onClick={() => handleStartupClick(segment)}>
                  <h3 className="text-2xl mb-3 text-center">{segment.title}</h3>
                  <div className="flex items-center justify-between flex-wrap">
                    <p className="text-[14px] text-gray-600">Volume: {segment.volume}</p>
                    <div className="bg-black text-white px-2 py-2 rounded-full w-fit">
                      <p className="text-[14px]">Funding: {segment.totalFunding}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center  my-4 ">
                    <div className="bg-white min-w-[170px] p-1 shadow-sm rounded-sm border">
                      <p className=" flex flex-col items-center"><span className="text-gray-500">Round:</span><span className="text-[18px]"> {segment.latestRound}</span></p>
                    </div>
                    <div className="bg-white min-w-[170px] p-1 shadow-sm rounded-sm border">
                      <p className=" flex flex-col items-center"><span className="text-gray-500">Employees:</span><span className="text-[18px]"> {segment.employees}</span></p>
                    </div>
                    <div className="bg-white min-w-[170px] p-1 shadow-sm rounded-sm border">
                      <p className=" flex flex-col items-center"><span className="text-gray-500">Location:</span><span className="text-[18px]"> {segment.location}</span></p>
                    </div>
                    <div className="bg-white min-w-[170px] p-1 shadow-sm rounded-sm border">
                      <p className=" flex flex-col items-center"><span className="text-gray-500">Growth:</span> <span className="text-[18px]">{segment.growth}</span></p>
                    </div>
                  </div>
                  <div className="bg-gray-300 my-3 p-[.5px] rounded-full"></div>
                  <p><span className="text-[18px] font-medium">Description:</span> <br /> <span className="text-[16px] text-gray-600">{segment.description}</span></p>
                  {segment.growthData ? renderGrowthChart(segment.growthData) : null}
                </div>
                <Button className="my-3 w-fit" onClick={() => addToHub(segment)}>Add to Hub</Button>
              </div>
            )}

            {/* For List View */}
            {!isGridView && (
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row flex-grow">
                  <h3 className="text-2xl">{segment.title}</h3>
                  <p className="text-[18px]">Volume: {segment.volume}</p>
                  <p className="text-[18px]">Funding: {segment.totalFunding}</p>
                  <p className="text-[18px]">Round: {segment.latestRound}</p>
                  <p className="text-[18px]">Employees: {segment.employees}</p>
                  <p className="text-[18px]">Category: {segment.category.join(", ")}</p>
                  <p className="text-[18px]">Location: {segment.location}</p>
                  <p className="text-[18px]">Growth: {segment.growth}</p>
                  <p className="text-[18px]">Description: {segment.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {segment.growthData ? renderGrowthChart(segment.growthData) : null}
                </div>
                <Button
                  onClick={() => addToHub(segment)}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add to Hub
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 6. Selected Startup Detail */}
      {selectedStartup && <StartupDetail startup={selectedStartup} onClose={() => setSelectedStartup(null)} />}

      {/* Export to CSV */}
      <div className="flex justify-end mt-4">

      </div>
    </div>

  );
}