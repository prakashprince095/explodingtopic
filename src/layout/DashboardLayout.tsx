import React from 'react';
import Sidebar from '@/components/Sidebar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
