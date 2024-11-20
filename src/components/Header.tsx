'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './ui/navigation-menu'; // Import the Navigation Menu components

const Header: React.FC = () => {
  const menuItems = [
    {
      label: 'Product',
      links: [
        { href: '/ClientOnboarding', label: 'Client On-boarding' },
        { href: '/CRM', label: 'CRM' },
        { href: '/Learning', label: 'Learning' },
      ],
    },
    {
      label: 'Solutions',
      links: [
        { href: '/GrowthStrategies', label: 'Insight Hub' },
        { href: '/InnovationToolkit', label: 'Startup Trends' },
        { href: '/Marketing', label: 'Products Discovery' },
        { href: '/Financial', label: 'Insight Category' },
        { href: '/Sales', label: 'Meta Trends' },
        { href: '/SmartInventory', label: 'Deep Analysis' },
        { href: '/AIRecomandation', label: 'Reporting' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { href: '/Changelog', label: 'Changelogs' },
        { href: '/Faqs', label: 'Faqs' },
        { href: '/Blog', label: 'Blog' },
        { href: '/Feedback', label: 'Feedback' },
      ],
    },
  ];

  return (
    <div className="text-[18px] text-zinc-700 h-[90px] flex justify-between items-center px-[40px]">
      {/* Logo */}
      <Link href="/" className="w-[200px]">
        <Image src="/logos/1.svg" alt="Logo" width={70} height={70} />
      </Link>

      {/* Navigation */}
      <div className="hidden xl:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="bg-white shadow-md rounded-md p-4 w-56">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="p-2 hover:bg-gray-100 rounded-md">
                        <NavigationMenuLink asChild>
                          <Link href={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/Pricing">Pricing</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Buttons */}
      <div className="hidden xl:flex gap-[20px]">
        <Button>
          <Link href="/register">Register</Link>
        </Button>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button>
          <Link href="/dashboard/insights-hub">Dashboard</Link>
        </Button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="xl:hidden border rounded-full p-[10px] cursor-pointer">
        <Image src="/Header/header.svg" alt="Menu Icon" width={40} height={40} />
      </div>
    </div>
  );
};

export default Header;
