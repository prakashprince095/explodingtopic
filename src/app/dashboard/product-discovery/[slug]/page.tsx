'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { productsData } from "../page";
import { ProductSegment } from "@/types/interfaces";

type ProductDetail = {
  product: ProductSegment;
  onClose: () => void;
  params: { slug: string }; 
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

type SalesVolumeChartProps = {
  data: number[];
  forecast: boolean;
};

const TrendPopup: React.FC<TrendPopupProps> = ({ trend, onClose }) => {
  if (!trend) return null;

  return (
    <Dialog open={Boolean(trend)} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-6 shadow-lg max-w-lg">
        <DialogTitle className="text-2xl mb-4">{trend.name}</DialogTitle>
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-xl">{trend.volume}</h3>
            <p className={`${trend.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {trend.growthRate}
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trend.salesData.map((value, index) => ({ name: `Year ${index + 1}`, value }))}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <Line
              type="monotone"
              dataKey="value"
              stroke={trend.growthRate.startsWith('+') ? '#22c55e' : '#ef4444'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <Button variant="secondary" onClick={onClose} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const RelatedTrends: React.FC<{ trends: Trend[] }> = ({ trends }) => {
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  return (
    <>
      <h1 className="text-lg mb-4">Related Trends</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trends.map((trend, index) => (
          <div key={index} onClick={() => setSelectedTrend(trend)} className="border p-4 rounded-lg cursor-pointer">
            <h1>{trend.name}</h1>
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

const TopSellers: React.FC<{ sellers: ProductSegment['topSellers'] }> = ({ sellers }) => {
  if (!sellers || sellers.length === 0) return <p>No top sellers available.</p>;

  return (
    <div>
      <h1 className="text-lg mb-4">Top Sellers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((seller, index) => (
          <div key={index} className="border p-4 rounded-lg flex items-center space-x-4">
            <Image
              src={seller.logo}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover"
              width={20}
              height={20}
            />
            <div>
              <h1 className="f">{seller.name}</h1>
              <p className="text-sm text-gray-600">Revenue: {seller.revenue}</p>
              <p className="text-sm text-gray-600">Sales: {seller.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RelatedProducts: React.FC<{ products: ProductSegment['relatedProducts'] }> = ({ products }) => {
  if (!products || products.length === 0) return <p>No related products available.</p>;

  return (
    <div>
      <h1 className="text-lg mb-4">Related Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg flex items-center space-x-4">
            <Image
              src={product.logo}
              alt={product.name}
              className="w-12 h-12 rounded-full object-cover"
              width={20}
              height={20}
            />
            <div>
              <h1 className="f">{product.name}</h1>
              <p className="text-sm text-gray-600">Price: {product.price}</p>
              <span className="text-yellow-500">{product.avgRating} ★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SalesVolumeChart: React.FC<SalesVolumeChartProps> = ({ data, forecast }) => {
  const chartData = data.map((value, index) => ({
    name: `Year ${index + 1}`,
    value,
    forecastValue: forecast && index === data.length - 1 ? value * 1.15 : null,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <Line type="monotone" dataKey="value" stroke="#4B9CE2" strokeWidth={2} />
        {forecast && (
          <Line
            type="monotone"
            dataKey="forecastValue"
            stroke="#FFA500"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

const timeframes = ['3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'];

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

const ProductDetail: React.FC<ProductDetail> = ({ product, onClose, params }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('5 Years');
  const [forecast, setForecast] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductSegment | null>(null);

  useEffect(() => {
    async function fetchParams() {
      const paramsValue = await params;  // Unwrap params from the Promise
      if (paramsValue.slug) {
        const foundProduct = productsData.find((p) => p.name === paramsValue.slug);
        setSelectedProduct(foundProduct || null);
      }
    }
    fetchParams();
  }, [params]);  // No need to access params.slug directly in the dependency array

  const salesData = product?.salesData || [0, 2, 3, 4.5, 6.5];
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
      logo: "/logos/1.svg",
      name: "SellerOne",
      revenue: "$200K",
      sales: "500 units",
    },
    {
      id: 2,
      logo: "/logos/1.svg",
      name: "BestDeals",
      revenue: "$350K",
      sales: "800 units",
    },
  ];

  const mockRelatedProducts = [
    {
      id: 1,
      logo: "/logos/1.svg",
      name: "Gadget X",
      price: "$199",
      avgRating: "4.5",
    },
    {
      id: 2,
      logo: "/logos/1.svg",
      name: "Gadget Y",
      price: "$299",
      avgRating: "4.8",
    },
  ];

  return (
    <div className="fixed h-screen w-screen inset-0 bg-gray-50 p-6 overflow-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl mx-auto border border-gray-200">
        {/* First Section: Product Overview */}
        <div className="flex items-center justify-center gap-3">
          {/* Product Image */}
          <div className="w-[380px] h-[400px] rounded-lg bg-slate-100 p-3">
            <Image
              src={product?.imageUrl || '/logos/1.svg'}  // Fallback image URL
              alt={product?.name || 'Product image'}
              width={50}
              height={50}
            />

            <h2 className="text-2xl f mb-2">{product?.name}</h2>
            <p>{product?.description}</p>
            <div className="mt-4">
              {product?.categories.map((category, index) => (
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
              <li>Avg Revenue: {product?.avgRevenue}</li>
              <li>Avg BSR: {product?.avgBSR}</li>
              <li>Avg Price: {product?.avgPrice}</li>
              <li>Avg Monthly Sales: {product?.avgMonthlySales}</li>
              <li>Avg Reviews: {product?.avgReviews}</li>
            </ul>
          </div>
          {/* Key Indicators */}

          <div className="w-[380px] h-[400px] rounded-lg bg-slate-100 p-3">
            <h1 className="text-lg f mb-2">Key Indicators</h1>
            <ul>
              <li>Growth: {product?.keyIndicators?.growth}</li>
              <li>Speed: {product?.keyIndicators?.speed}</li>
              <li>Seasonality: {product?.keyIndicators?.seasonality}</li>
              <li>Volatility: {product?.keyIndicators?.volatility}</li>
              <li>Sentiment: {product?.keyIndicators?.sentiment}</li>
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
            <SalesVolumeChart data={salesData} forecast={forecast} />
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
        <Button onClick={onClose} className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;

