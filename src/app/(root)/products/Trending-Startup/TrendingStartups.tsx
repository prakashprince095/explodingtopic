
'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Share2, Link } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Image from "next/image"
import StartupsCards from "./StartupCards"


export default function TrendingStartups() {
    return (
        <section className="max-w-[1280px] flex flex-col items-center">
            <div className="container mx-auto px-4">
                {/* <div className="max-w-2xl mx-auto text-center mb-12">
                    <h2 className="text-3xl  tracking-tight mb-4">
                        Trending Startups
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Discover innovative startups shaping the future of technology and business.
                        These companies are developing groundbreaking solutions to global challenges.
                    </p>
                </div> */}
                <div className="bg-[#F6F5F4] max-w-[1280px] p-10 flex items-center justify-center gap-5 my-5">
                    <StartupsCards />
                </div>
                <div className="mt-36 mb-10 flex flex-col items-center">
                    <h1 className="text-center border-b pb-10 max-w-[500px] font-semibold text-[28px]">See your biggest organizations data in Exploding</h1>
                    <div className='flex border-b gap-14 max-w-[600px] py-8 flex-wrap items-center justify-center'>
                        <Image src='/landing/Trusted-1.svg' alt='' height={60} width={60} />
                        <Image src='/landing/Trusted-2.svg' alt='' height={60} width={60} />
                        <Image src='/landing/Trusted-3.svg' alt='' height={60} width={60} />
                        <Image src='/landing/Trusted-4.svg' alt='' height={60} width={60} />
                        <Image src='/landing/Trusted-5.svg' alt='' height={60} width={60} />
                        <Image src='/landing/Trusted-6.svg' alt='' height={60} width={60} />
                        <Image src='/landing/Trusted-7.svg' alt='' height={60} width={60} />
                    </div>
                </div>
                <section className=" max-w-[400px] ">
                    <h1 className="text-2xl  font-bold">Discover every part of your niche related startup:</h1>
                    <h2 className="text-md mb-4 text-gray-600 font-medium">
                        Discover the most innovative startups that are shaping the future of technology and business. These companies are at the forefront of their industries, developing groundbreaking solutions to some of the world&apos;s most pressing challenges.
                    </h2>
                    
                </section>
            </div>
        </section>
    )
}

