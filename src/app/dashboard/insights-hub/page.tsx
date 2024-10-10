"use client";
import React, { useState } from "react";
import { useHub } from "@/context/HubContext";
import { useProductContext } from "@/context/ProductContext";

export default function InsightHub() {
  const { hubItems } = useHub();
  const { productItems } = useProductContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [showMoreHub, setShowMoreHub] = useState(false);
  const [showMoreProduct, setShowMoreProduct] = useState(false);

  // Handle Search, Sort, and Filter
  const handleSearch = (items, term) =>
    items.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );

  const handleSort = (items, key) =>
    [...items].sort((a, b) => (a[key] > b[key] ? 1 : -1));

  const handleFilter = (items, category) =>
    category ? items.filter((item) => item.category === category) : items;

  // Processed Hub Items
  const processedHubItems = handleSort(
    handleFilter(handleSearch(hubItems, searchTerm), filterBy),
    sortBy
  );

  // Processed Product Items
  const processedProductItems = handleSort(
    handleFilter(handleSearch(productItems, searchTerm), filterBy),
    sortBy
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  {/* Header Section */}
  <section className="mb-10">
    <h1 className="text-4xl font-bold text-gray-800">Insight Hub</h1>
  </section>

  {/* Search, Sort, and Filter Options */}
  <section className="flex items-center gap-4 mb-6">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
    />
    <select
      onChange={(e) => setSortBy(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
    >
      <option value="">Sort By</option>
      <option value="title">Title</option>
      <option value="volume">Volume</option>
    </select>
    <select
      onChange={(e) => setFilterBy(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
    >
      <option value="">Filter By Category</option>
      <option value="Tech">Tech</option>
      <option value="Health">Health</option>
      <option value="Finance">Finance</option>
    </select>
  </section>

  {/* Trending Startups Section */}
  <section className="mb-12">
    <h2 className="text-3xl font-semibold text-gray-700 mb-6">Trending Startups</h2>
    <div className="flex flex-wrap gap-6">
      {processedHubItems.slice(0, 3).map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-6 w-80">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-lg text-gray-600">{item.volume}</p>
          <p className="text-lg text-gray-600">{item.totalFunding}</p>
          <p className="text-lg text-gray-600">{item.latestRound}</p>
          <p className="text-lg text-gray-600">{item.employees}</p>
          <p className="text-lg text-gray-600">{item.category}</p>
          <p className="text-lg text-gray-600">{item.location}</p>
          <p className="text-lg text-gray-600">{item.growth}</p>
          <p className="text-lg text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
    <button
      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
      onClick={() => setShowMoreHub(true)}
    >
      See More
    </button>

    {/* Overlay for "See More" in Trending Startups */}
    {showMoreHub && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
          <button
            className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
            onClick={() => setShowMoreHub(false)}
          >
            &times;
          </button>
          <div className="grid grid-cols-2 gap-6">
            {processedHubItems.map((item) => (
              <div key={item.id} className="border border-gray-300 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-lg text-gray-600">{item.volume}</p>
                <p className="text-lg text-gray-600">{item.totalFunding}</p>
                <p className="text-lg text-gray-600">{item.latestRound}</p>
                <p className="text-lg text-gray-600">{item.employees}</p>
                <p className="text-lg text-gray-600">{item.category}</p>
                <p className="text-lg text-gray-600">{item.location}</p>
                <p className="text-lg text-gray-600">{item.growth}</p>
                <p className="text-lg text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </section>

  {/* Product Discover Section */}
  <section>
    <h2 className="text-3xl font-semibold text-gray-700 mb-6">Product Discover</h2>
    <div className="flex flex-wrap gap-6">
      {processedProductItems.slice(0, 3).map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-6 w-80">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-lg text-gray-600">
            <strong>Growth:</strong> {product.growth}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Sales Volume:</strong> {product.salesVolume}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Total Revenue:</strong> {product.totalRevenue}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Latest Version:</strong> {product.latestVersion}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Stock:</strong> {product.stock}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Categories:</strong> {product.categories.join(', ')}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Location:</strong> {product.location}
          </p>
        </div>
      ))}
    </div>
    <button
      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
      onClick={() => setShowMoreProduct(true)}
    >
      See More
    </button>

    {/* Overlay for "See More" in Product Discover */}
    {showMoreProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
          <button
            className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
            onClick={() => setShowMoreProduct(false)}
          >
            &times;
          </button>
          <div className="grid grid-cols-2 gap-6">
            {processedProductItems.map((product) => (
              <div key={product.id} className="border border-gray-300 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-lg text-gray-600">{product.description}</p>
                <p className="text-lg text-gray-600">
                  <strong>Growth:</strong> {product.growth}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Sales Volume:</strong> {product.salesVolume}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Total Revenue:</strong> {product.totalRevenue}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Latest Version:</strong> {product.latestVersion}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Categories:</strong> {product.categories.join(', ')}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Location:</strong> {product.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </section>
</div>

  );
}
