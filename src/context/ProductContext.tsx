"use client";
import React, { createContext, useContext, useState } from "react";

// Define the type for a Product
// export type ProductItem = {
//   id: number;
//   name: string;
//   short_description: string;
//   description: string;
//   revenue: string;
//   best_selling_rate: string;
//   price: string;
//   avg_reviews_rating: string;
//   twitter_url?: string;
//   amazon_url?: string;
//   alibaba_url?: string;
//   instagram_url?: string;
//   selling_data: { year: string; sales: number }[];
//   growth_rate: string;
//   search_volume: string;
//   category: string[];
//   channels: { platform: string; value: string }[];
//   logo: string;
//   quantity: number;
//   location: string;
//   growth: string;
//   salesVolume: string;
//   totalRevenue: string;
//   latestVersion: string;
//   stock: string;
//   categories: string[];
// };
export type ProductItem = {
  id: number;
  name: string;
  short_description: string;
  description: string;
  revenue: string;
  best_selling_rate: string;
  price: string;
  avg_reviews_rating: string;
  twitter_url?: string;
  amazon_url?: string;
  alibaba_url?: string;
  instagram_url?: string;
  selling_data: { year: string; sales: number }[];  // Array of sales per year
  growth_rate: string;  // Growth rate (e.g., +20%)
  search_volume: string;  // Search volume (e.g., 15K)
  category: string[];  // Categories of the product
  channels: { platform: string; value: string }[];  // Channels (e.g., Instagram, Facebook)
  logo: string;  // Logo URL
  quantity: number;  // Stock quantity
  location: string;  // Location of the product
  growth: string;  // Growth rate as a string (e.g., "+20%")
  salesVolume: string;  // This can be a total of sales, for example "20,000"
  totalRevenue: string;  // Total revenue (e.g., "$1M")
  latestVersion: string;  // The latest version of the product (if applicable)
  stock: string;  // This seems to be the same as `quantity`, but in string format
  categories: string[];  // Categories (if this is a different set from `category`)
};

// Context type
// type ProductContextType = {
//   product: Product | null;
//   setProduct: (product: Product) => void;
// };
type ProductContextType = {
  productItems: ProductItem[];  // Array of ProductItems
  setProductItems: (items: ProductItem[]) => void;  // Function to set ProductItems
};


// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productItems, setProductItems] = useState<ProductItem[]>([]); // Initialize productItems as an empty array
  return (
    <ProductContext.Provider value={{ productItems, setProductItems }}>
            {children}
    </ProductContext.Provider>
  );
};

// Hook to use the context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
