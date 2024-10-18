// src/app/dashboard/layout.tsx

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { HubProvider } from '@/context/HubContext';
import { ProductProvider } from '@/context/ProductContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Include the Sidebar on the left */}
      <Sidebar />

      {/* Main content area for the child pages */}
      <main className="ml-64 p-8 w-full  min-h-screen">
          <HubProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </HubProvider>
      </main>
    </div >
  );
}
