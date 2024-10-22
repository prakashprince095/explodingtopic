'use client'

import React, { useState } from "react";
import { useHub } from "@/context/HubContext";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import appwriteService from "@/appwrite/config";


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
  const [hubPage, setHubPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const hubItemsPerPage = 4;
  const productItemsPerPage = 3;
  const { hubItems }: { hubItems: HubItem[] } = useHub();
  const { productItems }: { productItems: ProductItem[] } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [showMoreHub, setShowMoreHub] = useState(false);
  const [showMoreProduct, setShowMoreProduct] = useState(false);

  const paginateHubItems = (items: HubItem[], page: number) => {
    const start = (page - 1) * hubItemsPerPage;
    return items.slice(start, start + hubItemsPerPage);
  };

  const paginateProductItems = (items: ProductItem[], page: number) => {
    const start = (page - 1) * productItemsPerPage;
    return items.slice(start, start + productItemsPerPage);
  };

  const handleSearchHub = (items: HubItem[], term: string) => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const saveHubItem = async (hubItem: HubItem) => {
    const currentUser = await appwriteService.getCurrentUser();
    if (currentUser) {
      await appwriteService.saveHubItem(currentUser.$id, hubItem);
      alert('Hub Item saved successfully!');
    } else {
      alert('User not logged in.');
    }
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

  const saveProductItem = async (productItem: ProductItem) => {
    const currentUser = await appwriteService.getCurrentUser();
    if (currentUser) {
      await appwriteService.saveProductItem(currentUser.$id, productItem);
      alert('Product Item saved successfully!');
    } else {
      alert('User not logged in.');
    }
  };

  const exportToCSV = (items: any[], filename: string) => {
    const csvContent = "data:text/csv;charset=utf-8," +
      items.map((item) => Object.values(item).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const handleMultiSortHub = (items: HubItem[], keys: (keyof HubItem)[]) => {
    return [...items].sort((a, b) => {
      for (let key of keys) {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
      }
      return 0;
    });
  };
  

  return (
    <div className=" min-h-screen bg-white p-4 rounded-lg">
      {/* Header Section */}
      <header className="flex flex-row items-center justify-between rounded-lg">
        <section className="mb-5">
          <h1 className="text-2xl font-normal ">Insight Hub</h1>
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
          <Button onClick={() => { setSearchTerm(''); setFilterBy(''); setSortBy(''); }}>
            Clear Filters
          </Button>
          <Button onClick={() => exportToCSV(processedHubItems, "hub_data")}>Export Hub Data</Button>
          <Button onClick={() => exportToCSV(processedProductItems, "product_data")}>Export Product Data</Button>

        </section>
      </header>
      {/* Trending Startups Section */}
      <section className="min-h-[500px] flex flex-col justify-between mb-12 p-3 rounded-lg bg-slate-100">
        <h2 className="text-xl  text-gray-700 mb-3">Trending Startups</h2>
        <div className="flex flex-wrap gap-6">
          {processedHubItems.slice(0, 4).map((item) => (
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
          className="w-fit mt-3"
          onClick={() => setShowMoreHub(true)}
        >
          See More
        </Button>

        {/* Overlay for "See More" in Trending Startups */}
        {showMoreHub && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
              <Button
                className="absolute top-2 right-2 text-2xl text-black"
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
              <div className="flex justify-end">
                <Button onClick={() => setHubPage(hubPage - 1)} disabled={hubPage === 1}>
                  Previous
                </Button>
                <Button onClick={() => setHubPage(hubPage + 1)} disabled={hubPage * hubItemsPerPage >= processedHubItems.length}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Product Discover Section */}
      <section className="min-h-[500px] flex flex-col justify-between mb-12 p-3 rounded-lg bg-slate-100">
        <h2 className="text-xl  text-gray-700 mb-6">Product Discover</h2>
        <div className="flex flex-wrap gap-6">
          {processedProductItems.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-6 w-80">
              <h3 className="text-2xl text-gray-800 mb-2">{product.name}</h3>
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
              <Button onClick={() => saveProductItem(product)}>Save Product</Button>
            </div>
          ))}
        </div>
        <Button
          className="w-fit mt-3"
          onClick={() => setShowMoreProduct(true)}
        >
          See More
        </Button>

        {/* Overlay for "See More" in Product Discover */}
        {showMoreProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
              <Button
                className="absolute top-2 right-2 text-2xl text-black"
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
              <div className="flex justify-end">
                <Button onClick={() => setHubPage(hubPage - 1)} disabled={hubPage === 1}>
                  Previous
                </Button>
                <Button onClick={() => setHubPage(hubPage + 1)} disabled={hubPage * hubItemsPerPage >= processedHubItems.length}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default InsightHub;
