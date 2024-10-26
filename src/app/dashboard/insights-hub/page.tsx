'use client'

import React, { useState, useEffect } from "react";
import { useHub } from "@/context/HubContext";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define types for HubItem and ProductItem
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

  // Auto-save to local storage for search & filter terms
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

  // Search function for Hub items
  const handleSearchHub = (items: HubItem[], term: string) =>
    items.filter((item) => item.title.toLowerCase().includes(term.toLowerCase()));

  // Search function for Product items
  const handleSearchProduct = (items: ProductItem[], term: string) =>
    items.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));

  // Sort function for Hub items
  const handleSortHub = (items: HubItem[], key: keyof HubItem) =>
    [...items].sort((a, b) => {
      const valueA = a[key] ?? ''; // Use a fallback value if undefined or null
      const valueB = b[key] ?? ''; // Use a fallback value if undefined or null

      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
      return 0; // If equal, return 0
    });


  // Sort function for Product items
  const handleSortProduct = (items: ProductItem[], key: keyof ProductItem) =>
    [...items].sort((a, b) => {
      const valueA = a[key] ?? ''; // Use a fallback value if undefined or null
      const valueB = b[key] ?? ''; // Use a fallback value if undefined or null

      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
      return 0; // If equal, return 0
    });


  // Filter function for Hub items by category
  const handleFilterHub = (items: HubItem[], category: string) =>
    category ? items.filter((item) => item.category.includes(category)) : items;

  // Filter function for Product items by category
  const handleFilterProduct = (items: ProductItem[], category: string) =>
    category ? items.filter((item) => item.categories.includes(category)) : items;

  // Toggle favorite status for HubItem
  const toggleFavoriteHubItem = (item?: HubItem) => {
    if (!item) return; // Ensure item is not undefined

    if (item.isFavorite) {
      setFavoriteHubItems(favoriteHubItems.filter(favItem => favItem.id !== item.id));
    } else {
      setFavoriteHubItems([...favoriteHubItems, { ...item, isFavorite: true }]);
    }

    undoStack.push(`favoriteHub_${item.id}`);
    setUndoStack([...undoStack]);
  };

  // Toggle favorite status for ProductItem
  const toggleFavoriteProductItem = (item?: ProductItem) => {
    if (!item) return; // Ensure item is not undefined

    if (item.isFavorite) {
      setFavoriteProductItems(favoriteProductItems.filter(favItem => favItem.id !== item.id));
    } else {
      setFavoriteProductItems([...favoriteProductItems, { ...item, isFavorite: true }]);
    }

    undoStack.push(`favoriteProduct_${item.id}`);
    setUndoStack([...undoStack]);
  };

  // Undo last action
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

    setUndoStack(updatedUndoStack); // Update state with the copied undo stack
  };

  // Processed Hub and Product items based on search, filter, and sort
  const processedHubItems = handleSortHub(
    handleFilterHub(handleSearchHub(hubItems ?? [], searchTerm), filterBy),
    "category"
  );
  const processedProductItems = handleSortProduct(
    handleFilterProduct(handleSearchProduct(productItems ?? [], searchTerm), filterBy),
    "categories"
  );

  // Updated logic for "See More" functionality for Hub Items
  const hubDisplayLimit = showMoreHub ? processedHubItems.length : 3;

  // Updated logic for "See More" functionality for Product Items
  const productDisplayLimit = showMoreProduct ? processedProductItems.length : 3;



  return (
    <div className="min-h-screen bg-white border border-gray-300 p-3 rounded-lg">
      <header className="flex flex-row items-center justify-between rounded-lg">
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
            className="border border-gray-300 p-2 rounded-lg transition-shadow"
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
      </header>

      {/* Trending Startups Section */}
      <section className="mb-12 p-3 rounded-lg border border-gray-300 min-h-[500px] flex flex-col justify-between bg-gray-50">
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
              {processedProductItems.length === 0 ? (
                <p className="text-gray-500">No Product items found.</p>
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
      <section className="mb-12 p-3 rounded-lg border border-gray-300 min-h-[500px] flex flex-col justify-between bg-gray-50">
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

      {/* Undo Button */}
      <Button onClick={undoLastAction} className="mt-6">
        Undo Last Action
      </Button>
    </div >
  );
};

export default InsightHub;
