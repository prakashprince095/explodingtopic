'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';

const menuItems = [
    {
        label: 'Product',
        links: [
            { href: '/products/insight-Hub', label: 'Insights-Hub' },
            { href: '/products/Trending-Startups', label: 'Trending-Startups' },
            { href: '/products/Trending-Products', label: 'Trending-Products' },
            { href: '/products/Deep-Dive-Analysis', label: 'Deep Dive Analysis' },
        ],
    },
    {
        label: 'Solutions',
        links: [
            { href: '/solutions/overview', label: 'Startup Details' },
            { href: '/solutions/rfi-Management', label: 'Products Details' },
            { href: '/solutions/changeOrderManagement', label: 'Meta Wave' },
            { href: '/solutions/purchaseOrderManagement', label: 'Reports Center' },
            { href: '/solutions/documentManagement', label: 'Insight Database' },
            { href: '/solutions/customFormBuilder', label: 'Niche Data Explorer' },
        ],
    },
    {
        label: 'Resources',
        links: [
            { href: '/resources/changelogs', label: 'Changelogs' },
            { href: '/resources/FAQs', label: 'Faqs' },
            { href: '/resources/Blogs', label: 'Blog' },
            { href: '/resources/case-Studies', label: 'Case Studies' },
            { href: '/resources/support', label: 'Support' },
        ],
    },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-background text-zinc-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <Link href="/" className="flex-shrink-0">
                        <Image src="/logos/1.svg" alt="Logo" width={40} height={40} />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menuItems.map((item, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {item.links.map((link, linkIndex) => (
                                                    <li key={linkIndex}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={link.href}
                                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            >
                                                                {link.label}
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Link className="text-sm font-medium" href="/Pricing">
                            Pricing
                        </Link>
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Button size="sm">
                            <Link href="/register">Register</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button size="sm">
                            <Link href="/dashboard/insights-hub">Dashboard</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            {/* Add a header and title for accessibility */}
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-4">
                                {menuItems.map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <h2 className="text-lg">{item.label}</h2>
                                        <ul className="pl-4 space-y-2">
                                            {item.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-sm hover:underline"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <Link href="/Pricing" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                                    Pricing
                                </Link>
                                <div className="pt-4 space-y-2">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Link href="/register">Register</Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button className="w-full justify-start" onClick={() => setIsOpen(false)}>
                                        <Link href="/dashboard/insights-hub">Dashboard</Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;

