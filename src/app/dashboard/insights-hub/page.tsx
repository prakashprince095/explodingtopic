'use client'

import React, { useState, useEffect } from "react";
import { useHub } from "@/context/HubContext";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  isFavorite?: boolean;
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
  categories: string[];
  location: string;
  isFavorite?: boolean;
}

const InsightHub: React.FC = () => {
  const { hubItems = [] }: { hubItems?: HubItem[] } = useHub();
  const { productItems = [] }: { productItems?: ProductItem[] } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [showMoreHub, setShowMoreHub] = useState(false);
  const [showMoreProduct, setShowMoreProduct] = useState(false);
  const [favoriteHubItems, setFavoriteHubItems] = useState<HubItem[]>([]);
  const [favoriteProductItems, setFavoriteProductItems] = useState<ProductItem[]>([]);
  const [recentlyViewedHubItems, setRecentlyViewedHubItems] = useState<HubItem[]>([]);
  const [recentlyViewedProductItems, setRecentlyViewedProductItems] = useState<ProductItem[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([]);

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    const savedFilter = localStorage.getItem('filterBy');
    const savedSort = localStorage.getItem('sortBy');
    if (savedSearch) setSearchTerm(savedSearch);
    if (savedFilter) setFilterBy(savedFilter);
    if (savedSort) setSortBy(savedSort);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('filterBy', filterBy);
    localStorage.setItem('sortBy', sortBy);
  }, [searchTerm, filterBy, sortBy]);

  const handleSearchHub = (items: HubItem[], term: string) =>
    items.filter((item) => item.title.toLowerCase().includes(term.toLowerCase()));

  const handleSearchProduct = (items: ProductItem[], term: string) =>
    items.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));

  const handleSortHub = (items: HubItem[], key: keyof HubItem) =>
    [...items].sort((a, b) => {
      const valueA = a[key] ?? '';
      const valueB = b[key] ?? '';

      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
      return 0;
    });

  const handleSortProduct = (items: ProductItem[], key: keyof ProductItem) =>
    [...items].sort((a, b) => {
      const valueA = a[key] ?? '';
      const valueB = b[key] ?? '';

      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
      return 0;
    });

  const handleFilterHub = (items: HubItem[], category: string) =>
    category ? items.filter((item) => item.category.includes(category)) : items;

  const handleFilterProduct = (items: ProductItem[], category: string) =>
    category ? items.filter((item) => item.categories.includes(category)) : items;

  const toggleFavoriteHubItem = (item?: HubItem) => {
    if (!item) return;

    if (item.isFavorite) {
      setFavoriteHubItems(favoriteHubItems.filter(favItem => favItem.id !== item.id));
    } else {
      setFavoriteHubItems([...favoriteHubItems, { ...item, isFavorite: true }]);
    }

    undoStack.push(`favoriteHub_${item.id}`);
    setUndoStack([...undoStack]);
  };

  const toggleFavoriteProductItem = (item?: ProductItem) => {
    if (!item) return;

    if (item.isFavorite) {
      setFavoriteProductItems(favoriteProductItems.filter(favItem => favItem.id !== item.id));
    } else {
      setFavoriteProductItems([...favoriteProductItems, { ...item, isFavorite: true }]);
    }
    undoStack.push(`favoriteProduct_${item.id}`);
    setUndoStack([...undoStack]);
  };

  const undoLastAction = () => {
    const lastAction = undoStack[undoStack.length - 1];
    if (!lastAction) return;

    const updatedUndoStack = [...undoStack];
    updatedUndoStack.pop();  // Mutate a copy, not original

    if (lastAction.startsWith('favoriteHub_')) {
      const itemId = Number(lastAction.split('_')[1]);
      const item = hubItems?.find(item => item.id === itemId);
      if (item) toggleFavoriteHubItem(item);
    } else if (lastAction.startsWith('favoriteProduct_')) {
      const itemId = Number(lastAction.split('_')[1]);
      const item = productItems?.find(item => item.id === itemId);
      if (item) toggleFavoriteProductItem(item);
    }

    setUndoStack(updatedUndoStack);
  };

  const processedHubItems = handleSortHub(
    handleFilterHub(handleSearchHub(hubItems ?? [], searchTerm), filterBy),
    "category"
  );
  const processedProductItems = handleSortProduct(
    handleFilterProduct(handleSearchProduct(productItems ?? [], searchTerm), filterBy),
    "categories"
  );
  const hubDisplayLimit = showMoreHub ? processedHubItems.length : 3;
  const productDisplayLimit = showMoreProduct ? processedProductItems.length : 3;

  const totalHubItems = hubItems.length;
  const totalProductItems = productItems.length;
  const totalFavoriteHubItems = favoriteHubItems.length;
  const totalFavoriteProductItems = favoriteProductItems.length;

  return (
    <div className="min-h-screen bg-slate-50 border border-gray-300 p-3 rounded-lg">
      <header className="flex flex-row items-center justify-between rounded-lg">
        <section className="flex gap-2 mb-5">
          <Image width={30} height={30} src='/sidebar/1.svg' alt='insight-hub-icon' />
          <h1 className="text-2xl font-normal text-black">Insight Hub</h1>
        </section>

        <section className="flex items-center gap-4 mb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-[300px] shadow-sm border-gray-200 p-2 rounded-md transition-shadow"
          />
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg transition-shadow"
          >
            <option value=""></option>
            <option value="category"></option>
          </select> */}
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Filter By Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
              <SelectItem value="Filter">Filter</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Automobile">Automobile</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <select
            onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg transition-shadow"
          >
            <option value="">Filter By Category</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
          </select> */}
        </section>
      </header>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-4 bg-white min-w-[300px] w-full rounded-md border border-gray-300 ">
          <h3 className="text-lg font-normal">Total Startups</h3>
          <p className="text-2xl  ">{totalHubItems}</p>
        </div>
        <div className="p-4 bg-white min-w-[300px] w-full rounded-md border border-gray-300 ">
          <h3 className="text-lg font-normal">Total Products</h3>
          <p className="text-2xl  ">{totalProductItems}</p>
        </div>
        <div className="p-4 bg-white min-w-[300px] w-full rounded-md border border-gray-300 ">
          <h3 className="text-lg font-normal">Favorite Startups</h3>
          <p className="text-2xl  ">{totalFavoriteHubItems}</p>
        </div>
        <div className="p-4 bg-white min-w-[300px] w-full rounded-md border border-gray-300 ">
          <h3 className="text-lg font-normal">Favorite Products</h3>
          <p className="text-2xl  ">{totalFavoriteProductItems}</p>
        </div>
      </div>

      <section className="mb-12 p-3 rounded-lg border border-gray-300 min-h-[500px] flex flex-col justify-between bg-white">
        <h2 className="text-xl text-gray-700 mb-6">Trending Startups</h2>
        {processedHubItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-gray-800 text-[20px] text-center">Add Startups in your Hub.</h1>
            <Button>
              <Link className="" href='/dashboard/trending-segments'>Startups</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {processedHubItems.slice(0, hubDisplayLimit).map((item) => (
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
                <button
                  onClick={() => toggleFavoriteHubItem(item)}
                  className={`text-lg ${item.isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {item.isFavorite ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            ))}
          </div>
        )}
        <Button className="w-fit" onClick={() => setShowMoreHub(!showMoreHub)}>
          {showMoreHub ? "Show Less" : "See More"}
        </Button>

        {showMoreHub && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 w-[800px] h-[800px] overflow-auto rounded-lg shadow-lg">
              <Button
                className="absolute top-2 right-2 text-2xl font-bold text-black"
                onClick={() => setShowMoreHub(false)}
              >
                &times;
              </Button>
              {processedProductItems.length === 0 ? (
                <div className="text-gray-500">No Product items found.</div>
              ) : (
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
                      <button
                        onClick={() => toggleFavoriteHubItem(item)}
                        className={`text-lg ${item.isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        {item.isFavorite ? "Unfavorite" : "Favorite"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Product Discover Section */}
      <section className="mb-12 p-3 rounded-lg border border-gray-300 min-h-[500px] flex flex-col justify-between bg-white">
        <h2 className="text-xl text-gray-700 mb-6">Product Discover</h2>
        {processedProductItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-gray-800 text-[20px] text-center">Add Product in your Hub.</h1>
            <Button>
              <Link className="" href='/dashboard/trending-segments'>Product</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {processedProductItems.slice(0, productDisplayLimit).map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg p-6 w-80">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-lg text-black">{product.description}</p>
                <p className="text-lg text-black">{product.categories.join(", ")}</p>
                <p className="text-lg text-black">{product.location}</p>
                <p className="text-lg text-black">{product.growth}</p>
                <p className="text-lg text-black">{product.salesVolume}</p>
                <p className="text-lg text-black">{product.totalRevenue}</p>
                <p className="text-lg text-black">{product.latestVersion}</p>
                <p className="text-lg text-black">{product.stock}</p>
                <button
                  onClick={() => toggleFavoriteProductItem(product)}
                  className={`text-lg ${product.isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {product.isFavorite ? "Unfavorite" : "Favorite"}
                </button>

              </div>
            ))}
          </div>
        )}
        <Button className="w-fit" onClick={() => setShowMoreProduct(!showMoreProduct)}>
          {showMoreProduct ? "Show Less" : "See More"}
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
                    <h3 className="text-xl text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-lg text-black">{product.description}</p>
                    <p className="text-lg text-black">{product.categories.join(", ")}</p>
                    <p className="text-lg text-black">{product.location}</p>
                    <p className="text-lg text-black">{product.growth}</p>
                    <p className="text-lg text-black">{product.salesVolume}</p>
                    <p className="text-lg text-black">{product.totalRevenue}</p>
                    <p className="text-lg text-black">{product.latestVersion}</p>
                    <p className="text-lg text-black">{product.stock}</p>
                    <button
                      onClick={() => toggleFavoriteProductItem(product)}
                      className={`text-lg ${product.isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      {product.isFavorite ? "Unfavorite" : "Favorite"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* <Button onClick={undoLastAction} className="mt-6">
        Undo Last Action
      </Button> */}
    </div>
  );
};

export default InsightHub;
