'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import Image from 'next/image';

type RelatedStartup = {
  id: number;
  logo: string;
  name: string;
  description: string;
  growthRate: string;
};

type KeyIndicators = {
  growth: string;
  speed: string;
  seasonality: string;
  volatility: string;
  sentiment: string;
  forecast: string;
};

type Trend = {
  name: string;
  growthRate: string;
  volume: string;
  growthData: number[];
};

type Startup = {
  id: number;
  title: string;
  description: string;
  foundedDate: string;
  website: string;
  socialPlatforms: string[];
  growth: string;
  volume: string;
  totalFunding: string;
  latestRound: string;
  employees: string;
  category: string[];
  location: string;
  growthData?: number[];
  relatedStartups?: RelatedStartup[];
  channels?: { name: string; volume: number }[];
  keyIndicators?: KeyIndicators;
};

// Sample Data
const startupsData: Startup[] = [
  {
    id: 1,
    title: 'DocuClipper',
    description: 'OCR software for document management.',
    foundedDate: '2020-01-01',
    website: 'https://docuclipper.com',
    socialPlatforms: ['Twitter', 'LinkedIn'],
    growth: '+99%',
    volume: '4.4K',
    totalFunding: 'Undisclosed',
    latestRound: 'Bootstrapped',
    employees: '1-10',
    category: ['Business', 'Technology', 'Finance'],
    location: 'USA',
    growthData: [120, 150, 180, 210, 250, 300],
    keyIndicators: {
      growth: 'High',
      speed: 'Fast',
      seasonality: 'Low',
      volatility: 'Medium',
      sentiment: 'Positive',
      forecast: 'Stable',
    },
    relatedStartups: [
      {
        id: 1,
        logo: '/default-logo.png',
        name: 'Startup A',
        description: 'Related business in tech',
        growthRate: '+60%',
      },
      {
        id: 2,
        logo: '/default-logo.png',
        name: 'Startup B',
        description: 'Complementary industry player',
        growthRate: '+20%',
      },
    ],
  },
];

// Related Trends Data
const relatedTrends: Trend[] = [
  {
    name: 'Livekit Github',
    growthRate: '+3800%',
    volume: 'High Volume',
    growthData: [10, 20, 30, 40, 35, 50, 60],
  },
  {
    name: 'Livekit Github',
    growthRate: '+3800%',
    volume: 'High Volume',
    growthData: [10, 20, 30, 40, 35, 50, 60],
  },
  {
    name: 'Livekit Github',
    growthRate: '+3800%',
    volume: 'High Volume',
    growthData: [10, 20, 30, 40, 35, 50, 60],
  },
];

const relatedStartupsData: RelatedStartup[] = [
  {
    id: 1,
    logo: '/path-to-logo1.png', // Replace with actual image paths
    name: 'StartUp One',
    description: 'Innovative solution for business automation.',
    growthRate: '+25%',
  },
  {
    id: 2,
    logo: '/path-to-logo2.png', // Replace with actual image paths
    name: 'StartUp Two',
    description: 'AI-driven analytics for market insights.',
    growthRate: '+40%',
  },
  {
    id: 3,
    logo: '/path-to-logo3.png', // Replace with actual image paths
    name: 'StartUp Three',
    description: 'Revolutionizing communication with tech.',
    growthRate: '+15%',
  },
];

const timeframes = ['3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'];

function RelatedStartups({ startups }: { startups: RelatedStartup[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl  mb-4">Related Startups</h3>
      <div className="grid grid-cols-2 gap-4">
        {startups.map((related, index) => (
          <div key={`${related.id}-${index}`} className="p-4 border border-gray-300 rounded-lg flex items-center space-x-4">
            <Image src={related.logo || '/default-logo.png'} alt={related.name} width={40} height={40} className="rounded-full" />
            <div>
              <h4 className="">{related.name}</h4>
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
}

export default function StartupDetail() {
  const { slug } = useParams();
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('5 Years');
  const [forecast, setForecast] = useState<boolean>(true);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [startup, setStartup] = useState<Startup | undefined>(undefined);

  useEffect(() => {
    // Ensure slug is a string before proceeding
    if (typeof slug === 'string') {
      const startupId = parseInt(slug);
      const foundStartup = startupsData.find((s) => s.id === startupId);
      setStartup(foundStartup);
    }
  }, [slug]);

  if (!startup) {
    return <p className="p-8 text-red-500">Startup not found</p>;
  }

  const chartData = startup.growthData?.map((value, index) => ({ index, value })) || [];

  return (
    <div className="min-h-screen p-6 bg-white border border-gray-300 rounded-lg">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl ">{startup.title}</h1>
        <p className="text-gray-600 mt-2">{startup.description}</p>
      </div>

      {/* Detail Information */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg ">Details</h3>
          <ul className="text-gray-700 space-y-2 mt-4">
            <li><strong className='font-normal'>Founded:</strong> {startup.foundedDate}</li>
            <li><strong className='font-normal'>Employees:</strong> {startup.employees}</li>
            <li><strong className='font-normal'>Total Funding:</strong> {startup.totalFunding}</li>
            <li><strong className='font-normal'>Latest Round:</strong> {startup.latestRound}</li>
            <li><strong className='font-normal'>Location:</strong> {startup.location}</li>
            <li><strong className='font-normal'>Website:</strong> <a href={startup.website} className="text-blue-500 underline">{startup.website}</a></li>
            <li><strong className='font-normal'>Social Platforms:</strong> {startup.socialPlatforms.join(', ')}</li>
          </ul>
        </div>

        {/* Growth Chart */}
        <div>
          {/* Growth Chart with ShadCN Styling */}
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
                onChange={(e) => setSelectedTimeframe(e.target.value)}
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
          <h4 className="text-xl  mb-2">Key Indicators</h4>
          {startup.keyIndicators && (
            <ul className="space-y-2 text-gray-600">
              <li><strong className='font-normal'>Growth:</strong> {startup.keyIndicators.growth}</li>
              <li><strong className='font-normal'>Speed:</strong> {startup.keyIndicators.speed}</li>
              <li><strong className='font-normal'>Seasonality:</strong> {startup.keyIndicators.seasonality}</li>
              <li><strong className='font-normal'>Volatility:</strong> {startup.keyIndicators.volatility}</li>
              <li><strong className='font-normal'>Sentiment:</strong> {startup.keyIndicators.sentiment}</li>
              <li><strong className='font-normal'>Forecast:</strong> {startup.keyIndicators.forecast}</li>
            </ul>
          )}
        </div>

        {/* Channels */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h4 className="text-xl  mb-2">Channels</h4>
          <ul className="space-y-2">
            {startup.channels?.map((channel) => (
              <li key={channel.name} className="text-gray-600">
                {channel.name} <span className="text-blue-500 ml-2">{channel.volume}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h4 className="text-xl  mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {startup.category.map((cat, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-500 p-1 rounded border border-blue-400">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Startups */}
      {startup.relatedStartups && startup.relatedStartups.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl  mb-4">Related Startups</h3>
          <div className="grid grid-cols-2 gap-4">
            {startup.relatedStartups.map((related, index) => (
              <div key={`${related.id}-${index}`} className="p-4 border border-gray-300 rounded-lg flex items-center space-x-4">
                <Image
                  src={related.logo || '/default-logo.png'}
                  alt={related.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="">{related.name}</h4>
                  <p className="text-gray-600">{related.description}</p>
                  <span className={related.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    Growth Rate: {related.growthRate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Trends */}
      <div className="mt-8">
        <h3 className="text-xl  mb-4">Related Trends</h3>
        <div className="grid grid-cols-2 gap-4">
            {relatedTrends.map((trend, index) => (
              <div
                key={`${trend.name}-${index}`}
                onClick={() => setSelectedTrend(trend)}
                className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <h4 className="">{trend.name}</h4>
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
              <button onClick={() => setSelectedTrend(null)} className="absolute top-2 right-2 text-gray-500 hover:text-black">Close</button>
            </div>
          </div>
        )}
      </div>

      {/* Related startups */}
      <div>
        {startup.relatedStartups && startup.relatedStartups.length > 0 && (
          <RelatedStartups startups={startup.relatedStartups} />
        )}
      </div>
    </div>
  );
}
