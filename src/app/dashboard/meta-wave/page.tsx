"use client"; // Ensure this component is treated as a client component
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js

interface MetaTrend {
  id: number;
  title: string;
  categoryTags: string[];
  contributingTrendsCount: number;
  growthIndicator: "up" | "stable" | "down";
  description: string;
}

export default function MetaWave() {
  const [selectedTrend, setSelectedTrend] = useState<MetaTrend | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");

  const metaTrends: MetaTrend[] = [
    {
      id: 1,
      title: "Sustainability Movement",
      categoryTags: ["Technology", "Retail"],
      contributingTrendsCount: 12,
      growthIndicator: "up",
      description: "A focus on sustainable business practices and eco-friendly solutions.",
    },
    {
      id: 2,
      title: "AI Revolution",
      categoryTags: ["Technology", "Healthcare"],
      contributingTrendsCount: 15,
      growthIndicator: "stable",
      description: "Rapid advancements in artificial intelligence across industries.",
    },
    {
      id: 3,
      title: "Automobile",
      categoryTags: ["Technology", "Vehicle"],
      contributingTrendsCount: 15,
      growthIndicator: "stable",
      description: "Rapid advancements in autonomous vehicle technologies.",
    },
  ];

  // Filtered Meta Trends based on search and filter category
  const filteredTrends = metaTrends.filter((trend) => {
    return (
      trend.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filterCategory || trend.categoryTags.includes(filterCategory))
    );
  });

  // Handle Trend Selection
  const handleTrendClick = (trend: MetaTrend) => {
    setSelectedTrend(trend);
  };

  // Line Chart Data and Options
  const lineChartData = {
    labels: ["2021", "2022", "2023", "2024", "2025"], // Example timeline
    datasets: [
      {
        label: selectedTrend?.title ?? "Meta Trend Growth",
        data: [20, 40, 60, 80, 100], // Example growth data
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Use one of the valid union types
      },
    },
  };
  
  // Contributing Trends (Dummy Data)
  const contributingTrends = [
    { name: "AI in Retail", category: "Retail", growthRate: "12%", impactScore: 8.5, lastUpdated: "Oct 2, 2024" },
    { name: "Autonomous Vehicles", category: "Automobile", growthRate: "15%", impactScore: 9.0, lastUpdated: "Oct 1, 2024" },
    { name: "Renewable Energy", category: "Energy", growthRate: "10%", impactScore: 7.5, lastUpdated: "Sep 30, 2024" },
  ];

  // Handle sorting for contributing trends
  const sortedContributingTrends = [...contributingTrends].sort((a, b) => {
    if (sortField === "growthRate") {
      return parseFloat(b.growthRate) - parseFloat(a.growthRate);
    } else if (sortField === "impactScore") {
      return b.impactScore - a.impactScore;
    }
    return 0;
  });

  // Save Meta Trend (Dummy Functionality)
  const saveMetaTrend = () => {
    alert("Meta Trend saved to your profile!");
  };

  // Share Meta Trend as PDF (Dummy Functionality)
  const shareAsPDF = () => {
    alert("Meta Trend exported as PDF!");
  };

  // Alerts for Meta Trend Changes (Dummy Functionality)
  const setupAlerts = () => {
    alert("Alerts set up for changes in this Meta Trend!");
  };

  // Export as CSV (Dummy Functionality)
  const exportCSV = () => {
    alert("Contributing trends exported as CSV!");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-4xl ">Meta Trends Overview</h1>
        <p className="text-gray-600 mt-2">Explore the emerging meta trends shaping industries across the globe.</p>
      </header>

      {/* Search and Filter Section */}
      <div className="flex space-x-4 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Meta Trends"
          className="p-2 border rounded-lg bg-transparent"
        />
        <select
          className="p-2 border rounded-lg bg-transparent"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Retail">Retail</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>

      {/* Meta Trend Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="  p-4 rounded-lg border border-gray-400  cursor-pointer"
            onClick={() => handleTrendClick(trend)}
          >
            <h3 className="text-xl font-semibold">{trend.title}</h3>
            <p className="text-gray-500">{trend.description}</p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-600">{trend.categoryTags.join(", ")}</span>
              <span className={`text-${trend.growthIndicator === "up" ? "green" : trend.growthIndicator === "stable" ? "yellow" : "red"}-500`}>
                {trend.growthIndicator === "up" ? "Growth" : trend.growthIndicator === "stable" ? "Stable" : "Decline"}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Meta Trend Overview */}
      {selectedTrend && (
        <section className="mt-8">
          <h2 className="text-3xl font-semibold">{selectedTrend.title} Overview</h2>
          <p className="text-gray-600 mt-2">{selectedTrend.description}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Key Metrics:</h3>
            <ul className="list-disc ml-6 mt-2">
              <li>Total Contributing Trends: {selectedTrend.contributingTrendsCount}</li>
              {/* More metrics can be added here */}
            </ul>
          </div>
        </section>
      )}

      {/* Contributing Trends Table */}
      {selectedTrend && (
        <section className="mt-8">
          <h3 className="text-2xl font-semibold">Contributing Trends</h3>
          <div className="flex justify-end mb-4">
            <button className="p-2 bg-white text-black rounded" onClick={exportCSV}>Export as CSV</button>
          </div>
          <table className="min-w-full border border-white mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 cursor-pointer" onClick={() => setSortField("name")}>Micro-Trend Name</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => setSortField("category")}>Category</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => setSortField("growthRate")}>Growth Rate</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => setSortField("impactScore")}>Impact Score</th>
                <th className="px-4 py-2">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sortedContributingTrends.map((trend, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{trend.name}</td>
                  <td className="border px-4 py-2 text-center">{trend.category}</td>
                  <td className="border px-4 py-2 text-center">{trend.growthRate}</td>
                  <td className="border px-4 py-2 text-center">{trend.impactScore}</td>
                  <td className="border px-4 py-2 text-center">{trend.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Meta Trend Growth Line Chart */}
      {selectedTrend && (
        <section className="mt-8">
          <h3 className="text-2xl font-semibold">Growth and Projection</h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </section>
      )}

      {/* Save and Share Options */}
      {selectedTrend && (
        <section className="mt-8">
          <div className="flex justify-between">
            <button className="bg-white text-black px-4 py-2 rounded-lg" onClick={saveMetaTrend}>
              Save Meta Trend
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-lg" onClick={shareAsPDF}>
              Share as PDF
            </button>
          </div>
        </section>
      )}

      {/* Alerts and Map Section */}
      {selectedTrend && (
        <>
          <section className="mt-8">
            <button className="bg-white text-black px-4 py-2 rounded-lg" onClick={setupAlerts}>
              Setup Alerts for Changes
            </button>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold">Geographical Breakdown</h3>
            {/* Placeholder for Interactive Map */}
            <div className=" h-64 mt-4 rounded-md flex items-center justify-center">
              <p>Map Placeholder</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
