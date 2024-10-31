'use client';

import { useState, useMemo } from 'react';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

type KeyIndicators = {
  growth: string;
  speed: string;
  seasonality: string;
  volatility: string;
  sentiment: string;
  forecast: string;
};

type Startup = {
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
};

export const startupsData: Startup[] = [
  // Example data
  {
    id: 1,
    title: 'DocuClipper',
    description: 'OCR software for financial documents.',
    foundedDate: '2020-01-01',
    website: 'https://docuclipper.com',
    socialPlatforms: ['Twitter', 'LinkedIn'],
    growth: '+99%',
    volume: '4.4K',
    totalFunding: 'Undisclosed',
    latestRound: 'Bootstrapped',
    employees: '1-10',
    category: ['Business', 'Technology', 'Finance'],
    location: 'USA',
    growthData: [120, 150, 180, 210, 250, 300],
  },
  
  // Additional startups...
];

const GrowthChart = ({ growthData }: { growthData: number[] }) => (
  <div className="mt-4 p-1 border border-gray-300 rounded-md">
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={growthData.map((val, idx) => ({ name: `Month ${idx + 1}`, value: val }))}>
        <XAxis dataKey="name" hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default function TrendingStartups() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    category: 'All',
    location: 'All',
    growth: 'All',
  });

  const applyFilters = (startup: Startup) => {
    const matchesCategory = filters.category === 'All' || startup.category.includes(filters.category);
    const matchesLocation = filters.location === 'All' || startup.location === filters.location;
    return matchesCategory && matchesLocation;
  };

  const filteredstartups: Startup[] = useMemo(() => {
    return startupsData
      .filter((startup) => startup.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(applyFilters);
  }, [searchQuery, filters, applyFilters]);   

  const exportToCSV = () => {
    const csvContent = [
      'Company Name,Growth,Volume,Total Funding,Latest Round,Employees,Categories,Location',
      ...filteredstartups.map((startup) =>
        [
          startup.title,
          startup.growth,
          startup.volume,
          startup.totalFunding,
          startup.latestRound,
          startup.employees,
          startup.category.join(', '),
          startup.location,
        ].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'startups.csv');
  };

  

  return (
    <div className="min-h-screen p-6 bg-neutral-50 border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trending Startups</h2>
        <input
          type="text"
          placeholder="Search Startups"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-sm min-w-[300px] border-gray-400"
        />
        <Button onClick={exportToCSV}>Export to CSV</Button>
      </div>

      <div className="flex items-center gap-5 mb-4">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded bg-transparent border-gray-400 min-w-[200px]"
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
        </select>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded bg-transparent border-gray-400 min-w-[200px]"
        >
          <option value="All">All Locations</option>
          <option value="USA">USA</option>
        </select>
        
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={() => setIsGridView(true)} className={`p-2 ${isGridView ? 'bg-gray-200 rounded-md' : ''}`}>
          <Image src="/startups/grid.svg" width={24} height={24} alt="Grid View" />
        </button>
        <button onClick={() => setIsGridView(false)} className={`p-2 ${!isGridView ? 'bg-gray-200 rounded-md' : ''}`}>
          <Image src="/startups/list.svg" width={24} height={24} alt="List View" />
        </button>
      </div>

      <div className={`${isGridView ? 'flex flex-row gap-3 flex-wrap' : 'flex flex-col w-full gap-4'}`}>
        {filteredstartups.map((startup) => (
          <div
            key={startup.id}
            className="p-4 border rounded-md bg-gray-100 hover:shadow-lg transition cursor-pointer"
          >
            <Link href={`/dashboard/trending-startups/${startup.title.toLowerCase()}`}>
              <div>
                <h3 className="text-xl ">{startup.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Volume: {startup.volume}</span>
                  <span className="text-sm bg-black text-white px-2 py-1 rounded-full">Funding: {startup.totalFunding}</span>
                </div>
                <div className="flex flex-wrap gap-2 my-3">
                  <div className="bg-white p-2 border rounded-sm text-center">
                    <span className="text-gray-500 text-sm">Round</span>
                    <p className="text-lg ">{startup.latestRound}</p>
                  </div>
                  <div className="bg-white p-2 border rounded-sm text-center">
                    <span className="text-gray-500 text-sm">Employees</span>
                    <p className="text-lg ">{startup.employees}</p>
                  </div>
                  <div className="bg-white p-2 border rounded-sm text-center">
                    <span className="text-gray-500 text-sm">Location</span>
                    <p className="text-lg ">{startup.location}</p>
                  </div>
                  <div className="bg-white p-2 border rounded-sm text-center">
                    <span className="text-gray-500 text-sm">Growth</span>
                    <p className="text-lg ">{startup.growth}</p>
                  </div>
                </div>
                <div className="my-2 border-b border-gray-300"></div>
                <p className="text-sm text-gray-700">{startup.description}</p>
                {startup.growthData && <GrowthChart growthData={startup.growthData} />}
              </div>
            </Link>
            <Button className="mt-4">Add to Hub</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
