'use client'

import React, { useState } from "react";
import { useHub } from "@/context/HubContext";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/Button";

interface HubItem {
  id: number;
  title: string;
  volume: string;
  totalFunding: string;
  latestRound: string;
  employees: string;
  category: string[];
  location: string;
  growth: string;
  description: string;
}

interface ProductItem {
  id: number;
  name: string;
  description: string;
  growth: string;
  salesVolume: string;
  totalRevenue: string;
  latestVersion: string;
  stock: string;
  categories: string[];  // Consistent with HubItem category
  location: string;
}

const InsightHub: React.FC = () => {
  const { hubItems }: { hubItems: HubItem[] } = useHub();
  const { productItems }: { productItems: ProductItem[] } = useProductContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [showMoreHub, setShowMoreHub] = useState(false);
  const [showMoreProduct, setShowMoreProduct] = useState(false);

  const handleSearchHub = (items: HubItem[], term: string) => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearchProduct = (items: ProductItem[], term: string) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSortHub = (items: HubItem[], key: keyof HubItem) =>
    [...items].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      return aValue > bValue ? 1 : -1;
    });

  const handleSortProduct = (items: ProductItem[], key: keyof ProductItem) =>
    [...items].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      return aValue > bValue ? 1 : -1;
    });

  const handleFilterHub = (items: HubItem[], category: string) =>
    category
      ? items.filter((item) => item.category.includes(category))
      : items;

  const handleFilterProduct = (items: ProductItem[], category: string) =>
    category
      ? items.filter((item) => item.categories.includes(category))
      : items;

  const processedHubItems = handleSortHub(
    handleFilterHub(handleSearchHub(hubItems, searchTerm), filterBy),
    "category"
  );

  const processedProductItems = handleSortProduct(
    handleFilterProduct(handleSearchProduct(productItems, searchTerm), filterBy),
    "categories"
  );

  return (
    <div className=" min-h-screen">
      {/* Header Section */}
      <section className="mb-5">
        <h1 className="text-2xl font-normal text-black">Insight Hub</h1>
      </section>

      {/* Search, Sort, and Filter Options */}
      <section className="flex items-center gap-4 mb-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg  transition-shadow"
        />
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg transition-shadow"
        >
          <option value="">Sort By</option>
          <option value="category">Category</option>
        </select>
        <select
          onChange={(e) => setFilterBy(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg transition-shadow"
        >
          <option value="">Filter By Category</option>
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>
      </section>

      {/* Trending Startups Section */}
      <section className="mb-12">
        <h2 className="text-xl  text-gray-700 mb-6">Trending Startups</h2>
        <div className="flex flex-wrap gap-6">
          {processedHubItems.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-6 w-80">
              <h3 className="text-xl text-black mb-2">{item.title}</h3>
              <p className="text-lg text-black">{item.volume}</p>
              <p className="text-lg text-black">{item.totalFunding}</p>
              <p className="text-lg text-black">{item.latestRound}</p>
              <p className="text-lg text-black">{item.employees}</p>
              <p className="text-lg text-black">{item.category.join(", ")}</p>
              <p className="text-lg text-black">{item.location}</p>
              <p className="text-lg text-black">{item.growth}</p>
              <p className="text-lg text-black">{item.description}</p>
            </div>
          ))}
        </div>
        
        <Button
          className="bg-green-600"
          onClick={() => setShowMoreHub(true)}
        >
          See More
        </Button>

        {/* Overlay for "See More" in Trending Startups */}
        {showMoreHub && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
              <Button
                className="absolute top-2 right-2 text-2xl font-bold text-black"
                onClick={() => setShowMoreHub(false)}
              >
                &times;
              </Button>
              <div className="grid grid-cols-2 gap-6">
                {processedHubItems.map((item) => (
                  <div key={item.id} className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-xl text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-lg text-black">{item.volume}</p>
                    <p className="text-lg text-black">{item.totalFunding}</p>
                    <p className="text-lg text-black">{item.latestRound}</p>
                    <p className="text-lg text-black">{item.employees}</p>
                    <p className="text-lg text-black">{item.category.join(", ")}</p>
                    <p className="text-lg text-black">{item.location}</p>
                    <p className="text-lg text-black">{item.growth}</p>
                    <p className="text-lg text-black">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Product Discover Section */}
      <section>
        <h2 className="text-xl  text-gray-700 mb-6">Product Discover</h2>
        <div className="flex flex-wrap gap-6">
          {processedProductItems.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-6 w-80">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-lg text-black">{product.description}</p>
              <p className="text-lg text-black">
                {product.categories.join(", ")}
              </p>
              <p className="text-lg text-black">{product.location}</p>
              <p className="text-lg text-black">{product.growth}</p>
              <p className="text-lg text-black">{product.salesVolume}</p>
              <p className="text-lg text-black">{product.totalRevenue}</p>
              <p className="text-lg text-black">{product.latestVersion}</p>
              <p className="text-lg text-black">{product.stock}</p>
            </div>
          ))}
        </div>
        <Button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          onClick={() => setShowMoreProduct(true)}
        >
          See More
        </Button>

        {/* Overlay for "See More" in Product Discover */}
        {showMoreProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
              <Button
                className="absolute top-2 right-2 text-2xl font-bold text-black"
                onClick={() => setShowMoreProduct(false)}
              >
                &times;
              </Button>
              <div className="grid grid-cols-2 gap-6">
                {processedProductItems.map((product) => (
                  <div key={product.id} className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-xl  text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-lg text-black">{product.description}</p>
                    <p className="text-lg text-black">{product.categories.join(", ")}</p>
                    <p className="text-lg text-black">{product.location}</p>
                    <p className="text-lg text-black">{product.growth}</p>
                    <p className="text-lg text-black">{product.salesVolume}</p>
                    <p className="text-lg text-black">{product.totalRevenue}</p>
                    <p className="text-lg text-black">{product.latestVersion}</p>
                    <p className="text-lg text-black">{product.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default InsightHub;
