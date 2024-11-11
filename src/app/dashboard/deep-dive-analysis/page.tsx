"use client";

import React, { useState } from "react";
import countryList from "react-select-country-list";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button";


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
    <div className="h-screen bg-white border border-gray-300 p-3 rounded-lg">
      {/* Search Section */}
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="bg-white border border-gray-200 rounded-lg w-full max-w-3xl p-3 mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-[500px] p-1  rounded-md border border-gray-400 focus:outline-none"
            />
            <Select onValueChange={(value) => setCountry(value)}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Worldwide" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Data Overlay */}
      {data && (
        <div className="bg-slate-100 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg w-full  top-0 left-0 absolute ">
          <div className="flex justify-center mb-8 h-[400px]">
            <div className="bg-white flex flex-col items-start p-3 w-[600px] rounded-lg shadow-md">
              <div className="text-center mt-4">
                <h3 className="text-xl ">
                  Volume: {data.volume} | Growth: {data.growth}
                </h3>
              </div>
              <div className="w-[500px] h-[300px]">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white ml-8 w-[600px] h-[400px] p-3 rounded-lg shadow-md">
              <h4 className=" mb-4 text-xl">Channel Breakdown</h4>
              <ul className="space-y-2">
                {Object.entries(data.channels).map(([key, value]) => (
                  <li key={key} className="flex items-center">
                    <span className="flex-1 capitalize">{key}</span>
                    <div className="w-[500px] bg-gray-200 rounded-full h-2 ml-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Related Trends Section */}
          <div className="bg-white p-3 shadow-md rounded-md w-[1280px]">
            <h4 className="text-xl mb-4">Related Trends</h4>
            <table className="w-[1200px]  rounded-lg">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-3 font-normal">Topic</th>
                  <th className="p-3 font-normal">Growth</th>
                  <th className="p-3 font-normal">Volume</th>
                  <th className="p-3 font-normal">Track</th>
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
