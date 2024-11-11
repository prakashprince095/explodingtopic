'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

// Define types for menu items and hover states
type MenuItem = {
  label: string;
  links: { href: string; label: string }[];
};

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const items: MenuItem[] = [
    {
      label: "Product",
      links: [
        { href: "/ClientOnboarding", label: "Client On-boarding" },
        { href: "/CRM", label: "CRM" },
        { href: "/Learning", label: "Learning" },
      ],
    },
    {
      label: "Solutions",
      links: [
        { href: "/GrowthStrategies", label: "Insight Hub" },
        { href: "/InnovationToolkit", label: "Startup Trends" },
        { href: "/Marketing", label: "Products Discovery" },
        { href: "/Financial", label: "Insight Category" },
        { href: "/Sales", label: "Meta Trends" },
        { href: "/SmartInventory", label: "Deep Analysis" },
        { href: "/AIRecomandation", label: "Reporting" },
      ],
    },
    {
      label: "Resources",
      links: [
        { href: "/Changelog", label: "Changelogs" },
        { href: "/Faqs", label: "Faqs" },
        { href: "/Blog", label: "Blog" },
        { href: "/Feedback", label: "Feedback" },
      ],
    },
  ];

  return (
    <div className="text-[18px] text-zinc-700 h-[90px] flex justify-between items-center px-[40px]">
      <Link href="/" className="w-[200px]">
        <Image src="/logo.png" alt="Logo" width={200} height={90} />
      </Link>
      <div className="hidden xl:flex">
        <ul className="relative flex gap-[30px] text-[14px]">
          {items.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative list-none"
            >
              <span>{item.label}</span>
              {hoveredIndex === index && (
                <div className="absolute text-black z-20 top-[30px] rounded-md border border-gray-400 flex flex-col w-[300px] p-[20px] shadow-lg bg-white">
                  {item.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.href} className="text-[14px] p-[5px] hover:bg-blue-400 rounded-[5px]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <Link href="/Pricing" className="list-none">
            Pricing
          </Link>
        </ul>
      </div>
      <div className="hidden xl:flex gap-[20px]">
        <Button>
          <Link href="/register">
            Register
          </Link>
        </Button>
        <Button>
        <Link href="/login">
          Login
        </Link>
        </Button>
      </div>
      <div className="xl:hidden border rounded-full p-[10px] cursor-pointer" onClick={toggleMenu}>
        <Image src="/Header/header.svg" alt="Menu Icon" width={40} height={40} />
      </div>
      {menuOpen && (
        <div className="absolute xl:hidden right-0 rounded-xl top-[90px] z-20 left-[0%] w-full p-[20px] border border-gray-300 bg-white flex flex-col">
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center hover:bg-[#3E8FC3] p-[10px] w-full rounded-[10px] relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>{item.label}</span>
                <Image src="/Header/arrow.png" alt="Arrow" width={14} height={14} />
                {hoveredItem === item.label && (
                  <div className="absolute z-50 top-0 left-[40%] bg-white shadow-md p-[10px] rounded-md border border-gray-400 flex flex-col w-[300px]">
                    {item.links.map((link, linkIndex) => (
                      <Link key={linkIndex} href={link.href} className="text-[20px] p-[5px] hover:bg-blue-400 rounded-[5px]">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <Link href="/Pricing" className="flex justify-between items-center hover:bg-[#3E8FC3] p-[10px] w-full rounded-[10px]">
              <span>Pricing</span>
              <Image src="/Header/arrow.png" alt="Arrow" width={14} height={14} />
            </Link>
          </ul>
          <div className="flex items-center justify-between border-t p-[20px] border-t-white mt-[20px]">
            <Link href="/register" >
              Register
            </Link>
            <Link href="/login">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
