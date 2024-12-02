'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Industry {
  name: string;
  subcategories: string[];
}

interface Company {
  name: string;
  volume: string;
  growth: string;
}

interface CompanyData {
  name: string;
  volume: string;
  growth: string;
  description: string;
  data: {
    description: string;
    channels: { name: string; percentage: number }[];
    keyIndicators: { name: string; value: number }[];
    relatedTrends: {
      name: string;
      growth: number;
      chartData: number[];
    }[];
  };
}

const industries: Industry[] = [
  {
    name: 'Business',
    subcategories: ['Retail', 'Supply Chain & Logistics', 'Productivity', 'Marketing', 'Human Resources'],
  },
  {
    name: 'Technology',
    subcategories: ['Cybersecurity', 'AI & Machine Learning', 'Software Development', 'Cloud Computing', 'DevOps'],
  },
  {
    name: 'Beauty',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Perfumes', 'Spa & Wellness'],
  },
  {
    name: 'Health & Wellness',
    subcategories: ['Nutrition', 'Fitness', 'Mental Health', 'Supplements', 'Yoga & Meditation'],
  },
  {
    name: 'Home',
    subcategories: ['Interior Design', 'Smart Home', 'Gardening', 'Home Improvement', 'Cleaning Supplies'],
  },
  {
    name: 'Entertainment',
    subcategories: ['Movies', 'Gaming', 'Music', 'Live Streaming', 'Podcasts'],
  },
  {
    name: 'Fashion',
    subcategories: ['Clothing', 'Footwear', 'Accessories', 'Luxury', 'Streetwear'],
  },
  {
    name: 'Finance',
    subcategories: ['Investing', 'Cryptocurrency', 'Personal Finance', 'Banking', 'Insurance'],
  },
  {
    name: 'Food & Beverage',
    subcategories: ['Restaurants', 'Vegan Food', 'Coffee & Tea', 'Baking', 'Beverages'],
  },
  {
    name: 'Lifestyle & Culture',
    subcategories: ['Travel', 'Arts & Crafts', 'Photography', 'Books & Literature', 'Hobbies'],
  },
];

const companies: Company[] = [
  { name: 'Company A', volume: '10000', growth: '500' },
  { name: 'Company B', volume: '8000', growth: '320' },
];

const companyData: CompanyData = {
  name: 'Placeholder Company',
  volume: '14800',
  growth: '9800',
  description: 'Description of the company and its services or products.',
  data: {
    description: 'Detailed company insight data goes here.',
    channels: [
      { name: 'Social Media', percentage: 60 },
      { name: 'Search Engines', percentage: 30 },
      { name: 'Email Marketing', percentage: 10 },
    ],
    keyIndicators: [
      { name: 'Revenue', value: 100 },
      { name: 'Active Users', value: 50 },
      { name: 'Conversion Rate', value: 2 },
    ],
    relatedTrends: [
      { name: 'Trend A', growth: 30, chartData: [10, 20, 30, 40, 50] },
      { name: 'Trend B', growth: 25, chartData: [15, 25, 35, 45, 55] },
      { name: 'Trend C', growth: 15, chartData: [5, 15, 25, 35, 45] },
    ],
  },
};

const TrendsDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIndustryClick = (industryName: string) => {
    router.push(`/dashboard/insights-database/${industryName}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-white border border-gray-300 p-3 rounded-lg">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Industries"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-sm w-full mb-4"
        />
      </div>

      <div className="flex bg-white shadow-lg w-[1280px] rounded-lg overflow-hidden">
        <div className="w-1/4 bg-gray-50 p-4 overflow-auto">
          <ul>
            {filteredIndustries.map((industry) => (
              <li
                key={industry.name}
                className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${selectedIndustry === industry.name ? 'bg-blue-100' : ''}`}
                onMouseEnter={() => setSelectedIndustry(industry.name)}
                onClick={() => setSelectedIndustry(industry.name)}
              >
                <section className="flex justify-between items-center">
                  <span className="font-medium">{industry.name}</span>
                  <span className="text-gray-500">{industry.subcategories.length}</span>
                </section>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 p-6">
          {selectedIndustry && !selectedCompany && (
            <div>
              <h2 className="text-lg  mb-4">Subcategories of {selectedIndustry}</h2>
              <ul className="grid grid-cols-2 gap-4">
                {industries
                  .find((industry) => industry.name === selectedIndustry)
                  ?.subcategories.map((subcategory) => (
                    <li
                      key={subcategory}
                      className={`p-2 cursor-pointer border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors ${selectedSubcategory === subcategory ? 'bg-blue-100' : ''}`}
                      onClick={() => setSelectedSubcategory(subcategory)}
                    >
                      {subcategory}
                    </li>
                  ))}
              </ul>
            </div>
          )}

        </div>
      </div>
      <div className="flex justify-center mt-6 text-sm text-gray-400">
        <span className="mx-2">Privacy Policy</span> | <span className="mx-2">Terms & Conditions</span> | <span className="mx-2">Affiliates</span>
      </div>
    </div>
  );
};

export default TrendsDatabase;