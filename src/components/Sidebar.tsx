"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Insights Hub', href: '/dashboard/insights-hub', imgSrc: '/sidebar/1.svg' },
    { name: 'Trending Startups', href: '/dashboard/trending-startups', imgSrc: '/sidebar/2.svg' },
    { name: 'Discover Products', href: '/dashboard/product-discovery', imgSrc: '/sidebar/3.svg' },
    { name: 'Insights Database', href: '/dashboard/insights-database', imgSrc: '/sidebar/4.svg' },
    { name: 'Meta Wave', href: '/dashboard/meta-wave', imgSrc: '/sidebar/5.svg' },
    { name: 'Deep Analysis', href: '/dashboard/deep-dive-analysis', imgSrc: '/sidebar/6.svg' },
    { name: 'Reports', href: '/dashboard/reports-center', imgSrc: '/sidebar/7.svg' },
  ];

  return (
    <aside className="w-[200px] h-screen  text-black fixed">
      <div className="p-4">
        <Link href="/" className="text-md">Dashboard</Link>
      </div>
      <nav className="mt-4">
        <ul className="mx-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className={isActive ? 'bg-[#3985ED] rounded-md' : ''}>
                <Link href={link.href} className="flex items-center my-2 p-2  rounded-md">
                  <img 
                    src={link.imgSrc} 
                    alt={link.name} 
                    className={`w-5 h-5 mr-2 ${isActive ? 'filter invert' : ''}`} 
                  />
                  <p className={isActive ? 'text-white' : ''}>{link.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-20 gap-4 flex flex-col p-4">
        <Link href="/dashboard/profile" className="text-md">Profile</Link>
        <Link href="/dashboard/help-center" className="text-md">Help Center</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
