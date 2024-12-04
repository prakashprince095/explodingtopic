'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import Image from 'next/image';
import { useStartup } from '@/context/StartupContext';
import localResponseData from '@/data/response.json';
import Features from './Features';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(217, 91%, 60%)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(217, 91%, 75%)",
  },
};

const Startups = () => {
  const [startupsData, setStartupsData] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setSelectedStartup } = useStartup();

  const transformData = (data: any): Startup[] => {
    return data.data.organization.similar_companies.map(
      (company: any, index: number): Startup => ({
        uuid: company.url.split('/').pop() || `${index}`,
        name: company.name,
        short_description: data.data.organization.about,
        description: data.data.organization.full_description,
        web: company.url,
        city: data.data.organization.locations.find((loc: { location_type: string; value: string }) => loc.location_type === 'city')?.value || '',
        region: data.data.organization.locations.find((loc: { location_type: string; value: string }) => loc.location_type === 'region')?.value || '',
        country: data.data.organization.locations.find((loc: { location_type: string; value: string }) => loc.location_type === 'country')?.value || '',
        founded_on: data.data.organization.founded_date,
        rank: data.data.organization.rank_company,
        number_of_employees_min: 0,
        number_of_employees_max: 0,
        twitter_url: data.data.organization.social_media.find((s: { name: string; link: string }) => s.name === 'twitter')?.link || '',
        linkedin_url: data.data.organization.social_media.find((s: { name: string; link: string }) => s.name === 'linkedin')?.link || '',
        facebook_url: '',
        number_of_investments: data.data.organization.num_investments,
      })
    );
  };

  const fetchData = async () => {
    const backendUrl = '';
    console.log("Sending request to backend with:", { url: backendUrl});
  
    try {
      const response = await fetch(backendUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }
  
      const data = await response.json(); 
      return transformData(data); 
    } catch (err) {
      console.error("Backend fetch failed, falling back to local data:", err);
      return transformData(localResponseData);
    }
  };
  
  
  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchData();
        setStartupsData(data);
        setFilteredStartups(data);
      } catch (err) {
        setError("Failed to fetch startup data.");
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
    setSelectedStartup(startup);
    router.push(`/dashboard/trending-startups/${startup.uuid}`);
  };

  const generateChartData = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    return months.map(month => ({
      month,
      desktop: Math.floor(Math.random() * 300) + 50,
      mobile: Math.floor(Math.random() * 200) + 50
    }));
  };
  return (
    <div className="p-3 min-h-screen bg-[#FAFAFA] border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl ">Trending Startups</h2>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Search Startups"
            value={searchQuery}
            onChange={handleSearch}
            className="min-w-[300px]"
          />
        </div>
      </div>

      <Features />

      <div className="bg-card rounded-lg shadow-sm">
        {loading ? (
          <p className="p-4">Loading startups...</p>
        ) : error ? (
          <p className="p-4 text-destructive">Error: {error}</p>
        ) : (
          <div className="flex flex-wrap items-center justify-start gap-4 p-2">
            {filteredStartups.length > 0 ? (
              filteredStartups.map((startup) => (
                <Card key={startup.uuid} className="w-[300px] cursor-pointer hover:shadow-md transition" onClick={() => handleStartupClick(startup)}>
                  <CardHeader>
                    <div className='flex items-start  gap-2'>
                      <div className='bg-white rounded-md shadow-md h-[60px] w-[60px]'>

                      </div>
                      <div className='w-full'>
                        <CardTitle className='font-normal text-[18px]'>{startup.name}</CardTitle>
                        <div className='bg-black justify-self-end text-white p-1 text-[12px] rounded-full w-fit'>
                          Funding: $129B
                        </div>
                      </div>
                    </div>
                    <CardDescription className='text-[14px]'>{startup.short_description}</CardDescription>
                    <CardFooter className="flex justify-between items-center">
                      <div className='flex gap-3'>
                        <Image src='/startups/saved.svg' alt='' height={20} width={20}/>
                        <Image src='/startups/link.svg' alt='' height={20} width={20}/>
                        <Image src='/startups/share.svg' alt='' height={20} width={20}/>
                      </div>
                      <div className=" text-[14px]">
                        {startup.city}, {startup.country}
                      </div>
                    </CardFooter>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <LineChart
                        data={generateChartData()}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                          dataKey="desktop"
                          type="natural"
                          stroke="var(--color-desktop)"
                          strokeWidth={2}
                          dot={{
                            fill: "var(--color-desktop)",
                          }}
                          activeDot={{
                            r: 0,
                          }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">No startups found.</p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default Startups
