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
                { href: '/root/products/team-Permission', label: 'Team & Permissions' },
                { href: '/root/products/bid-Management', label: 'Bid Management' },
                { href: '/root/products/time-Tracking', label: 'Time Tracking' },
                { href: '/root/products/task-Management', label: 'Task Management' },
            ],
        },
        {
            label: 'Solutions',
            links: [
                { href: '/root/solutions/overview', label: 'Dashboard Overview' },
                { href: '/root/solutions/rfi-Management', label: 'RFI Management' },
                { href: '/root/solutions/changeOrderManagement', label: 'Change Order Management' },
                { href: '/root/solutions/purchaseOrderManagement', label: 'Purchase Order Management' },
                { href: '/root/solutions/documentManagement', label: 'Document Management' },
                { href: '/root/solutions/customFormBuilder', label: 'Custom Forms Builder' },
            ],
        },
        {
            label: 'Resources',
            links: [
                { href: '/root/resources/changelogs', label: 'Changelogs' },
                { href: '/root/resources/FAQs', label: 'Faqs' },
                { href: '/root/resources/Blogs', label: 'Blog' },
                { href: '/root/resources/case-Studies', label: 'Case Studies' },
                { href: '/root/resources/support', label: 'Support' },
            ],
        },
    ];

    return (
        <div className="text-[18px] text-zinc-700 h-[90px] flex justify-between items-center px-[40px]">
            {/* Logo */}
            <Link href="/" className="w-[200px]">
                <Image src="/logos/1.svg" alt="Logo" width={50} height={50} />
            </Link>

            {/* Navigation */}
            <div className="hidden xl:flex">
                <NavigationMenu>
                    <NavigationMenuList>
                        {menuItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-md rounded-md p-4 w-[400px]">
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
                        <Link className='text-[14px] font-medium ml-3' href="/root/Pricing">Pricing</Link>
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

            <div className="xl:hidden border rounded-full p-[10px] cursor-pointer">
                <Image src="/Header/header.svg" alt="Menu Icon" width={40} height={40} />
            </div>
        </div>
    );
};

export default Header;
