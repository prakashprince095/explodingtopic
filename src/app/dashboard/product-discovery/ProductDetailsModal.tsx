"use client";
import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import Image from "next/image";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip);

export type ProductSegment = {
  id: number;
  name: string;
  description: string;
  growth: string;
  salesVolume: string;
  totalRevenue: string;
  latestVersion: string;
  stock: string;
  categories: string[];
  location: string;
  imageUrl?: string;            // Property for product image
  avgRevenue?: string;          // Optional fields
  avgBSR?: string;
  avgPrice?: string;
  avgMonthlySales?: string;
  avgReviews?: string;          // Avg reviews added
  salesData?: number[];         // Sales data for graph
  topSellers?: {                // Array of top sellers
    id: number;
    logo: string;
    name: string;
    revenue: string;
    sales: string;
  }[];
  relatedProducts?: {           // Array of related products
    id: number;
    logo: string;
    name: string;
    price: string;
    avgRating: string;
  }[];
  keyIndicators?: {             // Key indicators for the product
    growth: string;
    speed: string;
    seasonality: string;
    volatility: string;
    sentiment: string;
  };
};


type ProductDetailModalProps = {
  product: ProductSegment;
  onClose: () => void;
};


type Trend = {
  name: string;
  growthRate: string;
  volume: string;
  salesData: number[];
};

type TrendPopupProps = {
  trend: Trend | null;
  onClose: () => void;
};

// Popup for displaying product trend details
const TrendPopup: React.FC<TrendPopupProps> = ({ trend, onClose }) => {
  if (!trend) return null;

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
        <h2 className="text-2xl mb-4">{trend.name}</h2>
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-xl">{trend.volume}</h3>
            <p className={`${trend.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {trend.growthRate}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <svg width="100%" height="100" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
            <polyline
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={trend.growthRate.startsWith('+') ? 'stroke-green-500' : 'stroke-red-500'}
              points={trend.salesData.join(' ') || ''}
            />
          </svg>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          Close
        </button>
      </div>
    </div>
  );
};

// Display related trends for products
const RelatedTrends: React.FC<{ trends: Trend[] }> = ({ trends }) => {
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  return (
    <>
      <h4 className="text-lg mb-4">Related Trends</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trends.map((trend, index) => (
          <div key={index} onClick={() => setSelectedTrend(trend)} className="border p-4 rounded-lg cursor-pointer">
            <h5>{trend.name}</h5>
            <p className={trend.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {trend.growthRate}
            </p>
          </div>
        ))}
      </div>
      {selectedTrend && <TrendPopup trend={selectedTrend} onClose={() => setSelectedTrend(null)} />}
    </>
  );
};

// Display top sellers for the product category
const TopSellers: React.FC<{ sellers: ProductSegment['topSellers'] }> = ({ sellers }) => {
  if (!sellers || sellers.length === 0) return <p>No top sellers available.</p>;

  return (
    <div>
      <h4 className="text-lg mb-4">Top Sellers</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((seller, index) => (
          <div key={index} className="border p-4 rounded-lg flex items-center space-x-4">
            <Image
              src={seller.logo}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h5 className="f">{seller.name}</h5>
              <p className="text-sm text-gray-600">Revenue: {seller.revenue}</p>
              <p className="text-sm text-gray-600">Sales: {seller.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Display related products
const RelatedProducts: React.FC<{ products: ProductSegment['relatedProducts'] }> = ({ products }) => {
  if (!products || products.length === 0) return <p>No related products available.</p>;

  return (
    <div>
      <h4 className="text-lg mb-4">Related Products</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg flex items-center space-x-4">
            <Image
              src={product.logo}
              alt={product.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h5 className="f">{product.name}</h5>
              <p className="text-sm text-gray-600">Price: {product.price}</p>
              <span className="text-yellow-500">{product.avgRating} ★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const timeframes = ['3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'];

// Function to generate chart data
const generateChartData = (data: number[], forecast: boolean) => {
  return {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Sales",
        data: data,
        borderColor: "#4B9CE2",
        fill: true,
        backgroundColor: "rgba(75, 156, 226, 0.2)",
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Forecast",
        data: forecast ? [null, null, null, null, 7.5] : [],
        borderColor: "#FFA500",
        fill: true,
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };
};


// Main ProductDetail component to display product details
const ProductDetail: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('5 Years');
  const [forecast, setForecast] = useState<boolean>(true);

  const salesData = product.salesData || [0, 2, 3, 4.5, 6.5];
  const chartData = generateChartData(salesData, forecast);
  const relatedTrends: Trend[] = [
    {
      name: 'Product X Demand',
      growthRate: '+1200%',
      volume: 'High Volume',
      salesData: [20, 40, 60, 80, 100],
    },
    {
      name: 'Product Y Interest',
      growthRate: '+450%',
      volume: 'Medium Volume',
      salesData: [10, 20, 40, 60, 80],
    },
    {
      name: 'Product Z Sales',
      growthRate: '+800%',
      volume: 'Low Volume',
      salesData: [5, 10, 20, 25, 30],
    },
  ];

  const mockTopSellers = [
    {
      id: 1,
      logo: "https://via.placeholder.com/50",
      name: "SellerOne",
      revenue: "$200K",
      sales: "500 units",
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/50",
      name: "BestDeals",
      revenue: "$350K",
      sales: "800 units",
    },
  ];

  const mockRelatedProducts = [
    {
      id: 1,
      logo: "https://via.placeholder.com/50",
      name: "Gadget X",
      price: "$199",
      avgRating: "4.5",
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/50",
      name: "Gadget Y",
      price: "$299",
      avgRating: "4.8",
    },
  ];

  return (
    <div className="absolute inset-0 bg-gray-50 p-6 overflow-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl mx-auto border border-gray-200">
        {/* First Section: Product Overview */}
        <div className="flex items-center justify-center gap-3">
          {/* Product Image */}
          <div className="w-[380px] h-[400px] rounded-lg bg-slate-100 p-3">
            <Image
              src={product.imageUrl || '/default-image.png'}  // Fallback image URL
              alt={product.name}
              className="w-full rounded-lg mb-4"
            />
            <h2 className="text-2xl f mb-2">{product.name}</h2>
            <p>{product.description}</p>
            <div className="mt-4">
              {product.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Avg metrics */}
          <div className="w-[380px] h-[400px] rounded-lg bg-slate-100 p-3">
            <h3 className="text-xl f mb-2">Metrics</h3>
            <ul>
              <li>Avg Revenue: {product.avgRevenue}</li>
              <li>Avg BSR: {product.avgBSR}</li>
              <li>Avg Price: {product.avgPrice}</li>
              <li>Avg Monthly Sales: {product.avgMonthlySales}</li>
              <li>Avg Reviews: {product.avgReviews}</li>
            </ul>
          </div>
          {/* Key Indicators */}

          <div className="w-[380px] h-[400px] rounded-lg bg-slate-100 p-3">
            <h4 className="text-lg f mb-2">Key Indicators</h4>
            <ul>
              <li>Growth: {product.keyIndicators?.growth}</li>
              <li>Speed: {product.keyIndicators?.speed}</li>
              <li>Seasonality: {product.keyIndicators?.seasonality}</li>
              <li>Volatility: {product.keyIndicators?.volatility}</li>
              <li>Sentiment: {product.keyIndicators?.sentiment}</li>
              <li>
                Forecast:{" "}
                <input
                  type="checkbox"
                  checked={forecast}
                  onChange={() => setForecast(!forecast)}
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Sales Volume Chart */}
        <div>
          <h3 className="text-xl f mb-4">Sales Volume</h3>
          <select
            className="mb-4 p-2 border border-gray-300 rounded-md"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option>5 Years</option>
            <option>4 Years</option>
            <option>3 Years</option>
            <option>2 Years</option>
            <option>1 Year</option>
          </select>
          <div>
            <Line
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: "black" },
                  },
                  x: {
                    ticks: { color: "black" },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 flex items-center">
            <label className="mr-2 text-gray-600">Include Forecast</label>
            <input
              type="checkbox"
              checked={forecast}
              onChange={() => setForecast(!forecast)}
              className="mr-4"
            />
          </div>
        </div>
        {/* Top Sellers */}
        <TopSellers sellers={mockTopSellers} />
        {/* Related Products */}
        <RelatedProducts products={mockRelatedProducts} />
        {/* Related Trends */}
        <RelatedTrends trends={relatedTrends} />
        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
