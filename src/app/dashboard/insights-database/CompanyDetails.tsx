'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="flex space-x-4">
          <select className="border p-2 rounded" value={sortType} onChange={(e) => handleSort(e.target.value)}>
            <option value="Growth">Sort by Growth</option>
            <option value="Volume">Sort by Volume</option>
          </select>
          <select className="border p-2 rounded" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option value="5 Years">5 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="1 Year">1 Year</option>
          </select>
          <select className="border p-2 rounded" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Brands">Brands</option>
            <option value="Non-Brands">Non-Brands</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleExport}>
          Export Data
        </button>
      </div>

      {/* Company List */}
      <div className="grid grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div  onClick={onClick} key={company.name} className="p-4 border rounded-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">{company.name}</h2>
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
            <div className="w-full">
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
            <p className="mt-4 text-gray-500">{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDetails;
