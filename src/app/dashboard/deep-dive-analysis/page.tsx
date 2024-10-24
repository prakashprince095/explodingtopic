"use client";

import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";

type Data = {
  volume: string;
  growth: string;
  chartData: number[];
  channels: {
    linkedin: number;
    tiktok: number;
    youtube: number;
    instagram: number;
    facebook: number;
  };
  relatedTrends: {
    topic: string;
    growth: string;
    volume: string;
    trendData: number[];
  }[];
};

const mockData: Data = {
  volume: "83.1M",
  growth: "+1043%",
  chartData: [70, 75, 80, 83, 85],
  channels: {
    linkedin: 30,
    tiktok: 100,
    youtube: 50,
    instagram: 70,
    facebook: 60,
  },
  relatedTrends: [
    { topic: "TikTok Mashup 2024", growth: "+99%", volume: "27.1K", trendData: [15, 20, 30, 35, 45] },
    { topic: "TikTok Mashup 2024 Clean", growth: "+99%", volume: "1.3K", trendData: [5, 8, 10, 12, 15] },
    { topic: "TikTok Rizz Party", growth: "+309%", volume: "40.5K", trendData: [30, 45, 60, 80, 100] },
    { topic: "TikTok Dances 2024", growth: "+99%", volume: "9.9K", trendData: [10, 15, 20, 25, 30] },
    { topic: "TikTok TikTok", growth: "+82%", volume: "165K", trendData: [60, 70, 85, 90, 95] }
  ],
};

const DeepAnalytics = () => {
  const [data, setData] = useState<Data | null>(null);
  const [country, setCountry] = useState("");
  const options = countryList().getData();

  const handleSearch = () => {
    setData(mockData); // Set mock data when search is clicked
  };

  const lineChartData: ChartData<"line"> = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Volume Growth",
        data: data?.chartData || [],
        fill: true,
        borderColor: "#2563EB",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  const miniChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: { borderWidth: 1 },
      point: { radius: 0 },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-white border border-gray-300 p-3 rounded-lg">
      {/* Search Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 border rounded-lg focus:outline-none"
          />
          <Select
            options={options}
            onChange={(value) => setCountry(value?.label || "")}
            placeholder="Worldwide"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* Data Overlay */}
      {data && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full top-0 left-0 absolute ">
          <div className="flex justify-between mb-8">
            <div className="flex-1">
              <div className="h-60">
                <Line data={lineChartData} options={chartOptions} />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold">
                  Volume: {data.volume} | Growth: {data.growth}
                </h3>
              </div>
            </div>
            <div className="flex-1 ml-8">
              <h4 className="font-bold mb-4">Channel Breakdown</h4>
              <ul className="space-y-2">
                {Object.entries(data.channels).map(([key, value]) => (
                  <li key={key} className="flex items-center">
                    <span className="flex-1 capitalize">{key}</span>
                    <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Trends Section */}
          <div>
            <h4 className="font-bold mb-4">Related Trends</h4>
            <table className="w-full bg-gray-100 rounded-lg">
              <thead>
                <tr className="bg-blue-200 text-left">
                  <th className="p-3">Topic</th>
                  <th className="p-3">Growth</th>
                  <th className="p-3">Volume</th>
                  <th className="p-3">Track</th>
                </tr>
              </thead>
              <tbody>
                {data.relatedTrends.map((trend, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 flex items-center justify-between"><h1>{trend.topic}</h1>
                    <div className="w-40 h-20">
                        <Line
                          data={{
                            labels: trend.trendData,
                            datasets: [
                              {
                                data: trend.trendData,
                                borderColor: "#2563EB",
                                fill: false,
                              },
                            ],
                          }}
                          options={miniChartOptions}
                        />
                      </div>
                    </td>
                    <td className="p-3">{trend.growth}</td>
                    <td className="p-3">{trend.volume}</td>
                    <td className="p-3 flex items-center">
                      
                      <button className="ml-3 bg-green-500 text-white px-3 py-1 rounded-lg">
                        Track Topic
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeepAnalytics;
