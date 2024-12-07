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
            { href: '/products/Trending-Startup', label: 'Trending-Startups' },
            { href: '/products/Trending-Products', label: 'Trending-Products' },
            { href: '/products/Deep-Dive-Analysis', label: 'Deep Dive Analysis' },
            { href: '/products/Meta-Wave', label: 'Meta Wave' },
            { href: '/products/Report-Center', label: 'Reports Center' },
            { href: '/products/Insight-Database', label: 'Insight Database' },
        ],
    },
    {
        label: 'Company',
        links: [
            { href: '/Company/Changelogs', label: 'Changelogs' },
            { href: '/Company/Faqs', label: 'Faqs' },
            { href: '/Company/Blogs', label: 'Blog' },
            { href: '/Company/caseStudies', label: 'Case Studies' },
            { href: '/Company/Support', label: 'Support' },
            { href: '/Company/Carrers', label: 'Carrers' },
            { href: '/Company/Aboutus', label: 'About us' },
        ],
    },
    {
        label: 'Resources',
        links: [
            { href: '/Company/Changelogs', label: 'Changelogs' },
            { href: '/Company/Faqs', label: 'Faqs' },
            { href: '/Company/Blogs', label: 'Blog' },
            { href: '/Company/caseStudies', label: 'Case Studies' },
            { href: '/Company/Support', label: 'Support' },
            { href: '/Company/Carrers', label: 'Carrers' },
            { href: '/Company/Aboutus', label: 'About us' },
        ],
    },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-background text-zinc-700">
            <div className="max-w-7xl mx-auto px-4 ">
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
                        <Link className="text-sm font-medium" href="/pricing">
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

