'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';
import { useStartup } from '@/context/StartupContext';
import localResponseData from '@/data/response.json';

// Define Startup type
type Startup = {
  uuid: string;
  name: string;
  short_description: string;
  description: string;
  web: string;
  city: string;
  region: string;
  country: string;
  founded_on: string;
  rank: number;
  number_of_employees_min: number;
  number_of_employees_max: number;
  twitter_url: string;
  linkedin_url: string;
  facebook_url: string;
  number_of_investments: number;
};

const Startups = () => {
  const [startupsData, setStartupsData] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setSelectedStartup } = useStartup(); // Ensure `setSelectedStartup` is defined in your context

  const transformData = (data: any): Startup[] => {
    return data.data.organization.similar_companies.map(
      (company: any, index: number): Startup => ({
        uuid: company.url.split('/').pop() || `${index}`,
        name: company.name,
        short_description: data.data.organization.about,
        description: data.data.organization.full_description,
        web: company.url,
        city:
          data.data.organization.locations.find(
            (loc: { location_type: string; value: string }) =>
              loc.location_type === 'city'
          )?.value || '',
        region:
          data.data.organization.locations.find(
            (loc: { location_type: string; value: string }) =>
              loc.location_type === 'region'
          )?.value || '',
        country:
          data.data.organization.locations.find(
            (loc: { location_type: string; value: string }) =>
              loc.location_type === 'country'
          )?.value || '',
        founded_on: data.data.organization.founded_date,
        rank: data.data.organization.rank_company,
        number_of_employees_min: 0,
        number_of_employees_max: 0,
        twitter_url:
          data.data.organization.social_media.find(
            (s: { name: string; link: string }) => s.name === 'twitter'
          )?.link || '',
        linkedin_url:
          data.data.organization.social_media.find(
            (s: { name: string; link: string }) => s.name === 'linkedin'
          )?.link || '',
        facebook_url: '',
        number_of_investments: data.data.organization.num_investments,
      })
    );
  };

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        setError(null);

        const useBackend = process.env.NEXT_PUBLIC_CRUNCHBASE_API === 'true';

        if (useBackend) {
          const response = await fetch('/api/startups');
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);

          const data = await response.json();
          const transformedData = transformData(data);
          setStartupsData(transformedData);
          setFilteredStartups(transformedData);
        } else {
          const transformedData = transformData(localResponseData);
          setStartupsData(transformedData);
          setFilteredStartups(transformedData);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStartups(
      startupsData.filter((startup) =>
        startup.name.toLowerCase().includes(query)
      )
    );
  };

  const handleStartupClick = (startup: Startup) => {
    setSelectedStartup(startup); // Save the selected startup in the context
    router.push(`/dashboard/trending-startups/${startup.uuid}`);
  };

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 500 },
    { name: 'Mar', value: 300 },
    { name: 'Apr', value: 450 },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-50 border border-gray-300 rounded-lg">
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
        </div>
      </div>

      <div className="bg-white border border-zinc-300 p-2 rounded-lg shadow-sm">
        {loading ? (
          <p>Loading startups...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="flex flex-row gap-3 flex-wrap">
            {filteredStartups.length > 0 ? (
              filteredStartups.map((startup) => (
                <div
                  key={startup.uuid}
                  className="p-4 w-[320px] h-[500px] border rounded-md bg-white hover:bg-gray-100 hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleStartupClick(startup)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold">{startup.name}</h3>
                      <p className="text-sm text-gray-500">{startup.short_description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{startup.city}, {startup.country}</p>
                  <div className="mt-4 h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#4F81BD" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No startups found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Startups;
