
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="">
                {children}
            </main>
            <Footer />
        </div >
    );
}
