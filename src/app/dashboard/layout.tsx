
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { HubProvider } from '@/context/HubContext';
import { ProductProvider } from '@/context/ProductContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-[200px] py-3  w-full  min-h-screen">
          <HubProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </HubProvider>
      </main>
    </div >
  );
}
