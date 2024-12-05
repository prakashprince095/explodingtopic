'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

interface Industry {
  name: string;
  subcategories: string[];
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

const TrendsDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const router = useRouter();

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubcategoryClick = (subcategory: string) => {
    router.push(`/dashboard/insights-database/${subcategory}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gray-50 p-6">
      <div className="flex justify-between w-full mb-6">
        <h2 className="text-2xl ">Insight Database</h2>
        <div className="">
          <Input
            type="text"
            placeholder="Search Industries"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex bg-gray-100 shadow-lg border w-full  rounded-lg">
        {/* Industry List */}
        <div className="w-1/3 bg-gray-50 p-4 overflow-auto">
          <ul>
            {filteredIndustries.map((industry) => (
              <li
                key={industry.name}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition ${selectedIndustry === industry.name ? 'bg-gray-100' : ''
                  }`}
                onClick={() => setSelectedIndustry(industry.name)}
              >
                {industry.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Subcategories */}
        <div className="w-full p-6">
          {selectedIndustry && (
            <div>
              <h2 className="text-lg mb-4">Subcategories of {selectedIndustry}</h2>
              <ul className="grid grid-cols-2 gap-4">
                {industries
                  .find((industry) => industry.name === selectedIndustry)
                  ?.subcategories.map((subcategory) => (
                    <li
                      key={subcategory}
                      className="p-3 border rounded cursor-pointer hover:bg-white"
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      {subcategory}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendsDatabase;