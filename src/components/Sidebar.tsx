"use client"; // This line ensures the component is treated as a Client Component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  // Define links for the sidebar
  const links = [
    { name: 'Insights hub', href: '/dashboard/insights-hub' },
    { name: 'Trendings Startups', href: '/dashboard/trending-segments' },
    { name: 'Discover Products', href: '/dashboard/product-discovery' },
    { name: 'Insights Database', href: '/dashboard/insights-database' },
    { name: 'Meta Wave', href: '/dashboard/meta-wave' },
    { name: 'Deep analysis', href: '/dashboard/deep-dive-analysis' },
    { name: 'Reports', href: '/dashboard/reports-center' },
    // { name: 'Api Access', href: '/dashboard/data-api-access' },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4">
        <Link href="/" className="text-xl font-semibold">Dashboard</Link>
      </div>
      <nav className="mt-4">
        <ul>
          {links.map((link) => (
            <li key={link.href} className={pathname === link.href ? 'bg-gray-500' : ''}>
              <Link href={link.href}>
                <h1 className="block p-4 hover:bg-gray-700">{link.name}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-20 gap-4 flex flex-col p-4">
        <Link href="/dashboard/profile" className="text-md">Profile</Link>
        <Link href="/dashboard/help-center" className="text-md">Help center</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
