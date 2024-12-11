'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import localResponseData from '@/data/response.json';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart} from "recharts";
type Startup = {
  uuid: string;
  name: string;
  short_description: string;
  city: string;
  country: string;
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
const StartupsCards = () => {
  const [startupsData, setStartupsData] = useState<Startup[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate fetching and transforming data
      const transformedData = localResponseData.data.organization.similar_companies.slice(0, 3).map(
        (company: any, index: number): Startup => ({
          uuid: company.url.split('/').pop() || `${index}`,
          name: company.name,
          short_description: localResponseData.data.organization.about || "No description available",
          city: localResponseData.data.organization.locations.find(
            (loc: { location_type: string; value: string }) => loc.location_type === 'city'
          )?.value || "Unknown city",
          country: localResponseData.data.organization.locations.find(
            (loc: { location_type: string; value: string }) => loc.location_type === 'country'
          )?.value || "Unknown country",
        })
      );
      setStartupsData(transformedData);
    } catch (err) {
      setError("Failed to load startup data.");
    }
  }, []);

  const generateChartData = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    return months.map(month => ({
      month,
      desktop: Math.floor(Math.random() * 300) + 50,
      mobile: Math.floor(Math.random() * 200) + 50
    }));
  };
  return (
      <div className=" flex flex-wrap items-center justify-center">
        {error ? (
          <p className="p-4 text-destructive">Error: {error}</p>
        ) : (
          <div className="flex flex-wrap items-center justify-start gap-4 p-2">
            {startupsData.length > 0 ? (
              startupsData.map((startup) => (
                <Card key={startup.uuid} className="w-[350px] cursor-pointer hover:shadow-md transition">
                  <CardHeader>
                    <div className='flex items-start  gap-2'>
                      <div className='bg-white rounded-md shadow-md h-[60px] border w-[80px]'>

                      </div>
                      <div className='w-full'>
                        <CardTitle className='font-normal text-[20px]'>{startup.name}</CardTitle>
                        <div className='bg-black justify-self-end text-white px-2 py-1 text-[14px] rounded-full w-fit'>
                          Funding: $129B
                        </div>
                      </div>
                    </div>
                    <CardDescription className='text-[16px]'>{startup.short_description}</CardDescription>
                    <CardFooter className="flex justify-between items-center">
                      <div className='flex gap-3'>
                        <Image src='/startups/link.svg' alt='' height={20} width={20} />
                        <Image src='/startups/share.svg' alt='' height={20} width={20} />
                      </div>
                      <div className=" text-[14px]">
                        {startup.city}, {startup.country}
                      </div>
                    </CardFooter>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <LineChart
                        width={300}
                        height={200}
                        data={generateChartData()}
                        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#f5f5f5" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="desktop"
                          stroke="hsl(217, 91%, 60%)"
                          fillOpacity={1}
                          fill="url(#colorDesktop)"
                          strokeWidth={2}
                          dot={{ r: 4, fill: "hsl(217, 91%, 60%)" }}
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
  );
};

export default StartupsCards;
