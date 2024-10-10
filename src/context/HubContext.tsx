// HubContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Segment } from "@/app/dashboard/trending-segments/page";

interface HubContextType {
  hubItems: Segment[];
  addToHub: (item: Segment) => void;
}

const HubContext = createContext<HubContextType | undefined>(undefined);

export const HubProvider = ({ children }: { children: ReactNode }) => {
  const [hubItems, setHubItems] = useState<Segment[]>([]);

  const addToHub = (item: Segment) => {
    setHubItems((prevItems) => [...prevItems, item]);
  };

  return (
    <HubContext.Provider value={{ hubItems, addToHub }}>
      {children}
    </HubContext.Provider>  
  );
};

export const useHub = () => {
  const context = useContext(HubContext);
  if (!context) {
    throw new Error("useHub must be used within a HubProvider");
  }
  return context;
};
