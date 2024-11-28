'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Startup = {
  uuid: string;
  name: string;
  short_description: string;
  description: string;
  web: string;
  city: string;
  region: string;
  country: string;
  founded_on: string;
  rank: number;
  number_of_employees_min: number;
  number_of_employees_max: number;
  twitter_url: string;
  linkedin_url: string;
  facebook_url: string;
  number_of_investments: number;
};

interface StartupContextType {
  selectedStartup: Startup | null;
  setSelectedStartup: React.Dispatch<React.SetStateAction<Startup | null>>;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export const StartupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  return (
    <StartupContext.Provider value={{ selectedStartup, setSelectedStartup }}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartup = () => {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error('useStartup must be used within a StartupProvider');
  }
  return context;
};
