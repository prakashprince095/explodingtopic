"use client";
import React, { createContext, useContext, useState } from "react";

// Define the type for a Product
export type Product = {
  uuid: string;
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
  selling_data: { year: string; sales: number }[];
  growth_rate: string;
  search_volume: string;
  category: string[];
  channels: { platform: string; value: string }[];
  logo: string;
  quantity: number;
  location: string;
};

// Context type
type ProductContextType = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
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
