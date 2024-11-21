"use client";

import React, { createContext, useContext, useState } from "react";

// Define the structure of a Startup
interface Startup {
  id: string;
  title: string;
  description: string;
  employees: number;
  volume: number;
  totalFunding: string;
  latestRound: string;
  category: string[];
  location: string;
  growth: string;
  isFavorite?: boolean;
}

// Define the context type
interface HubContextType {
  hubItems: Startup[];
  addToHub: (startup: Startup) => void;
}

// Create the HubContext
export const HubContext = createContext<HubContextType | undefined>(undefined);

// Provide the context to components
export const HubProvider = ({ children }: { children: React.ReactNode }) => {
  const [hubItems, setHubItems] = useState<Startup[]>([]);

  const addToHub = (startup: Startup) => {
    setHubItems((prevItems) => {
      // Avoid duplicates
      if (!prevItems.find((item) => item.id === startup.id)) {
        return [...prevItems, startup];
      }
      return prevItems;
    });
  };

  return (
    <HubContext.Provider value={{ hubItems, addToHub }}>
      {children}
    </HubContext.Provider>
  );
};

// Custom hook to use the HubContext
export const useHub = () => {
  const context = useContext(HubContext);
  if (!context) {
    throw new Error("useHub must be used within a HubProvider");
  }
  return context;
};
