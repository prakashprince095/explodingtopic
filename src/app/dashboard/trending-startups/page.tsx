'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStartup } from '@/context/StartupContext';
import { Startup } from '@/types/index';
import { saveAs } from 'file-saver';
import { LineChart, Line, CartesianGrid, XAxis, Tooltip } from 'recharts';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHub } from '@/context/HubContext';

const startupsData: Startup[] = [
  {
    id: 1,
    title: 'TechInnovatorsInc.',
    description: 'Leading the future of AI technology.',
    foundedDate: '2019',
    website: 'https://techinnovators.com',
    socialPlatforms: ['Twitter', 'LinkedIn'],
    growth: 'High',
    volume: '500K',
    totalFunding: '$10M',
    latestRound: 'Series A',
    employees: '50-100',
    category: ['AI', 'Tech'],
    location: 'San Francisco, CA',
    growthData: [10, 20, 30, 40],
    relatedStartups: [
      {
        id: 3,
        logo: 'https://via.placeholder.com/50',
        name: 'Startup B',
        description: 'AI-driven solutions for modern problems.',
        growthRate: 'Fast',
      },
    ],
    keyIndicators: {
      growth: 'High',
      speed: 'Moderate',
      seasonality: 'Low',
      volatility: 'Medium',
      sentiment: 'Positive',
      forecast: 'Upward',
    },
    relatedTrends: [
      {
        name: 'Trend 1',
        growthRate: '+15%',
        growthData: [
          { idx: 0, value: 10 },
          { idx: 1, value: 15 },
        ],
      },
    ],
  },
];

const Startups = () => {
  const router = useRouter();
  const { setSelectedStartup } = useStartup();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [filteredStartups, setFilteredStartups] = useState(startupsData);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [fundingFilter, setFundingFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const { addToHub } = useHub();

  const handleAddToHub = (startup: Startup) => {
    addToHub(startup);
  };

  const handleStartupClick = (startup: Startup) => {
    setSelectedStartup(startup);
    router.push(`/dashboard/trending-startups/${startup.title}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStartups(
      startupsData.filter((startup) =>
        startup.title.toLowerCase().includes(query)
      )
    );
  };

  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      filteredStartups
        .map((s) => Object.values(s).join(','))
        .join('\n');
    saveAs(new Blob([csvContent], { type: 'text/csv' }), 'startups.csv');
  };


  const GrowthChart = ({ growthData }: { growthData: number[] }) => (
    <div className="mt-4 p-1 border border-gray-300 rounded-md">
      <LineChart
        width={300}
        height={200}
        data={growthData.map((val, idx) => ({ name: `Month ${idx + 1}`, value: val }))}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} dot={{ fill: "#2563EB" }} />
      </LineChart>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-slate-50 border border-gray-300 rounded-lg">
      {/* Header with search and export */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl">Trending Startups</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Startups"
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded-sm min-w-[300px] border-gray-400"
          />
          <Button onClick={exportToCSV}>Export to CSV</Button>
        </div>
      </div>

      {/* Filter Selects */}
      <div className="flex items-center justify-between mb-4">
        <div className='flex items-center gap-3 flex-wrap'>
          <Select onValueChange={(value) => setCategoryFilter(value)}>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Socials">Socials</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
                <SelectItem value="HealthCare">HealthCare</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setCountryFilter(value)}>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="China">China</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Name">Name</SelectItem>
                <SelectItem value="Volume">Volume</SelectItem>
                <SelectItem value="Profits">Profits</SelectItem>
                <SelectItem value="Loss">Loss</SelectItem>
                <SelectItem value="Searches">Searches</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setTimeFrame(value)}>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="TimeFrame" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
                <SelectItem value="2 years">2 years</SelectItem>
                <SelectItem value="3 years">3 years</SelectItem>
                <SelectItem value="4 years">4 years</SelectItem>
                <SelectItem value="5 years">5 years</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setFundingFilter(value)}>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Total Funding" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Less than $1M">Less than $1M</SelectItem>
                <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                <SelectItem value="More than $10M">More than $10M</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setEmployeeFilter(value)}>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="No of employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1-25">1-25</SelectItem>
                <SelectItem value="25-50">25-50</SelectItem>
                <SelectItem value="50-100">50-100</SelectItem>
                <SelectItem value="100-1000">100-1000</SelectItem>
                <SelectItem value="1000-5000">1000-5000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Grid/List view toggle */}
        <div className="flex border border-gray-400 p-[2px] rounded-sm">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-1 ${isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
          >
            <Image src="/startups/grid.svg" width={20} height={25} alt="Grid View" />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-1 ${!isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
          >
            <Image src="/startups/list.svg" width={20} height={25} alt="List View" />
          </button>
        </div>
      </div>

      {/* Startup Cards */}
      <div className="bg-white h-screen border border-zinc-300 p-2 rounded-lg shadow-sm">
        <div className={`${isGridView ? 'flex flex-row gap-3 flex-wrap' : 'flex flex-col w-full gap-4'}`}>
          <div className="p-3 w-[350px] h-[400px] border rounded-md bg-white hover:bg-gray-100 hover:shadow-lg transition cursor-pointer">
            {filteredStartups.map((startup) => (
              <div
                key={startup.id}
                onClick={() => handleStartupClick(startup)}>
                <Link href={`/dashboard/trending-startups/${startup.title}`}>
                  <div>
                    <h3 className="text-xl">{startup.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Volume: {startup.volume}</span>
                      <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                        Funding: {startup.totalFunding}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-3">{startup.description}</p>
                    {startup.growthData && <GrowthChart growthData={startup.growthData} />}
                  </div>
                </Link>
              </div>
            ))}
            <Button className="mt-4" onClick={() => handleAddToHub(startup)}>Add to Hub</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startups;
