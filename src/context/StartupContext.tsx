'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RelatedStartup, KeyIndicators, Startup } from '@/types/index';

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
