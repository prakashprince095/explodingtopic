"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import ProductDetailModal from "./ProductDetailsModal";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
const productsData: ProductSegment[] = [
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

  const toggleSaveProduct = (id: number) => {
    if (savedProducts.includes(id)) {
      setSavedProducts(savedProducts.filter((prodId) => prodId !== id));
    } else {
      setSavedProducts([...savedProducts, id]);
    }
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
    <div className="min-h-screen bg-white border border-gray-300 p-3 rounded-lg">
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
        <select
          value={filters.timeframe}
          onChange={(e) =>
            setFilters({ ...filters, timeframe: e.target.value })
          }
          className="border p-2 rounded bg-transparent min-w-[300px]"
        >
          <option value="1 Year">1 Year</option>
          <option value="5 Years">5 Years</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[300px]"
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Home">Home</option>
          {/* Add other categories */}
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[300px]"
        >
          <option value="All">All Locations</option>
          <option value="USA">USA</option>
          {/* Add other locations */}
        </select>

        {/* Add Growth, Sales Volume, etc. filters */}
        <select
          value={filters.growth}
          onChange={(e) => setFilters({ ...filters, growth: e.target.value })}
          className="border p-2 rounded bg-transparent min-w-[300px]"
        >
          <option value="All">All Growth Rates</option>
          <option value="Above 50%">Above 50%</option>
          <option value="Below 50%">Below 50%</option>
        </select>
      </div>

      {/* 3. Additional Filters */}
      <div className="flex items-center justify-end gap-3 my-4">
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 "
        >
          <Image
            src="/product/filter.svg"
            width={30}
            height={25}
            alt="Picture of the grid items"
          />
          <h1>Filter</h1>
        </button>

        <div className="my-4 flex gap-1 justify-end">
        <button
          onClick={() => setIsGridView(true)}
          className={`p-1  ${isGridView ? "bg-gray-200 rounded-md" : ""}`}
        >
          <Image
            src="/startups/grid.svg"
            width={30}
            height={25}
            alt="Picture of the grid items"
          />
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`p-1  ${!isGridView ? "bg-gray-200 rounded-md" : ""}`}
        >
          <Image
            src="/startups/list.svg"
            width={30}
            height={25}
            alt="Picture of the grid items"
          />
        </button>
      </div>

        <button
          onClick={exportToCSV}
        >
          <Image
            src="/product/export.svg"
            width={30}
            height={25}
            alt="Picture of the grid items"
          />
        </button>
      </div>

      <div className={isGridView ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "flex flex-col"}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg hover:shadow-lg transition-all cursor-pointer"
            onClick={() => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
          >
            <h3 className="text-xl ">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <div className="mt-2">
              <p>
                <strong>Growth:</strong> {product.growth}
              </p>
              <p>
                <strong>Sales Volume:</strong> {product.salesVolume}
              </p>
              <p>
                <strong>Total Revenue:</strong> {product.totalRevenue}
              </p>
              <p>
                <strong>Latest Version:</strong> {product.latestVersion}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
              <p>
                <strong>Categories:</strong> {product.categories.join(", ")}
              </p>
              <p>
                <strong>Location:</strong> {product.location}
              </p>
            </div>
            <div className="mt-4">{renderGrowthChart(product.growth)}</div>
            <Button
              onClick={() => handleAddToHub(product)}
            >
              Add to Hub
            </Button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}

    </div>
  );
}
