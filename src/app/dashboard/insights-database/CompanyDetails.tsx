'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Company data
const companyData = [
  {
    name: 'Arcane AI',
    volume: 390,
    growth: '99X+',
    description: 'Platform enabling users to create and play games without writing code.',
    data: [50, 100, 150, 210, 390],
  },
  {
    name: 'Libresprite',
    volume: 800,
    growth: '+9800%',
    description: 'Free and open-source software designed for animating sprites.',
    data: [100, 250, 600, 400, 140],
  },
  {
    name: 'Backloggd',
    volume: 500,
    growth: '+9700%',
    description: 'Platform for users to track their game collection and keep it updated.',
    data: [500, 700, 100, 300, 500],
  },
];


interface CompanyDetailsProps {
  company: {
    name: string;
    volume: string;
    growth: string;
  };
  onClick: () => void;
}


const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, onClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Growth');
  const [timeframe, setTimeframe] = useState('5 Years');
  const [type, setType] = useState('All');
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);


  // Search and filter logic
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = companyData.filter((company) =>
      company.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  // Sort logic
  const handleSort = (sortBy: string) => {
    const sorted = [...filteredCompanies].sort((a, b) => {
      if (sortBy === 'Growth') return parseInt(b.growth) - parseInt(a.growth);
      return b.volume - a.volume;
    });
    setSortType(sortBy);
    setFilteredCompanies(sorted);
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Export data to CSV
  const handleExport = () => {
    const csvData = filteredCompanies.map((company) => ({
      name: company.name,
      volume: company.volume,
      growth: company.growth,
    }));

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Name,Volume,Growth', ...csvData.map((c) => `${c.name},${c.volume},${c.growth}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'company_data.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="absolute inset-0 bg-gray-50 p-6 overflow-auto">
      {/* Controls */}
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-[28px]'>Insights-database</h1>
        <div className="flex gap-3 items-center mb-6">
          <div>
            <input
              type="text"
              className="border p-2 rounded-sm min-w-[300px] border-gray-400"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-[150px] shadow-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="growth">Sort by Growth</SelectItem>
                  <SelectItem value="vloume">Sort by Volume</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px] shadow-sm">
                <SelectValue placeholder="TimeFrame" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="volume">3 months</SelectItem>
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
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Brands">Brands</SelectItem>
                  <SelectItem value="Non-Brands">Non-Brands</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleExport}>
            Export Data
          </Button>
        </div>
      </div>
      {/* Company List */}
      <div className="flex flex-wrap justify-center gap-5">
        {filteredCompanies.map((company) => (
          <div onClick={onClick} key={company.name} className="p-4 w-[500px] border rounded-md border-gray-300">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl ">{company.name}</h2>
              <div className="flex space-x-4">
                <div>
                  <h3 className="text-blue-500">{company.volume}</h3>
                  <span>Volume</span>
                </div>
                <div>
                  <h3 className="text-green-500">{company.growth}</h3>
                  <span>Growth</span>
                </div>
              </div>
            </div>
            <div className="w-[450px]">
              <Line
                data={{
                  labels: ['2020', '2021', '2022', '2023', '2024'],
                  datasets: [
                    {
                      label: 'Volume',
                      data: company.data,
                      borderColor: '#3b82f6',
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>
            <p className="mt-4 text-gray-900">{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDetails;
