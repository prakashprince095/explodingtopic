'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type MenuItem = 'Product' | 'Solution' | 'Pricing' | 'Resources';

const Header: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [clickedItem, setClickedItem] = useState<MenuItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const hoverBoxRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (item: MenuItem) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item !== 'Pricing') {
      setClickedItem(item);
      setIsVisible(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (hoverBoxRef.current && !hoverBoxRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  const hoverBoxStyle: React.CSSProperties = {
    position: 'absolute',
    top: '73px',
    width: '960px',
    height: '400px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(100px)',
    zIndex: 999,
    left: '50%',
    transform: 'translateX(-50%)',
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const items: MenuItem[] = ['Product', 'Solution', 'Pricing', 'Resources'];

  return (
    <div className="text-black flex flex-row items-center border-white justify-between px-[60px] bg-opacity-800 backdrop-blur-xl shadow-sm h-[90px] lg:w-[1280px] rounded-full my-[20px] mx-auto">
      <div className="w-[180px]">
        <Link href="/">
          <img src="/main/full-logo.svg" alt="Logo" />
        </Link>
      </div>
      <div>
        <ul className="flex flex-row ml-[90px] gap-[20px]">
          {items.map((item) => (
            <li
              key={item}
              className="px-[10px] py-[5px] cursor-pointer text-[15px] rounded-[4px] hover:bg-blue-200"
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleItemClick(item)}
            >
              {item === 'Pricing' ? (
                <Link href="/Pricing">{item}</Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
        {isVisible && (
          <div ref={hoverBoxRef}>
            {clickedItem === 'Product' && (
              <div className="flex flex-col gap-[8px]">
                <Link href="/Training">
                  <div className="flex flex-row items-center gap-[10px] p-[8px] w-[360px] border-black border-r-[2px] hover:bg-gray-100">
                    <div className="w-[60px]">
                      <img src="/Products/1.svg" alt="Training & Subscription Hub" />
                    </div>
                    <div>
                      <h1 className="text-[20px]">Training & Subscription Hub</h1>
                    </div>
                  </div>
                </Link>
                {/* Additional Links */}
              </div>
            )}
            {clickedItem === 'Solution' && (
              <div className="flex flex-row flex-wrap gap-[8px]">
                <Link href="/Financial">
                  <div className="flex flex-row items-center gap-[5px] p-[8px] w-[300px] border-black border-r-[2px] hover:bg-gray-100">
                    <div className="w-[60px]">
                      <img src="/Products/1.png" alt="Financial Mastery" />
                    </div>
                    <div>
                      <h1 className="text-[20px]">Financial Mastery</h1>
                    </div>
                  </div>
                </Link>
                {/* Additional Links */}
              </div>
            )}
            {clickedItem === 'Resources' && (
              <div>
                <Link href="/Changelog">
                  <div className="flex flex-row items-center gap-[5px] p-[8px] w-[300px] border-black border-r-[2px] hover:bg-gray-100">
                    <div className="w-[60px]">
                      <img src="/Products/8.png" alt="Change logs" />
                    </div>
                    <div>
                      <h1 className="text-[20px]">Change logs</h1>
                    </div>
                  </div>
                </Link>
                {/* Additional Links */}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="flex flex-row gap-[10px] border-l-[1px] border-black pl-[10px]">
          <Link href="/Register" className="bg-blue-200 shadow-md hover:bg-blue-200 py-[8px] px-[12px] rounded-[4px]">
            Register
          </Link>
          <Link href="/login" className="bg-blue-200 shadow-md hover:bg-blue-200 py-[8px] px-[12px] rounded-[4px]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
