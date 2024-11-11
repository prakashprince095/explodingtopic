'use client';

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

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

const CompanyInsights: React.FC<CompanyInsightsProps> = ({ companyName, data }) => {
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
    labels: data.channels.map(channel => channel.name),
    datasets: [
      {
        label: 'Channel Breakdown',
        data: data.channels.map(channel => channel.percentage),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const keyIndicatorBars = data.keyIndicators.map((indicator) => ({
    label: indicator.name,
    data: [indicator.value],
    backgroundColor: '#2563eb',
  }));

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="absolute inset-0 bg-gray-50 flex flex-col items-center p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl text-black">{companyName}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl text-[#10b981]">{data.volume}</span>
          <span className="text-lg text-[#10b981]">+{data.growth}% Growth</span>
        </div>
      </div>

      <div className="w-[1280px]  h-[800px]">
        <div className="col-span-2 bg-white mb-4  rounded-lg p-6">
          <Line data={volumeChartData} options={chartOptions} />
        </div>
      </div>

      <div className="w-full flex max-w-[1280px] items-center justify-center gap-4 mb-8">
        <div className="bg-white  rounded-lg p-6 w-[400px] h-[400px]">
          <h3 className="text-lg  mb-4">Channel Breakdown</h3>
          <Bar data={channelChartData} options={chartOptions} />
        </div>
        <div className="bg-white  rounded-lg p-6 w-[400px] h-[400px]">
          <h3 className="text-lg  mb-4">Key Indicators</h3>
          {data.keyIndicators.map((indicator, index) => (
            <div key={index} className="mb-4 w-full">
              <div className="flex justify-between">
                <span className="text-gray-600">{indicator.name}</span>
                <span className="text-gray-600">{indicator.value}</span>
              </div>
              <div className="w-[300px] bg-gray-200 rounded-full h-2">
                <div style={{ width: `${indicator.value}%` }} className="bg-blue-600 h-2 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        <div className=" col-span-2 bg-white  rounded-lg p-6 w-[400px] h-[400px]">
          <h3 className="text-lg  mb-4">About the Topic</h3>
          <p className="text-gray-600">{data.aboutTopic}</p>
        </div>
      </div>

      <div className="max-w-[1280px] rounded-lg">
        <h3 className="text-lg  mb-4">Related Trends</h3>
        <div className="flex items-center gap-4 max-w-[1280px] rounded-lg ">
          {data.relatedTrends.map((trend, index) => (
            <div key={index} className="gap-2 flex flex-col bg-white items-start justify-between w-[400px] h-[300px] p-4 border-b last:border-b-0">
              <div>
                <h4 className="">{trend.name}</h4>
                <p className="text-sm text-gray-900">+{trend.growth}% Growth</p>
              </div>
              <div className=" h-[300px]">
                <Line
                  data={{
                    labels: trend.labels,
                    datasets: [
                      {
                        label: trend.name,
                        data: trend.data,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyInsights;
