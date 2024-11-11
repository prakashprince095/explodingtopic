'use client';

import { useState, useMemo, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  socialPlatforms?: string[];
  growth: string;
  volume: string;
  totalFunding: string;
  latestRound: string;
  employees: string;
  category: string[];
  location: string;
  growthData?: number[];
};

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
  const [startupsData, setStartupsData] = useState<Startup[]>([
    {
      id: 1,
      title: 'Tech Innovators',
      description: 'A leading company in AI-driven technology solutions.',
      foundedDate: '2015-06-23',
      website: 'https://techinnovators.com',
      socialPlatforms: ['Twitter', 'LinkedIn'],
      growth: 'High',
      volume: '120K',
      totalFunding: '$10M',
      latestRound: 'Series B',
      employees: '250',
      category: ['Technology', 'AI'],
      location: 'USA',
      growthData: [10, 15, 20, 25, 30, 35, 40],
    },
    {
      id: 2,
      title: 'Health First',
      description: 'Revolutionizing healthcare with telemedicine solutions.',
      foundedDate: '2018-04-12',
      website: 'https://healthfirst.com',
      socialPlatforms: ['Facebook', 'LinkedIn'],
      growth: 'Medium',
      volume: '80K',
      totalFunding: '$5M',
      latestRound: 'Series A',
      employees: '100',
      category: ['Healthcare', 'Technology'],
      location: 'Canada',
      growthData: [5, 10, 15, 18, 22, 24, 28],
    },
  ]);
  const applyFilters = (startup: Startup) => {
    const matchesCategory = filters.category === 'All' || startup.category.includes(filters.category);
    const matchesLocation = filters.location === 'All' || startup.location === filters.location;
    return matchesCategory && matchesLocation;
  };

  const filteredstartups: Startup[] = useMemo(() => {
    return startupsData
      .filter((startup) => startup.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(applyFilters);
  }, [searchQuery, filters, startupsData]);

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
    <div className="min-h-screen p-6 bg-slate-50 border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl ">Trending Startups</h2>
        <div className='flex gap-3'>
          <input
            type="text"
            placeholder="Search Startups"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-sm min-w-[300px] border-gray-400"
          />
          <Button onClick={exportToCSV}>Export to CSV</Button>
        </div>
      </div>

      <div className="flex items-center justify-between  mb-4">
        <div className='flex items-center gap-3 flex-wrap'>
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Business">Socials</SelectItem>
                <SelectItem value="Business">Beauty</SelectItem>
                <SelectItem value="Business">HealthCare</SelectItem>
                <SelectItem value="Business">Finance</SelectItem>
                <SelectItem value="Business">Food</SelectItem>
                <SelectItem value="Business">HealthCare</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="category">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="China">China</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="category">Name</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="volume">Profits</SelectItem>
                <SelectItem value="volume">Loss</SelectItem>
                <SelectItem value="volume">Searches</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="TimeFrame" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="category">3 months</SelectItem>
                <SelectItem value="volume">6 months</SelectItem>
                <SelectItem value="volume">1 year</SelectItem>
                <SelectItem value="volume">2 year</SelectItem>
                <SelectItem value="volume">3 year</SelectItem>
                <SelectItem value="volume">4 year</SelectItem>
                <SelectItem value="volume">5 year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Total Funding" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="category">USA</SelectItem>
                <SelectItem value="volume">Canada</SelectItem>
                <SelectItem value="volume">India</SelectItem>
                <SelectItem value="volume">China</SelectItem>
                <SelectItem value="volume">UK</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="No of employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="category">1-25</SelectItem>
                <SelectItem value="volume">25-50</SelectItem>
                <SelectItem value="volume">50-100</SelectItem>
                <SelectItem value="volume">100-1000</SelectItem>
                <SelectItem value="volume">1000-5000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex border border-gray-400 p-[2px] rounded-sm">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-1 ${isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
          >
            <Image
              src="/startups/grid.svg"
              width={20}
              height={25}
              alt="Grid View"
              className={isGridView ? 'filter invert' : ''}
            />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-1 ${!isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
          >
            <Image
              src="/startups/list.svg"
              width={20}
              height={25}
              alt="List View"
              className={!isGridView ? 'filter invert' : ''}
            />
          </button>

        </div>
      </div>
      <div className='bg-white h-screen border border-zinc-300 p-2 rounded-lg shadow-sm '>

        <div className={`${isGridView ? 'flex flex-row gap-3 flex-wrap' : 'flex flex-col w-full gap-4'}`}>
          {filteredstartups.map((startup) => (
            <div
              key={startup.id}
              className="p-4 border rounded-md bg-gray-100 hover:shadow-lg transition cursor-pointer"
            >
              <Link href={`/dashboard/trending-startups/${startup.id}`}>
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
    </div>
  );
}
