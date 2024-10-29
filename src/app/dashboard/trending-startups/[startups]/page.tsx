'use client';
import React, { useState } from 'react';
import { Segment } from '../page';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Image from 'next/image';

export type Startup = {
  title: string;
  description: string;
  foundedDate: string;
  employees: string;
  totalFunding: string;
  latestRound: string;
  location: string;
  website: string;
  socialPlatforms: string[];
  volume: string;
  growth: string;
  category: string[];
  channels?: { name: string; volume: number }[];
  keyIndicators?: {
    growth: string;
    speed: string;
    seasonality: string;
    volatility: string;
    sentiment: string;
    forecast: string;
  };
  relatedStartups?: {
    id: number;
    logo: string;
    name: string;
    description: string;
    growthRate: string;
  }[];
  growthData?: number[];
};

type StartupDetailProps = {
  startup: Segment;
  onClose: () => void;
};

type Trend = {
  name: string;
  growthRate: string;
  volume: string;
  growthData: number[];
};

type TrendPopupProps = {
  trend: Trend | null;
  onClose: () => void;
};

const TrendPopup: React.FC<TrendPopupProps> = ({ trend, onClose }) => {
  if (!trend) return null;

  return (
    <div className="fixed bg-gray-400 inset-0 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[800px] max-w-lg relative">
        <h2 className="text-2xl mb-4">{trend.name}</h2>
        <div className="flex justify-between mb-4">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl">{trend.volume}</h3>
            <p
              className={`${trend.growthRate.startsWith('+')
                ? 'text-green-500 text-[20px]'
                : 'text-red-500 text-[20px]'
                }`}
            >
              {trend.growthRate}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend.growthData.map((value, index) => ({ index, value }))}>
              <XAxis dataKey="index" hide />
              <YAxis hide />
              <Tooltip />
              <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="value"
                stroke={trend.growthRate.startsWith('+') ? '#16a34a' : '#dc2626'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RelatedTrends: React.FC<{ trends: Trend[] }> = ({ trends }) => {
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  return (
    <>
      <h4 className="text-xl mt-4">Related Trends</h4>
      <div className="flex flex-wrap h-fit gap-3">
        {trends.map((trend, index) => (
          <div
            key={index}
            onClick={() => setSelectedTrend(trend)}
            className="hover:bg-gray-100 transition-all bg-white flex items-center justify-between w-[600px] border p-4 rounded-md border-gray-400 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <h5 className="text-[20px]">{trend.name}</h5>
              <p
                className={
                  trend.growthRate.startsWith('+')
                    ? 'text-[20px] text-green-500'
                    : 'text-red-500 text-[20px]'
                }
              >
                {trend.growthRate}
              </p>
            </div>
            <div className="w-32 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend.growthData.map((value, idx) => ({ idx, value }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={trend.growthRate.startsWith('+') ? '#16a34a' : '#dc2626'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
      {selectedTrend && <TrendPopup trend={selectedTrend} onClose={() => setSelectedTrend(null)} />}
    </>
  );
};

const RelatedStartups: React.FC<{ startups: Startup['relatedStartups'] }> = ({ startups }) => {
  if (!startups || startups.length === 0)
    return <p>No related startups available.</p>;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8">
        {startups.map((related, index) => (
          <div
            key={index}
            className="border border-gray-400 hover:bg-gray-100 transition-all bg-white w-[380px] p-4 rounded-lg flex items-center space-x-4"
          >
            <Image
              src={related.logo || '/logos/1.svg'}
              alt={related.name}
              width={80}
              height={80}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h5 className="text-[18px]">{related.name}</h5>
              <p className="text-gray-600 text-[16px]">
                {related.description}
              </p>
              <span
                className={
                  related.growthRate.startsWith('+')
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {related.growthRate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const timeframes = ['3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'];

const mockGrowthData = {
  '3 Months': [
    { name: 'Jan', growth: 10 },
    { name: 'Feb', growth: 15 },
    { name: 'Mar', growth: 20 },
  ],
  '6 Months': [
    { name: 'Oct', growth: 8 },
    { name: 'Nov', growth: 12 },
    { name: 'Dec', growth: 14 },
    { name: 'Jan', growth: 10 },
    { name: 'Feb', growth: 15 },
    { name: 'Mar', growth: 20 },
  ],
  '1 Year': [
    { name: 'Apr', growth: 5 },
    { name: 'May', growth: 7 },
    { name: 'Jun', growth: 9 },
    { name: 'Jul', growth: 11 },
    { name: 'Aug', growth: 13 },
    { name: 'Sep', growth: 17 },
    { name: 'Oct', growth: 8 },
    { name: 'Nov', growth: 12 },
    { name: 'Dec', growth: 14 },
    { name: 'Jan', growth: 10 },
    { name: 'Feb', growth: 15 },
    { name: 'Mar', growth: 20 },
  ],
  '2 Year': [
    { name: 'Apr', growth: 6 },
    { name: 'May', growth: 7 },
    { name: 'Jun', growth: 8 },
    { name: 'Jul', growth: 11 },
    { name: 'Aug', growth: 23 },
    { name: 'Sep', growth: 27 },
    { name: 'Oct', growth: 22 },
    { name: 'Nov', growth: 2 },
    { name: 'Dec', growth: 34 },
    { name: 'Jan', growth: 20 },
    { name: 'Feb', growth: 25 },
    { name: 'Mar', growth: 10 },
  ], '3 Year': [
    { name: 'Apr', growth: 5 },
    { name: 'May', growth: 7 },
    { name: 'Jun', growth: 9 },
    { name: 'Jul', growth: 11 },
    { name: 'Aug', growth: 13 },
    { name: 'Sep', growth: 17 },
    { name: 'Oct', growth: 8 },
    { name: 'Nov', growth: 12 },
    { name: 'Dec', growth: 14 },
    { name: 'Jan', growth: 10 },
    { name: 'Feb', growth: 15 },
    { name: 'Mar', growth: 20 },
  ], '4 Year': [
    { name: 'Apr', growth: 5 },
    { name: 'May', growth: 7 },
    { name: 'Jun', growth: 9 },
    { name: 'Jul', growth: 11 },
    { name: 'Aug', growth: 13 },
    { name: 'Sep', growth: 17 },
    { name: 'Oct', growth: 8 },
    { name: 'Nov', growth: 12 },
    { name: 'Dec', growth: 14 },
    { name: 'Jan', growth: 10 },
    { name: 'Feb', growth: 15 },
    { name: 'Mar', growth: 20 },
  ], '5 Year': [
    { name: 'Apr', growth: 5 },
    { name: 'May', growth: 7 },
    { name: 'Jun', growth: 9 },
    { name: 'Jul', growth: 11 },
    { name: 'Aug', growth: 13 },
    { name: 'Sep', growth: 17 },
    { name: 'Oct', growth: 8 },
    { name: 'Nov', growth: 12 },
    { name: 'Dec', growth: 14 },
    { name: 'Jan', growth: 10 },
    { name: 'Feb', growth: 15 },
    { name: 'Mar', growth: 20 },
  ],
};

const StartupDetail: React.FC<StartupDetailProps> = ({ startup, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(timeframes[5]);
  const [forecast, setForecast] = useState<boolean>(true);

  if (!startup) {
    return <div className="text-center">Select a startup to view its details</div>;
  }

  const chartData = mockGrowthData[selectedTimeframe as keyof typeof mockGrowthData];

  const relatedTrends: Trend[] = [
    {
      name: 'Livekit Github',
      growthRate: '+3800%',
      volume: 'High Volume',
      growthData: [10, 20, 30, 40, 35, 50, 60],
    },
    {
      name: 'Livekit Webrtc',
      growthRate: '+8800%',
      volume: 'Medium Volume',
      growthData: [20, 30, 40, 60, 80, 90, 100],
    },
    {
      name: 'Livekit React',
      growthRate: '+6400%',
      volume: 'Low Volume',
      growthData: [5, 10, 15, 20, 25, 30],
    },
    {
      name: 'Livekit Github',
      growthRate: '+3800%',
      volume: 'High Volume',
      growthData: [10, 20, 30, 40, 35, 50, 60],
    },
    {
      name: 'Livekit Webrtc',
      growthRate: '+8800%',
      volume: 'Medium Volume',
      growthData: [20, 30, 40, 60, 80, 90, 100],
    },
    {
      name: 'Livekit React',
      growthRate: '+6400%',
      volume: 'Low Volume',
      growthData: [5, 10, 15, 20, 25, 30],
    },
    // Add more trends as needed
  ];

  const mockRelatedStartups = [
    {
      id: 1,
      logo: "",
      name: "InnovateX",
      description: "Pioneers in cloud computing technology.",
      growthRate: "+75%",
    },
    {
      id: 2,
      logo: "",
      name: "AI Wonders",
      description: "Cutting-edge AI for medical applications.",
      growthRate: "+50%",
    },
    {
      id: 3,
      logo: "",
      name: "NextGen Robotics",
      description: "Innovative robotics for industrial automation.",
      growthRate: "+90%",
    },
    {
      id: 1,
      logo: "",
      name: "InnovateX",
      description: "Pioneers in cloud computing technology.",
      growthRate: "+75%",
    },
    {
      id: 2,
      logo: "",
      name: "AI Wonders",
      description: "Cutting-edge AI for medical applications.",
      growthRate: "+50%",
    },
    {
      id: 3,
      logo: "",
      name: "NextGen Robotics",
      description: "Innovative robotics for industrial automation.",
      growthRate: "+90%",
    },
  ];

  return (
    <div className="fixed w-screen h-full inset-0 bg-white p-6 overflow-auto">
      <div className="bg-gray-50 max-w-[1280px] rounded-lg p-5  mx-auto border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl  text-gray-800 mb-4">{startup.title}</h2>
            <ul className=" flex flex-wrap justify-evenly items-center gap-3 text-gray-600">
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>Founded Date:</h1> <h2 className='text-[20px] text-black py-2'>2020</h2></li>
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>No. of Employees:</h1> <h2 className='text-[20px] text-black py-2'>100+</h2></li>
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>Total Funding:</h1> <h2 className='text-[20px] text-black py-2'>$50M</h2></li>
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>Latest Round:</h1> <h2 className='text-[20px] text-black py-2'>Series B</h2></li>
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>Location:</h1> <h2 className='text-[20px] text-black py-2'>San Francisco, CA</h2></li>
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>Website:</h1> <h2 className='text-[20px] text-black py-2'><a href="#" className="text-blue-500 underline">startupwebsite.com</a></h2></li>
              <li className='text-gray-500 text-sm bg-white rounded-md border border-gray-300 p-2 text-center'><h1>Social Platforms:</h1> <h2 className='text-[20px] text-black py-2'>Twitter, LinkedIn</h2></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl  text-gray-700">+12.3%</h3>
                <p className="text-sm text-green-500">Growth</p>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center space-x-2">
                <label htmlFor="timeframe" className="text-sm text-gray-600">Timeframe:</label>
                <select
                  id="timeframe"
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  {timeframes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Forecast Toggle */}
              <div className="flex items-center space-x-2">
                <label htmlFor="forecast" className="text-sm text-gray-600">Forecast:</label>
                <input
                  id="forecast"
                  type="checkbox"
                  checked={forecast}
                  onChange={() => setForecast(!forecast)}
                  className="toggle-checkbox"
                />
              </div>
            </div>

            <div className="h-[500px] bg-white w-full border border-gray-400 rounded-lg shadow-inner p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                  <YAxis tick={{ fill: '#4B5563' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ddd' }} />
                  <Line type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>


        {/* Channel Breakdown Section */}
        <div className="flex flex-wrap gap-3 items-center justify-evenly py-5 w-full">
          <div className='p-3 h-[400px] w-[380px] bg-white border border-gray-400 rounded-lg'>
            <h4 className="text-[20px]  text-gray-700 mb-4">Channel Breakdown</h4>
            <ul>
              <li className="flex flex-col w-full mb-5">
                <span className="text-gray-600">TikTok </span>
                <div className="w-full h-2 bg-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-[#2563EB]" style={{ width: '60%' }}></div>
                </div>
              </li>
              <li className="flex flex-col w-full mb-5">
                <span className="text-gray-600">Youtube</span>
                <div className="w-full h-2 bg-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-[#2563EB]" style={{ width: '30%' }}></div>
                </div>
              </li>
              <li className="flex flex-col w-full mb-5">
                <span className="text-gray-600">Website</span>
                <div className="w-full h-2 bg-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-[#2563EB]" style={{ width: '70%' }}></div>
                </div>
              </li>
              <li className="flex flex-col w-full mb-5">
                <span className="text-gray-600">Facebook</span>
                <div className="w-full h-2 bg-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-[#2563EB]" style={{ width: '50%' }}></div>
                </div>
              </li>
              <li className="flex flex-col w-full mb-5">
                <span className="text-gray-600">Instagram</span>
                <div className="w-full h-2 bg-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-[#2563EB]" style={{ width: '40%' }}></div>
                </div>
              </li>
              <li className="flex flex-col w-full mb-5">
                <span className="text-gray-600">Reddit</span>
                <div className="w-full h-2 bg-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-[#2563EB]" style={{ width: '60%' }}></div>
                </div>
              </li>
            </ul>
          </div>

          <div className='p-3 h-[400px] w-[380px] bg-white border border-gray-400 rounded-lg'>
            <h4 className="text-[20px]  text-gray-700 mb-2">Key Indicators</h4>
            <ul className='flex flex-col gap-3'>
              <li className=''><span className='text-[16px] text-gray-600'>Growth:</span> <h1 className='text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm'>Exploding</h1></li>
              <li className=''><span className='text-[16px] text-gray-600'>Volatility:</span><h1 className='text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm'>Positive</h1> </li>
              <li className=''><span className='text-[16px] text-gray-600'>Speed:</span> <h1 className='text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm'>Eponential</h1></li>
              <li className=''><span className='text-[16px] text-gray-600'>Seasonality:</span> <h1 className='text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm'>Low</h1></li>
              <li className=''><span className='text-[16px] text-gray-600'>Forecast:</span> <h1 className='text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm'>Positive</h1></li>
            </ul>
          </div>

          <div className='p-3 h-[400px] w-[380px] bg-white border border-gray-400 rounded-lg'>
            <h4 className="text-[20px]  text-gray-700 mb-4">Categories</h4>
            <div className="flex  flex-wrap gap-2">
              <span className="text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm">Technology</span>
              <span className="text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm">Finance</span>
              <span className="text-[#2563EB] bg-blue-100 p-1 w-fit border border-blue-400 rounded-sm">Health care</span>
            </div>
          </div>
        </div>

        <div>
          {/* Related Startups Section */}
          {startup.relatedStartups && startup.relatedStartups.length > 0 ? (
            <RelatedStartups startups={startup.relatedStartups} />
          ) : (
            <RelatedStartups startups={mockRelatedStartups} />
          )}
          <RelatedTrends trends={relatedTrends} />
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
