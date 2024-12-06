'use client';


import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'next/navigation';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Channel = {
  name: string;
  percentage: number;
};

type KeyIndicator = {
  name: string;
  value: number;
};

type RelatedTrend = {
  name: string;
  growth: number;
  labels: string[];
  data: number[];
};

type ProductData = {
  volumeData: number[];
  volume: number;
  growth: number;
  channels: Channel[];
  keyIndicators: KeyIndicator[];
  aboutTopic: string;
  relatedTrends: RelatedTrend[];
};

interface CompanyInsightsProps {
  companyName: string;
  data: ProductData;
}

const CompanyInsightsPage = () => {
  const params = useParams();
  const subcategory = params?.subcategory;
  const company = params?.company;

  const mockData: ProductData = {
    volumeData: [100, 200, 300, 400, 500, 600],
    volume: 5000,
    growth: 10,
    channels: [
      { name: 'Online', percentage: 60 },
      { name: 'Retail', percentage: 30 },
      { name: 'Wholesale', percentage: 10 },
    ],
    keyIndicators: [
      { name: 'Sales', value: 80 },
      { name: 'Customer Satisfaction', value: 90 },
    ],
    aboutTopic: 'This topic focuses on the growth trends in technology products.',
    relatedTrends: [
      {
        name: 'Trend A',
        growth: 20,
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        data: [10, 20, 30, 40],
      },
      {
        name: 'Trend B',
        growth: 15,
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        data: [15, 25, 35, 45],
      },
    ],
  };

  const data = mockData;

  if (!subcategory || !company) {
    return <div>Loading...</div>;
  }

  const volumeChartData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Volume',
        data: data.volumeData,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const channelChartData = {
    labels: data.channels.map((channel: Channel) => channel.name),
    datasets: [
      {
        label: 'Channel Breakdown',
        data: data.channels.map((channel: Channel) => channel.percentage),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Mock data for the trends
  const trends = [
    { name: 'OpenAI', growth: '+10%', growthColor: 'text-green-500', volume: '74K' },
    { name: 'Microsoft Cooperation', growth: '-10%', growthColor: 'text-red-500', volume: '74K' },
    { name: 'OpenAI', growth: '+10%', growthColor: 'text-green-500', volume: '74K' },
    { name: 'Microsoft Cooperation', growth: '-10%', growthColor: 'text-red-500', volume: '74K' },
    { name: 'OpenAI', growth: '+10%', growthColor: 'text-green-500', volume: '74K' },
    { name: 'Microsoft Cooperation', growth: '-10%', growthColor: 'text-red-500', volume: '74K' },
  ];

  // Mock chart data for the line graph
  const chartData = [
    { value: 0.5 },
    { value: 0.6 },
    { value: 0.7 },
    { value: 0.6 },
    { value: 0.8 },
    { value: 0.7 },
    { value: 0.9 },
  ];


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8 overflow-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full max-w-[1280px] mb-6">
        <div>
          <h1 className="text-2xl  text-gray-900">Shopping Bags</h1>
          <p className="text-sm text-gray-600">AI-driven insights and performance metrics</p>
        </div>
        <div className="flex  items-center gap-4">
          <span className="text-xl  text-green-600">5.5K</span>
          <span className="text-lg text-green-600">+15% Growth</span>
        </div>
      </div>

      {/* Main Chart */}
      <div className="w-full max-w-[1280px] bg-white rounded-lg shadow p-6 mb-8">
        <Line data={volumeChartData}  />
      </div>

      {/* Indicators and Subcharts */}
      <div className="w-full max-w-[1280px] grid grid-cols-3 gap-4 mb-8">
        {/* Key Indicators */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Key Indicators</h2>
          <div className="space-y-4">
            {['Growth', 'Seasonality', 'Speed', 'Volatility'].map((indicator, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{indicator}</span>
                  <span className="text-sm text-gray-600">{(index + 1) * 20}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    style={{ width: `${(index + 1) * 20}%` }}
                    className="bg-blue-600 h-2 rounded-full"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Channels</h2>
          <Bar
            data={{
              labels: ['LinkedIn', 'Instagram', 'Facebook', 'Reddit', 'YouTube', 'Pinterest', 'TikTok'],
              datasets: [
                {
                  label: 'Engagement',
                  data: [60, 45, 50, 30, 20, 10, 35],
                  backgroundColor: '#3b82f6',
                },
              ],
            }}
            options={chartOptions}
          />
        </div>

        {/* About Section */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">About the Topic</h2>
          <p className="text-gray-600">
            This section provides AI-driven insights into the growth of shopping bag trends. It focuses on volume,
            channels, and related trends shaping the market.
          </p>
        </div>
      </div>

      {/* Related Trends */}
      <div className="w-full max-w-[1280px]">
        <h2 className="text-lg font-medium mb-4">Related Trends:</h2>
        <div className="grid grid-cols-3 gap-4">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              {/* Placeholder for an icon */}
              <div className="w-10 h-10 bg-gray-200 rounded-md"></div>

              {/* Trend Info */}
              <div className="flex flex-col items-start flex-grow mx-4">
                <span className="text-sm font-medium text-gray-800">{trend.name}</span>
                <span className={`text-sm  ${trend.growthColor}`}>{trend.growth}</span>
                <span className="text-sm text-gray-500">{trend.volume}</span>
              </div>

              {/* Mini Line Chart */}
              <div className="w-24 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyInsightsPage;
