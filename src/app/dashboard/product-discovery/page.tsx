"use client";

import { useState, useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ProductDetail from "./[slug]/page";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// Types for product segments
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
};

// Initial data for product segments
export const productsData: ProductSegment[] = [
  {
    id: 1,
    name: "EcoWidget",
    description: "Eco-friendly gadget that saves energy at home.",
    growth: "+50%",
    salesVolume: "15K",
    totalRevenue: "$1M",
    latestVersion: "2.1",
    stock: "Available",
    categories: ["Home", "Technology", "Eco-friendly"],
    location: "USA",
  },
  {
    id: 2,
    name: "SmartKettle",
    description: "Bluetooth-enabled kettle that can be controlled via app.",
    growth: "+25%",
    salesVolume: "7K",
    totalRevenue: "$500K",
    latestVersion: "1.5",
    stock: "Limited",
    categories: ["Kitchen", "Technology", "Home"],
    location: "UK",
  },

  {
    id: 3,
    name: "AirPurify",
    description: "Portable air purifier with HEPA filters.",
    growth: "+70%",
    salesVolume: "20K",
    totalRevenue: "$2M",
    latestVersion: "3.2",
    stock: "Out of Stock",
    categories: ["Health", "Technology", "Home"],
    location: "Germany",
  },
  {
    id: 4,
    name: "GameStation",
    description: "Next-gen gaming console with 8K graphics support.",
    growth: "+90%",
    salesVolume: "50K",
    totalRevenue: "$10M",
    latestVersion: "4.0",
    stock: "Available",
    categories: ["Entertainment", "Technology", "Gaming"],
    location: "Japan",
  },
  {
    id: 5,
    name: "FitBand Pro",
    description: "Fitness tracker with heart rate and sleep monitoring.",
    growth: "+40%",
    salesVolume: "30K",
    totalRevenue: "$3M",
    latestVersion: "5.1",
    stock: "Available",
    categories: ["Health", "Fitness", "Technology"],
    location: "USA",
  },
  {
    id: 6,
    name: "PhotoSnapper",
    description: "Compact digital camera with 4K video recording.",
    growth: "+35%",
    salesVolume: "10K",
    totalRevenue: "$1.5M",
    latestVersion: "6.0",
    stock: "Limited",
    categories: ["Photography", "Technology", "Lifestyle"],
    location: "France",
  },
];

export default function TrendingProducts() {
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search functionality
  const [isGridView, setIsGridView] = useState<boolean>(true); // Toggle between grid and column view
  const [filters, setFilters] = useState({
    timeframe: "1 Year",
    category: "All",
    growth: "All",
    salesVolume: "All",
    totalRevenue: "All",
    stock: "All",
    location: "All",
  });
  const { addProductToHub } = useProductContext();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSegment | null>(null);

  const handleAddToHub = (product: ProductSegment) => {
    addProductToHub(product);
  };

  const applyFilters = (product: ProductSegment) => {
    const matchesCategory =
      filters.category === "All" || product.categories.includes(filters.category);
    const matchesLocation =
      filters.location === "All" || product.location === filters.location;
    return matchesCategory && matchesLocation;
  };



  const sortProducts = (products: ProductSegment[]) => {
    if (!sortBy) return products;
    return products.sort((a, b) => {
      let valA = a[sortBy as keyof ProductSegment];
      let valB = b[sortBy as keyof ProductSegment];
      if (sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  };

  const filteredProducts = sortProducts(
    productsData
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(applyFilters)
  );

  const clearFilters = () => {
    setFilters({
      timeframe: "1 Year",
      category: "All",
      growth: "All",
      salesVolume: "All",
      totalRevenue: "All",
      stock: "All",
      location: "All",
    });
  };

  const exportToCSV = () => {
    let csvContent =
      "Product Name,Growth,Sales Volume,Total Revenue,Latest Version,Stock,Categories,Location\n";
    filteredProducts.forEach((product) => {
      const row = [
        product.name,
        product.growth,
        product.salesVolume,
        product.totalRevenue,
        product.latestVersion,
        product.stock,
        product.categories.join(", "),
        product.location,
      ].join(",");
      csvContent += row + "\n";
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "trending_products.csv");
  };

  const getGrowthColor = (growth: string) => {
    return growth.startsWith("+") ? "stroke-green-500" : "stroke-red-500";
  };

  const renderGrowthChart = (growth: string) => {
    return (
      <svg
        width="100"
        height="30"
        viewBox="0 0 100 30"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-2"
      >
        <polyline
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={getGrowthColor(growth)}
          points={
            growth.startsWith("+")
              ? "0,30 20,15 40,10 60,5 80,0 100,5"
              : "0,5 20,10 40,15 60,20 80,25 100,30"
          }
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen  p-6 bg-slate-50 border border-gray-300 rounded-lg">
      {/* 1. Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl ">Trending Products</h2>
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-sm min-w-[400px] border-gray-400 bg-transparent"
        />
      </div>

      {/* 2. Filter Options */}
      <div className="flex items-center gap-3">
        <Select>
          <SelectTrigger className="w-[150px] shadow-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Business">Socials</SelectItem>
              <SelectItem value="Business">Beauty</SelectItem>
              <SelectItem value="Business">HealthCare</SelectItem>
              <SelectItem value="Business">Finance</SelectItem>
              <SelectItem value="Business">Food</SelectItem>
              <SelectItem value="Business">HealthCare</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] shadow-sm">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="category">USA</SelectItem>
              <SelectItem value="volume">Canada</SelectItem>
              <SelectItem value="volume">India</SelectItem>
              <SelectItem value="volume">China</SelectItem>
              <SelectItem value="volume">UK</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="category">Name</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="volume">Profits</SelectItem>
              <SelectItem value="volume">Loss</SelectItem>
              <SelectItem value="volume">Searches</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] shadow-sm">
            <SelectValue placeholder="TimeFrame" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="category">3 months</SelectItem>
              <SelectItem value="volume">6 months</SelectItem>
              <SelectItem value="volume">1 year</SelectItem>
              <SelectItem value="volume">2 year</SelectItem>
              <SelectItem value="volume">3 year</SelectItem>
              <SelectItem value="volume">4 year</SelectItem>
              <SelectItem value="volume">5 year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] shadow-sm">
            <SelectValue placeholder="Total Funding" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="category">USA</SelectItem>
              <SelectItem value="volume">Canada</SelectItem>
              <SelectItem value="volume">India</SelectItem>
              <SelectItem value="volume">China</SelectItem>
              <SelectItem value="volume">UK</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] shadow-sm">
            <SelectValue placeholder="No of employees" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="category">1-25</SelectItem>
              <SelectItem value="volume">25-50</SelectItem>
              <SelectItem value="volume">50-100</SelectItem>
              <SelectItem value="volume">100-1000</SelectItem>
              <SelectItem value="volume">1000-5000</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 3. Additional Filters */}
      <div className="flex items-center justify-end gap-4 my-4">
        <Button
          onClick={clearFilters}
          className="flex items-center gap-2 "
        >
          <Image
            src="/product/filter.svg"
            width={20}
            height={25}
            alt="Picture of the grid items"
          />
          <h1>Filter</h1>
        </Button>

        <div className="flex border border-gray-400 p-1 rounded-sm">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-1 ${isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
          >
            <Image
              src="/startups/grid.svg"
              width={20}
              height={25}
              alt="Grid View"
              className={isGridView ? 'filter invert' : ''}
            />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-1 ${!isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
          >
            <Image
              src="/startups/list.svg"
              width={20}
              height={25}
              alt="List View"
              className={!isGridView ? 'filter invert' : ''}
            />
          </button>

        </div>

        <Button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg"
        >
          <Image
            src="/product/export.svg"
            width={20}
            height={25}
            alt="Picture of the grid items"

          />
          <h1>Export</h1>
        </Button>
      </div>
      <div className='bg-white overflow-auto h-screen border border-zinc-300 p-2 rounded-lg shadow-sm '>
        <div className={`${isGridView ? 'flex flex-row gap-3 flex-wrap' : 'flex flex-col w-full gap-4'}`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-md bg-gray-100 hover:shadow-lg transition cursor-pointer"
            >
              <Link href={`/dashboard/product-discovery/${product.name}`} key={product.id}>
                <div onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}>
                  <h3 className="text-xl ">{product.name}</h3>
                  <p className="text-gray-500">{product.description}</p>
                  <div className="mt-2">
                    <h1>
                      <p>Growth:</p> <p>{product.growth}</p>
                    </h1>
                    <h1>
                      <p>Sales Volume:</p><p> {product.salesVolume}</p>
                    </h1>
                    <h1>
                      <p>Total Revenue:</p><p> {product.totalRevenue}</p>
                    </h1>
                    <h1>
                      <p>Latest Version:</p><p> {product.latestVersion}</p>
                    </h1>
                    <h1>
                      <p>Stock:</p> <p>{product.stock}</p>
                    </h1>
                    <h1>
                      <p>Categories:</p><p> {product.categories.join(", ")}</p>
                    </h1>
                    <h1>
                      <p>Location:</p> <p>{product.location}</p>
                    </h1>
                  </div>
                  <div className="mt-4">{renderGrowthChart(product.growth)}</div>
                </div>
              </Link>
              <Button
                onClick={() => handleAddToHub(product)}
              >
                Add to Hub
              </Button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          params={{ slug: selectedProduct?.name || '' }}  // Pass params here
        />
      )}

    </div>
  );
}
