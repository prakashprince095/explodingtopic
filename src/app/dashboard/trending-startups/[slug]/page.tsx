'use client';
import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import { useStartup } from '@/context/StartupContext';

export interface Trend {
  name: string;
  growthRate: string;
  growthData: { idx: number; value: number }[];
}

interface RelatedStartup {
  id: number;  
  name: string;
  description: string;
  logo: string;
  growthRate: string;
}

interface Startup {
  title: string;
  description: string;
  foundedDate: string;
  employees: number;
  totalFunding: string;
  latestRound: string;
  location: string;
  website: string;
  socialPlatforms: string[];
  growthData: Array<{ index: number; value: number }>;
  keyIndicators?: Record<string, string>;
  channels?: Array<{ name: string; volume: number }>;
  category: string[];
  relatedTrends?: string[];
  relatedStartups?: RelatedStartup[];
}

type RelatedStartupsProps = {
  startups: RelatedStartup[];
};

type RelatedTrendsProps = {
  relatedTrends: Trend[];
  selectedTrend: Trend | null;
  setSelectedTrend: React.Dispatch<React.SetStateAction<Trend | null>>;
};


const StartupDetails = () => {
  const { selectedStartup } = useStartup();
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | '5Y'>('1Y');
  const [forecast, setForecast] = useState(false);
  const timeframes = ['1M', '3M', '6M', '1Y', '5Y'];
  const chartData = selectedStartup?.growthData?.map((value, index) => ({ index, value })) || [];

  if (!selectedStartup) {
    return <div className="p-8">No startup data found. Go back and select a startup.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-white border border-gray-300 rounded-lg">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl">{selectedStartup.title}</h1>
        <p className="text-gray-600 mt-2">{selectedStartup.description}</p>
      </div>

      {/* Detail Information */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg">Details</h3>
          <ul className="text-gray-700 space-y-2 mt-4">
            <li><strong className='font-normal'>Founded:</strong> {selectedStartup.foundedDate}</li>
            <li><strong className='font-normal'>Employees:</strong> {selectedStartup.employees}</li>
            <li><strong className='font-normal'>Total Funding:</strong> {selectedStartup.totalFunding}</li>
            <li><strong className='font-normal'>Latest Round:</strong> {selectedStartup.latestRound}</li>
            <li><strong className='font-normal'>Location:</strong> {selectedStartup.location}</li>
            <li><strong className='font-normal'>Website:</strong> <a href={selectedStartup.website} className="text-blue-500 underline">{selectedStartup.website}</a></li>
            <li><strong className='font-normal'>Social Platforms:</strong> {selectedStartup.socialPlatforms?.join(', ')}</li>
          </ul>
        </div>

        <div>
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg mb-4">Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                <XAxis dataKey="index" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between mt-4">
            <label>
              <span className="text-gray-500 mr-2">Timeframe:</span>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as '1M' | '3M' | '6M' | '1Y' | '5Y')}
                className="p-2 border border-gray-300 rounded"
              >
                {timeframes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center">
              <span className="text-gray-500 mr-2">Forecast:</span>
              <input
                type="checkbox"
                checked={forecast}
                onChange={() => setForecast(!forecast)}
                className="toggle-checkbox"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Key Indicators and Channels */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {/* Key Indicators */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h4 className="text-xl mb-2">Key Indicators</h4>
          {selectedStartup.keyIndicators && (
            <ul className="space-y-2 text-gray-600">
              {Object.entries(selectedStartup.keyIndicators).map(([key, value]) => (
                <li key={key}><strong className='font-normal'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Channels */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h4 className="text-xl mb-2">Channels</h4>
          <ul className="space-y-2">
            {selectedStartup.channels?.map((channel) => (
              <li key={channel.name} className="text-gray-600">
                {channel.name} <span className="text-blue-500 ml-2">{channel.volume}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h4 className="text-xl mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {selectedStartup.category.map((cat, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-500 p-1 rounded border border-blue-400">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Startups */}
      {selectedStartup.relatedStartups && selectedStartup.relatedStartups.length > 0 && (
        <RelatedStartups startups={selectedStartup.relatedStartups} />
      )}

      <RelatedTrends
        relatedTrends={selectedStartup?.relatedTrends || []}
        selectedTrend={selectedTrend}
        setSelectedTrend={setSelectedTrend}
      />
    </div>
  );
};

const RelatedStartups: React.FC<RelatedStartupsProps> = ({ startups }) => (
  <div className="mt-8">
    <h3 className="text-xl mb-4">Related Startups</h3>
    <div className="grid grid-cols-2 gap-4">
      {startups.map((related: RelatedStartup, index: number) => (
        <div key={`${related.id}-${index}`} className="p-4 border border-gray-300 rounded-lg flex items-center space-x-4">
          <Image
            src={related.logo || '/logos/1.svg'}
            alt={related.name}
            width={40}
            height={40}
            className="rounded-full"
            unoptimized
            onError={(e) => {
              e.currentTarget.src = '/logos/1.svg';
            }}
          />
          <div>
            <h4>{related.name}</h4>
            <p className="text-gray-600">{related.description}</p>
            <span className={related.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              Growth Rate: {related.growthRate}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function RelatedTrends({ relatedTrends, selectedTrend, setSelectedTrend }: RelatedTrendsProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl mb-4">Related Trends</h3>
      <div className="grid grid-cols-2 gap-4">
        {relatedTrends.map((trend: Trend, index: number) => (
          <div
            key={`${trend.name}-${index}`}
            onClick={() => setSelectedTrend(trend)}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <h4>{trend.name}</h4>
            <p className={trend.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {trend.growthRate}
            </p>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={trend.growthData.map((value, idx) => ({ idx, value }))}>
                <XAxis dataKey="idx" hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={trend.growthRate.startsWith('+') ? '#16a34a' : '#dc2626'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {selectedTrend && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[800px] max-w-lg relative">
            <h2 className="text-2xl mb-4">{selectedTrend.name}</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={selectedTrend.growthData.map((value, index) => ({ index, value }))}>
                <Line type="monotone" dataKey="value" stroke={selectedTrend.growthRate.startsWith('+') ? '#16a34a' : '#dc2626'} />
              </LineChart>
            </ResponsiveContainer>
            <button onClick={() => setSelectedTrend(null)} className="absolute top-4 right-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default StartupDetails;
