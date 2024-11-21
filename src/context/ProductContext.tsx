
"use client";
import React, { createContext, useContext, useState } from "react";
import { ProductSegment } from "@/app/dashboard/product-discovery/ProductDetail";

type ProductContextType = {
  productItems: ProductSegment[];
  addProductToHub: (product: ProductSegment) => void;
};

const ProductContext = createContext<ProductContextType | undefined>();

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productItems, setProductItems] = useState<ProductSegment[]>([]);

  const addProductToHub = (product: ProductSegment) => {
    setProductItems((prevItems) => [...prevItems, product]);
  };

  return (
    <ProductContext.Provider value={{ productItems, addProductToHub }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
