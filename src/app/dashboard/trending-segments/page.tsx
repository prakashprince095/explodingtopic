"use client";

import { useState, useMemo } from "react";
import { saveAs } from "file-saver"; // To export CSV
import StartupDetail from "./StartupDetail";
import { useHub } from "@/context/HubContext";

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
    channels: [{ name: "Twitter", volume: 100 }, { name: "LinkedIn", volume: 200 }],
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
    channels: [{ name: "Twitter", volume: 500 }, { name: "GitHub", volume: 300 }],
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

  // Toggle saving a segment
  const toggleSaveSegment = (id: number) => {
    setSavedSegments((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

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

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      timeframe: "5 Years",
      category: "All",
      growth: "All",
      volume: "All",
      totalFunding: "All",
      employees: "All",
      location: "All",
    });
  };

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
  const renderGrowthChart = (growth: string) => {
    return (
      <svg
        width="100"
        height="30"
        viewBox="0 0 100 30"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-2"
      >
        <polyline
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={getGrowthColor(growth)} // Conditionally apply color
          points={
            growth.startsWith("+")
              ? "0,30 20,15 40,10 60,5 80,0 100,5"
              : "0,5 20,10 40,15 60,20 80,25 100,30"
          } // Mocked points for graph
        />
      </svg>
    );
  };

  const handleStartupClick = (segment: Segment) => {
    setSelectedStartup(segment); // Set the clicked startup as the selected one
    setShowDetail(true); // Show detailed view when clicked
  };

  const getGrowthColor = (growth: string) =>
    growth.startsWith("+") ? "stroke-green-500" : "stroke-red-500";

  return (
    <div className="p-6">
      {/* 1. Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Trending Startups</h2>
        <input
          type="text"
          placeholder="Search Segments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg bg-transparent"
        />
      </div>

      {/* 2. Filter Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <select
          value={filters.timeframe}
          onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
          className="border p-2 rounded bg-transparent"
        >
          <option value="5 Years">5 Years</option>
          <option value="1 Year">1 Year</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded bg-transparent"
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded bg-transparent"
        >
          <option value="All">All Locations</option>
          <option value="USA">USA</option>
        </select>
      </div>

      {/* 3. Additional Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <select
          value={filters.growth}
          onChange={(e) => setFilters({ ...filters, growth: e.target.value })}
          className="border p-2 rounded bg-transparent"
        >
          <option value="All">All Growth</option>
          <option value="+99%">+99%</option>
          <option value="+50%">+50%</option>
        </select>

        <select
          value={filters.volume}
          onChange={(e) => setFilters({ ...filters, volume: e.target.value })}
          className="border p-2 rounded bg-transparent"
        >
          <option value="All">All Volumes</option>
          <option value="4.4K">4.4K</option>
          <option value="9.9K">9.9K</option>
        </select>
      </div>

      {/* 4. Grid/List Toggle */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsGridView(true)}
          className={`px-4 py-2 rounded ${isGridView ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Grid View
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`px-4 py-2 rounded ml-2 ${!isGridView ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          List View
        </button>
      </div>

      {/* 5. Startup Grid/List */}
      <div className={`grid ${isGridView ? "grid-cols-2 md:grid-cols-3 gap-4" : "flex flex-col gap-3"}`}>
        {sortedSegments.map((segment) => (
          <div
            key={segment.id}
            className="border border-gray-400 p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStartupClick(segment)}
          >
            <h3 className="text-xl">{segment.title}</h3>
            <p className="text-[18px]">Volume: {segment.volume}</p>
            <p className="text-[18px]">Funding: {segment.totalFunding}</p>
            <p className="text-[18px]">Round: {segment.latestRound}</p>
            <p className="text-[18px]">Employees: {segment.employees}</p>
            <p className="text-[18px]">Category: {segment.category.join(", ")}</p>
            <p className="text-[18px]">Location: {segment.location}</p>
            <p className="text-[18px]">Growth: {segment.growth}</p>
            <p className="text-[18px]">Description: {segment.description}</p>
            {renderGrowthChart(segment.growth)}
            <button
              onClick={() => addToHub(segment)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add to Hub
            </button>
          </div>
        ))}
      </div>

      {/* 6. Selected Startup Detail */}
      {selectedStartup && <StartupDetail startup={selectedStartup} onClose={() => setSelectedStartup(null)} />}

      {/* Export to CSV */}
      <div className="flex justify-end mt-4">
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Export to CSV
        </button>
      </div>
    </div>

  );
}